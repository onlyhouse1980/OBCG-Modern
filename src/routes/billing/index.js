'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Droplets, TrendingUp, Calendar } from 'lucide-react';

/* ----------------------- helpers ----------------------- */

// turns "Dec 04, 2023" -> "12/04/2023"
const formatChartLabelMMDDYYYY = (label) => {
  const str = String(label);

  // if it's already mm/dd/yyyy, leave it
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(str)) return str;

  const monthMap = {
    jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
    jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12'
  };

  // expect "Dec 04, 2023"
  const parts = str.split(' ');
  if (parts.length < 3) return str;

  const mon = parts[0].slice(0,3).toLowerCase(); // "Dec" -> "dec"
  const day = (parts[1] || '').replace(',', ''); // "04," -> "04"
  const year = parts[2];

  const mm = monthMap[mon];
  if (!mm || !day || !year) return str;

  return `${mm}/${day.padStart(2, '0')}/${year}`;
};


const fetchAllCustomers = async () => {
  const res = await fetch('/api/spreadsheet/fetch');
  if (!res.ok) throw new Error('Failed to fetch customer data');
  return res.json();
};

const calculateBill = (currentReading, previousReading) => {
  const usage = currentReading - previousReading;
  if (usage <= 6000) return 0;
  const overageGallons = usage - 6000;
  return overageGallons * 0.025; // 0.025¢/gal
};

const parseDate = (fieldName) => {
  const month = fieldName.substring(0, 3);
  const day = fieldName.substring(3, 5);
  const year = fieldName.substring(6, 8);
  const monthMap = {
    jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
    jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12'
  };
  const fullYear = `20${year}`;
  const monthNum = monthMap[month.toLowerCase()];
  return { 
    month, 
    day, 
    year: fullYear,
    display: `${month.charAt(0).toUpperCase() + month.slice(1)} ${day}, ${fullYear}`,
    sortDate: new Date(`${fullYear}-${monthNum}-${day}`)
  };
};

// filter a single record down to last 2 years of readings
const prepareCustomerRecord = (record) => {
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

  const filtered = {
    last_name: record.last_name,
    meter_serialNum: record.meter_serialNum
  };

  Object.keys(record).forEach((key) => {
    if (key !== 'last_name' && key !== 'meter_serialNum') {
      const dateInfo = parseDate(key);
      if (dateInfo.sortDate >= twoYearsAgo) filtered[key] = record[key];
    }
  });

  return filtered;
};

/* ----------------------- component ----------------------- */

