'use client';

// pages/spreadsheet/input.js
import Spreadsheet from '@/components/Spreadsheet';
import sheetStyles from '@/styles/Spreadsheet.module.css';
import styles from './input.module.css';

const Home = () => (
  <div className={styles.horizscroll}>
    <div className={sheetStyles.sheetPage}>
      <section className={sheetStyles.pageHeader}>
        <h1 className={sheetStyles.pageTitle}>OBCG Meter Readings</h1>
        <p className={sheetStyles.pageSubtext}>
          Enter, review, and save meter readings from the spreadsheet table below.
        </p>
      </section>

      <div className={styles.scroll}>
        <Spreadsheet />
      </div>
    </div>
  </div>
);

export default Home;
