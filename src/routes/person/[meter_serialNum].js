'use client';
import { useEffect, useId, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from "./[meter_serialNum].module.css";
import Link from 'next/link';

import { Button } from "@/components/ui/button";
//<div suppressHydrationWarning={true}>{process.browser}</div>;
const MONTHLY_LIMIT = 6000;
const OVERAGE_RATE = 0.025;
const GAUGE_RADIUS = 80;
const GAUGE_CIRCUMFERENCE = 2 * Math.PI * GAUGE_RADIUS;
const GAUGE_HALF_CIRCUMFERENCE = GAUGE_CIRCUMFERENCE / 2;

const bgColors = {
  Default: "#81b71a",
  Blue: "#00B1E1",
  Cyan: "#37BC9B",
  Green: "#8CC152",
  Red: "#E9573F",
  Yellow: "#F6BB42",
};

function UsageSpeedometer({ usedGallons }) {
  const gradientId = useId().replace(/:/g, '');
  const usageRatio = usedGallons / MONTHLY_LIMIT;
  const normalizedRatio = Math.min(Math.max(usageRatio, 0), 1);
  const gaugeStroke = GAUGE_HALF_CIRCUMFERENCE * normalizedRatio;
  const needleAngle = 180 + normalizedRatio * 180;
  const needleRadians = (needleAngle * Math.PI) / 180;
  const needleLength = 58;
  const needleX = 100 + needleLength * Math.cos(needleRadians);
  const needleY = 100 + needleLength * Math.sin(needleRadians);

  let statusLabel = 'Within monthly limit';
  let statusClassName = styles.statusOk;

  if (usageRatio >= 1) {
    statusLabel = 'At or above monthly limit';
    statusClassName = styles.statusOver;
  } else if (usageRatio >= 0.8) {
    statusLabel = 'Approaching monthly limit';
    statusClassName = styles.statusWarning;
  }

  const remainingGallons = Math.max(MONTHLY_LIMIT - usedGallons, 0);
  const overageGallons = Math.max(usedGallons - MONTHLY_LIMIT, 0);
  const currentOverageCharge = overageGallons * OVERAGE_RATE;

  return (
    <div className={styles.resultPanel} aria-live="polite">
      <div className={styles.resultSummary}>
        <p className={styles.resultEyebrow}>Usage snapshot</p>
        <h3 className={styles.resultValue}>
          {usedGallons.toLocaleString()} gallons used
        </h3>
        <p className={`${styles.resultStatus} ${statusClassName}`}>
          {statusLabel}
        </p>
        <p className={styles.resultMeta}>
          {overageGallons > 0
            ? `${overageGallons.toLocaleString()} gallons over the ${MONTHLY_LIMIT.toLocaleString()} gallon monthly limit.`
            : `${remainingGallons.toLocaleString()} gallons remaining before the ${MONTHLY_LIMIT.toLocaleString()} gallon monthly limit.`}
        </p>
        {overageGallons > 0 && (
          <div className={styles.chargeCard}>
            <p className={styles.chargeLabel}>Current Overage Charge</p>
            <p className={styles.chargeValue}>
              ${currentOverageCharge.toFixed(2)}
            </p>
            <p className={styles.chargeMeta}>
              {overageGallons.toLocaleString()} gallons at ${OVERAGE_RATE.toFixed(3)} per gallon.
            </p>
          </div>
        )}
      </div>

      <div className={styles.gaugeWrap}>
        <svg
          className={styles.gauge}
          viewBox="0 0 200 130"
          role="img"
          aria-label={`Usage speedometer showing ${Math.round(usageRatio * 100)} percent of the monthly limit`}
        >
          <defs>
            <linearGradient
              id={gradientId}
              gradientUnits="userSpaceOnUse"
              x1="20"
              y1="100"
              x2="180"
              y2="100"
            >
              <stop offset="0%" stopColor={bgColors.Blue} />
              <stop offset="60%" stopColor={bgColors.Yellow} />
              <stop offset="100%" stopColor={bgColors.Red} />
            </linearGradient>
          </defs>
          <path
            className={styles.gaugeTrack}
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            strokeWidth="16"
            strokeDasharray={`${GAUGE_HALF_CIRCUMFERENCE} ${GAUGE_HALF_CIRCUMFERENCE}`}
            strokeLinecap="round"
          />
          <path
            className={styles.gaugeValue}
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="16"
            strokeDasharray={`${gaugeStroke} ${GAUGE_HALF_CIRCUMFERENCE}`}
            strokeLinecap="round"
          />
          <line
            className={styles.gaugeNeedle}
            x1="100"
            y1="100"
            x2={needleX}
            y2={needleY}
          />
          <circle className={styles.gaugeCenter} cx="100" cy="100" r="6" />
          <text className={styles.gaugeLabel} x="12" y="118">0</text>
          <text className={styles.gaugeLabel} x="89" y="18">3k</text>
          <text className={styles.gaugeLabel} x="160" y="118">6k</text>
        </svg>
        <p className={styles.gaugePercent}>
          {Math.round(usageRatio * 100)}%
        </p>
      </div>
    </div>
  );
}

const User = () => {
  const params = useParams();
  const meter_serialNum = params?.meter_serialNum;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentReading, setCurrentReading] = useState('');
  const [usedGallons, setUsedGallons] = useState(null);
  const [calculationError, setCalculationError] = useState('');

  useEffect(() => {
    if (meter_serialNum) {
      const fetchUser = async () => {
        try {
          const res = await fetch(`/api/people/${meter_serialNum}`);
          const data = await res.json();
          if (res.ok) {
            setUser(data.data);
          } else {
            setError(data.message);
          }
        } catch (error) {
          setError('An error occurred while fetching the user.');
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [meter_serialNum]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const baselineReading = Number(user?.feb01_26 ?? 0);

  function handleCalculate() {
    const parsedReading = Number.parseInt(currentReading, 10);

    if (Number.isNaN(parsedReading)) {
      setCalculationError('Enter your current meter reading using digits only.');
      setUsedGallons(null);
      return;
    }

    if (parsedReading < baselineReading) {
      setCalculationError('Your current reading cannot be less than the February 01, 2026 reading on file.');
      setUsedGallons(null);
      return;
    }

    setCalculationError('');
    setUsedGallons(parsedReading - baselineReading);
  }

  return (
    <>
      
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th2}>
                <h4>
                  <span> Meter Serial # : {user.meter_serialNum}</span>
                  <br />
                </h4>
              </th>
              <th className={styles.th2}>
                <h4>
                  <span>{user.last_name} </span>
                </h4>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.th}>
                <p className={styles.p}>
                  Enter reading from your meter in the box to the right.
                  <br />
                  (digits only - no, seperator eg. 1536987)
                  <br />
                  <br /> Then click the calculate button below that.*
                </p>
              </td>
              <td className={styles.thInput}>
                <input
                  style={{
                    backgroundColor: bgColors.Cyan,
                  }}
                  type="text"
                  id="info1"
                  label="your reading"
                  placeholder="Enter Your Reading"
                  name="uInput"
                  inputMode="numeric"
                  value={currentReading}
                  onChange={(event) => {
                    setCurrentReading(event.target.value.replace(/\D/g, ''));
                    setCalculationError('');
                    setUsedGallons(null);
                  }}
                ></input>
                <br />
                <Button
                  onClick={() => {
                    handleCalculate();
                  }}
                >
                  Calculate
                </Button>
              </td>
            </tr>
            <tr>
              <td className={styles.td3}>
                <p className={styles.p}></p>
                <p className={styles.p}>Last reading - February 01, 2026</p>
              </td>
              <td className={styles.td3}>
                <input
                  style={{
                    backgroundColor: bgColors.Blue,
                  }}
                  type="text"
                  id="info2"
                  label="February 01, 2026"
                  value={user.feb01_26}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td className={styles.td3}>
                <p className={styles.p}>
                  Gallons used since February 01, 2026.
                </p>
              </td>
              <td className={styles.td3}>
                <input
                  style={{
                    backgroundColor: bgColors.Blue,
                  }}
                  type="text"
                  name="utilized"
                  id="Answer"
                  label="answers"
                  value={usedGallons ?? ''}
                  readOnly
                ></input>
              </td>
            </tr>
            {calculationError && (
              <tr>
                <td className={styles.messageCell} colSpan={2}>
                  <p className={styles.errorText}>{calculationError}</p>
                </td>
              </tr>
            )}
            {usedGallons !== null && (
              <tr>
                <td className={styles.resultCell} colSpan={2}>
                  <UsageSpeedometer usedGallons={usedGallons} />
                </td>
              </tr>
            )}

            <tr>
              <td className={styles.h5head}>
                <h5>
                  *If you are having problems with this
                  <br />
                  form, we recommend reading &quot;
                  <Link href="/howtoreadmeter.pdf">How to read your meter?</Link>
                  &quot;{" "}
                </h5>
              </td>
              <td className={styles.td0}></td>
            </tr>
          </tbody>
        </table>
      

      <style jsx>{`
        Link {
          color: red;
        }
      `}</style>
    </>
  );
};

export default User;