export default function BillingDashboard() {
  const [customerData, setCustomerData] = useState(null);
  const [matches, setMatches] = useState([]); // array of matched raw records
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastName, setLastName] = useState('');
  const [searchLastName, setSearchLastName] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = lastName.trim();
    if (!query) return;
    setError(null);
    setLoading(true);

    try {
      const allData = await fetchAllCustomers();
      // partial, case-insensitive match on last_name
      const matched = allData.filter(r => 
        typeof r.last_name === 'string' &&
        r.last_name.toLowerCase().includes(query.toLowerCase())
      );

      setSearchLastName(query);

      if (matched.length === 0) {
        setMatches([]);
        setCustomerData(null);
        setError(`No customer found matching: ${query}`);
      } else if (matched.length === 1) {
        setMatches([]);
        setCustomerData(prepareCustomerRecord(matched[0]));
      } else {
        setCustomerData(null);
        setMatches(matched);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong searching.');
    } finally {
      setLoading(false);
    }
  };

  const handlePickMatch = (idx) => {
    const picked = matches[idx];
    setCustomerData(prepareCustomerRecord(picked));
    setMatches([]); // clear the selection panel
  };

  const handleReset = () => {
    setCustomerData(null);
    setMatches([]);
    setLastName('');
    setSearchLastName('');
    setError(null);
  };

  /* ----------------------- early returns ----------------------- */

  if (loading && searchLastName) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-lg text-gray-600">Searching for “{searchLastName}”...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <div className="text-red-600 text-lg font-semibold mb-2">Error</div>
          <div className="text-gray-600 mb-4">{error}</div>
          <button 
            onClick={() => setError(null)}
            style={{backgroundColor: '#3f51b5'}}
            className="bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // multiple partial matches selector
  if (!customerData && matches.length > 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Multiple matches for “{searchLastName}”
          </h1>
          <p className="text-gray-600 mb-6">
            Pick the correct account to view billing.
          </p>

          <ul className="space-y-3">
            {matches.map((rec, i) => (
              <li key={`${rec.last_name || 'match'}_${rec.meter_serialNum || i}`}>
                <button
                  onClick={() => handlePickMatch(i)}
                  style={{backgroundColor: '#3f51b5'}}
                  className="w-full flex items-center justify-between rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition p-4"
                >
                  {/* CHANGED: show the exact last_name from the record, no artificial underscores or numbering */}
                  <span className="font-medium text-gray-800">{rec.last_name}</span> {/* CHANGED */}
                  <span className="text-sm text-gray-500">
                    Meter: {rec.meter_serialNum || '—'}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleReset}
              style={{backgroundColor: '#3f51b5'}}
              className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              New Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  // initial search form
  if (!customerData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
        <div className="bg-white pl-2 rounded-xl shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Customer Billing Lookup</h1>
          <form onSubmit={handleSearch}>
            <label className="block pr-2 text-sm font-medium text-gray-700 mb-2">
              Customer Last Name (partial ok)
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="e.g., Taylor or Tay"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              required
            />
            <button
              type="submit"
              style={{backgroundColor: '#3f51b5'}}
              className="bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ----------------------- compute dashboard data ----------------------- */

  const readings = [];
  Object.keys(customerData).forEach(key => {
    if (key !== 'last_name' && key !== 'meter_serialNum') {
      const dateInfo = parseDate(key);
      readings.push({
        field: key,
        date: dateInfo.display,
        reading: customerData[key],
        sortDate: dateInfo.sortDate
      });
    }
  });

  readings.sort((a, b) => a.sortDate - b.sortDate);

  const billingPeriods = [];
  let totalBilled = 0;

  for (let i = 1; i < readings.length; i++) {
    const usage = readings[i].reading - readings[i - 1].reading;
    const amount = calculateBill(readings[i].reading, readings[i - 1].reading);
    totalBilled += amount;
    billingPeriods.push({
      period: `${readings[i - 1].date} - ${readings[i].date}`,
      previousReading: readings[i - 1].reading,
      currentReading: readings[i].reading,
      usage,
      amount,
      reading: readings[i].reading
    });
  }

  const latestBill = billingPeriods.length > 0 ? billingPeriods[billingPeriods.length - 1] : null;
  const totalUsage = readings.length > 1 ? readings[readings.length - 1].reading - readings[0].reading : 0;

  const chartData = billingPeriods.map(period => ({
    date: period.period.split(' - ')[1],
    usage: period.usage
  }));

  /* ----------------------- render dashboard ----------------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
            <div className="mb-8 flex justify-between items-start">
            <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Customer Billing Dashboard
                </h1>
                <p className="text-lg text-gray-600">
                {/* CHANGED: keep the exact DB value (don’t title-case) */}
                Account: {customerData.last_name} {/* CHANGED */}
                </p>
                <p className="text-sm text-gray-500">
                Meter: {customerData.meter_serialNum}
                </p>
            </div>
            <button
                onClick={handleReset}
                style={{backgroundColor: '#3f51b5'}}
                className="bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                New Search
            </button>
            </div>

        {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex pl-2 items-center justify-between">
                <div className='flex flex-col'>
                    <p className="text-sm text-gray-600 mb-1">Latest Bill</p>
                    <p className="text-3xl font-bold text-gray-800">
                    ${latestBill ? latestBill.amount.toFixed(2) : '0.00'}
                    </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                    <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex pl-2 items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 mb-1">Latest Usage</p>
                    <p className="text-3xl font-bold text-gray-800">
                    {latestBill ? latestBill.usage.toLocaleString() : '0'} gallons
                    </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                    <Droplets className="w-8 h-8 text-green-600" />
                </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex pl-2 items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 mb-1">Total Usage (2 yrs.)</p>
                    <p className="text-3xl font-bold text-gray-800">
                    {totalUsage.toLocaleString()} gallons
                    </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
                <div className="flex pl-2 items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 mb-1">Total Billed (2 yrs.)</p>
                    <p className="text-3xl font-bold text-gray-800">
                    ${totalBilled.toFixed(2)}
                    </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                    <DollarSign className="w-8 h-8 text-orange-600" />
                </div>
                </div>
            </div>
            </div>

    {/* Billing Details Table */}
        <div className="bg-white pl-2 pr-2 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
                <h2 className="text-xl font-semibold text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Billing History
                </h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-6 py-3 text-left  text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Billing Period
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Previous Reading
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Reading
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usage (Gallons)
                    </th>
                    <th className="px-6 py-3 text-left  text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                    </th>
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                    {billingPeriods.slice().reverse().map((period, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {period.period}
                        </td>

                        {/* centered */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">
                        {period.previousReading.toLocaleString()}
                        </td>

                        {/* centered */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                        {period.currentReading.toLocaleString()}
                        </td>

                        {/* centered */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                        {period.usage.toLocaleString()}
                        {period.usage > 6000 && (
                            <span className="ml-2 text-xs text-orange-600 font-medium">
                            ({(period.usage - 6000).toLocaleString()} over limit)
                            </span>
                        )}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                        ${period.amount.toFixed(2)}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>


    {/* Chart */}
        <div className="bg-white pl-2 pr-2 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl pl-4 pt-2 font-semibold text-gray-800 mb-4">
                Meter Reading History
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={formatChartLabelMMDDYYYY} />
                    <YAxis />
                    <Tooltip labelFormatter={formatChartLabelMMDDYYYY} />
                    <Line 
                    type="monotone" 
                    dataKey="usage" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 5 }}
                    />
                </LineChart>
            </ResponsiveContainer>

        </div>

    {/* Pricing Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
                <strong>Pricing:</strong> 
                    First 6,000 gallons per billing period are included.
                    Usage over 6,000 gallons is billed at <span className="font-semibold">$0.025</span> per gallon (2.5¢/gal).
                </p>
            </div>
        </div>
    </div>
  );
}
