import { useEffect, useMemo, useRef, useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styles from '../styles/Spreadsheet.module.css';

const DEFAULT_VISIBLE_COLUMNS = [
  'last_name',
  'meter_serialNum',
  'lot_number',
  'aug01_25',
  'oct01_25',
  'dec01_25',
  'feb01_26',
  'apr01_26',
  'jun01_26',
];

const Spreadsheet = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState(DEFAULT_VISIBLE_COLUMNS);
  const [isDragging, setIsDragging] = useState(false);
  const viewportRef = useRef(null);
  const dragStateRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isDragging) {
      return undefined;
    }

    const handleMouseMove = (event) => {
      const viewport = viewportRef.current;
      const dragState = dragStateRef.current;
      if (!viewport || !dragState.active) {
        return;
      }

      event.preventDefault();
      viewport.scrollLeft = dragState.scrollLeft - (event.clientX - dragState.startX);
      viewport.scrollTop = dragState.scrollTop - (event.clientY - dragState.startY);
    };

    const handleMouseUp = () => {
      dragStateRef.current.active = false;
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/spreadsheet/fetch');
      const fetchedData = response.data;

      if (fetchedData.length > 0) {
        const allHeaders = Object.keys(fetchedData[0]);
        setHeaders(allHeaders);
        setData(fetchedData);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error fetching data');
    }
  };

  const handleAddRow = () => {
    setData([...data, headers.reduce((acc, header) => ({ ...acc, [header]: '' }), {})]);
  };

  const handleAddColumn = () => {
    const newHeader = prompt('Enter column name:');
    if (newHeader) {
      if (visibleColumns.includes(newHeader)) {
        return;
      }
      setHeaders(prevHeaders => {
        const newHeaders = [...prevHeaders, newHeader];
        setVisibleColumns([...visibleColumns, newHeader]); // Make new column visible by default
        setData(data.map(row => ({ ...row, [newHeader]: '' })));
        return newHeaders;
      });
    }
  };

  const handleRemoveRow = (rowIndex) => {
    setData(data.filter((_, index) => index !== rowIndex));
  };

  const handleHideColumn = (column) => {
    setVisibleColumns(visibleColumns.filter(header => header !== column));
  };

  const handleRemoveColumn = (column) => {
    // Remove column from visibility without deleting it from data
    setVisibleColumns(visibleColumns.filter(header => header !== column));
  };

  const handleInputChange = (e, rowIndex, column) => {
    const newData = [...data];
    newData[rowIndex][column] = e.target.value;
    setData(newData);
  };

  const handleSave = async () => {
    try {
      await axios.post('/api/spreadsheet/update', { data });
      alert('Data saved successfully');
    } catch (err) {
      console.error('Error saving data:', err);
      setError('Error saving data');
    }
  };

  const columnWidths = useMemo(
    () =>
      Object.fromEntries(
        visibleColumns.map((header) => {
          const longestValue = data.reduce((maxLength, row) => {
            const cellLength = String(row?.[header] ?? '').trim().length;
            return Math.max(maxLength, cellLength);
          }, 0);

          return [header, Math.min(Math.max(longestValue + 1, 6), 12)];
        }),
      ),
    [data, visibleColumns],
  );

  const handleViewportMouseDown = (event) => {
    if (event.button !== 0 || !viewportRef.current) {
      return;
    }

    if (event.target.closest('input, button, textarea, select, a, label, svg, path')) {
      return;
    }

    dragStateRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: viewportRef.current.scrollLeft,
      scrollTop: viewportRef.current.scrollTop,
    };

    setIsDragging(true);
  };

  return (
    <div className={styles.sheetShell}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarGroup}>
          <Button
            variant="contained"
            startIcon={<AddBoxIcon />}
            onClick={handleAddRow}
            className={`${styles.actionButton} ${styles.addButton}`}
          >
            Add Row
          </Button>
          <Button
            variant="contained"
            startIcon={<AddBoxIcon />}
            onClick={handleAddColumn}
            className={`${styles.actionButton} ${styles.columnButton}`}
          >
            Add Column
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            className={`${styles.actionButton} ${styles.saveButton}`}
          >
            Save
          </Button>
        </div>

        <div className={styles.toolbarMeta}>
          <span className={styles.metaPill}>{data.length} rows</span>
          <span className={styles.metaPill}>{visibleColumns.length} visible columns</span>
          {error ? <span className={styles.errorPill}>{error}</span> : null}
        </div>
      </div>

      <div
        ref={viewportRef}
        className={`${styles.tableViewport} ${isDragging ? styles.dragging : ''}`}
        onMouseDown={handleViewportMouseDown}
      >
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr className={styles.tr}>
                {visibleColumns.map(header => (
                  <th className={styles.th} key={header}>
                    <div
                      className={styles.thContent}
                      style={{ width: `${columnWidths[header] + 1}ch` }}
                    >
                      <span className={styles.thLabel}>{header}</span>
                      <IconButton
                        aria-label="hide"
                        className={styles.iconButton}
                        onClick={() => handleHideColumn(header)}
                      >
                        <DeleteForeverIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </th>
                ))}
                <th className={`${styles.th} ${styles.rowActionHead}`}>Row</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr className={styles.tr} key={rowIndex}>
                  {visibleColumns.map(header => (
                    <td className={styles.td} key={header}>
                      <TextField
                        className={styles.textField}
                        variant="outlined"
                        size="small"
                        sx={{ width: `${columnWidths[header]}ch` }}
                        value={row[header] || ''}
                        onChange={(e) => handleInputChange(e, rowIndex, header)}
                      />
                    </td>
                  ))}
                  <td className={`${styles.td} ${styles.rowActionCell}`}>
                    <IconButton
                      aria-label="delete"
                      className={styles.rowDeleteButton}
                      onClick={() => handleRemoveRow(rowIndex)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Spreadsheet;
