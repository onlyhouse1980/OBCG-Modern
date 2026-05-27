'use client';

import Link from 'next/link';
import { useEffect, useId, useMemo, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  ActionLink,
  CardGrid,
  EmptyState,
  Hero,
  LoadingState,
  Page,
  Panel,
  Section,
} from '@/components/site/page-shell';
import {
  buildAnnualBudgetSummary,
  buildUsagePeriods,
  calculateFlatCharge,
  formatCurrency,
  formatNumber,
  getLatestReading,
  summarizeUsage,
} from '../../lib/meter-utils';

import styles from './account-pages.module.css';

const GAUGE_RADIUS = 80;
const GAUGE_CENTER = 100;
const GAUGE_TICK_COUNT = 12;

function useRemoteData(url) {
  const [state, setState] = useState({
    data: null,
    error: '',
    loading: Boolean(url),
  });

  useEffect(() => {
    if (!url) {
      setState({ data: null, error: '', loading: false });
      return undefined;
    }

    let active = true;

    async function load() {
      setState({ data: null, error: '', loading: true });

      try {
        const response = await fetch(url);
        const payload = await response.json();

        if (!active) {
          return;
        }

        if (!response.ok) {
          setState({
            data: null,
            error: payload.message || 'Unable to load data.',
            loading: false,
          });
          return;
        }

        setState({
          data: payload.data ?? payload,
          error: '',
          loading: false,
        });
      } catch (error) {
        if (!active) {
          return;
        }

        setState({
          data: null,
          error: 'Unable to load data right now.',
          loading: false,
        });
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [url]);

  return state;
}

function toneClass(value, { positiveIsGood = false } = {}) {
  if (value === 0) {
    return '';
  }

  if (positiveIsGood) {
    return value > 0 ? styles.tonePositive : styles.toneDanger;
  }

  return value > 0 ? styles.toneDanger : styles.tonePositive;
}

function formatChartLabelMMDDYYYY(label) {
  const str = String(label ?? '');

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(str)) {
    return str;
  }

  const monthMap = {
    jan: '01',
    feb: '02',
    mar: '03',
    apr: '04',
    may: '05',
    jun: '06',
    jul: '07',
    aug: '08',
    sep: '09',
    oct: '10',
    nov: '11',
    dec: '12',
  };

  const parts = str.split(' ');
  if (parts.length < 3) {
    return str;
  }

  const month = monthMap[parts[0].slice(0, 3).toLowerCase()];
  const day = (parts[1] || '').replace(',', '').padStart(2, '0');
  const year = parts[2];

  if (!month || !day || !year) {
    return str;
  }

  return `${month}/${day}/${year}`;
}

function formatGaugeTickLabel(value) {
  if (value === 0) {
    return '0';
  }

  return `${value / 1000}k`;
}

function getGaugeTicks(limit) {
  return Array.from({ length: GAUGE_TICK_COUNT + 1 }, (_, index) => {
    const value = (limit / GAUGE_TICK_COUNT) * index;
    const ratio = value / limit;
    const angle = 180 + ratio * 180;
    const radians = (angle * Math.PI) / 180;
    const isMajor = index % 2 === 0;
    const innerRadius = isMajor ? GAUGE_RADIUS - 13 : GAUGE_RADIUS - 8;
    const labelRadius = GAUGE_RADIUS - 26;

    return {
      value,
      isMajor,
      label: isMajor ? formatGaugeTickLabel(value) : '',
      x1: GAUGE_CENTER + innerRadius * Math.cos(radians),
      y1: GAUGE_CENTER + innerRadius * Math.sin(radians),
      x2: GAUGE_CENTER + GAUGE_RADIUS * Math.cos(radians),
      y2: GAUGE_CENTER + GAUGE_RADIUS * Math.sin(radians),
      labelX: GAUGE_CENTER + labelRadius * Math.cos(radians),
      labelY: GAUGE_CENTER + labelRadius * Math.sin(radians),
    };
  });
}

function InfoTable({ title, description, columns, rows }) {
  return (
    <article className={styles.tableCard}>
      <div className={styles.tableHeader}>
        <div>
          <h3 className={styles.tableHeaderTitle}>{title}</h3>
          {description ? <p className={styles.tableHeaderText}>{description}</p> : null}
        </div>
      </div>
      <div className={styles.tableBody}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {row.cells.map((cell, index) => (
                  <td key={`${row.id}-${columns[index]}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function SummaryGrid({ items }) {
  return (
    <div className={styles.summaryGrid}>
      {items.map((item) => (
        <article key={item.label} className={styles.summaryCard}>
          <p className={styles.summaryLabel}>{item.label}</p>
          <p className={styles.summaryValue}>{item.value}</p>
        </article>
      ))}
    </div>
  );
}

function AuthLayout({
  eyebrow,
  title,
  description,
  asideTitle,
  asideText,
  asidePoints,
  children,
}) {
  return (
    <Page className={styles.page}>
      <div className={styles.authLayout}>
        <aside className={styles.authAside}>
          <div className={styles.authAsideInner}>
            <span className={styles.label}>{eyebrow}</span>
            <h1 className={styles.authTitle}>{asideTitle}</h1>
            <p className={styles.heroNoteText}>{asideText}</p>
            <CardGrid>
              {asidePoints.map((point) => (
                <Panel
                  key={point.title}
                  title={point.title}
                  text={point.text}
                  className={styles.authInfoCard}
                />
              ))}
            </CardGrid>
          </div>
        </aside>

        <div className={styles.authCard}>
          <span className={styles.label}>{eyebrow}</span>
          <h2 className={styles.authTitle}>{title}</h2>
          <p className={styles.authDescription}>{description}</p>
          {children}
        </div>
      </div>
    </Page>
  );
}

function UsageGauge({ usage, limit = 6000 }) {
  const gradientId = useId().replace(/:/g, '');
  const gaugeTicks = getGaugeTicks(limit);
  const estimatedUsagePercent = (usage / limit) * 100;
  const roundedUsagePercent = Math.round(estimatedUsagePercent);
  const isOverEstimatedLimit = estimatedUsagePercent > 100;
  const overageGallons = isOverEstimatedLimit ? usage - limit : 0;
  const estimatedCurrentOverageCharge = calculateFlatCharge(usage, limit);
  const ratio = Math.min(Math.max(usage / limit, 0), 1.35);
  const safeRatio = Math.min(ratio, 1);
  const circumference = Math.PI * GAUGE_RADIUS;
  const dash = circumference * safeRatio;
  const angle = 180 + Math.min(ratio, 1) * 180;
  const radians = (angle * Math.PI) / 180;
  const needleLength = 58;
  const needleX = GAUGE_CENTER + needleLength * Math.cos(radians);
  const needleY = GAUGE_CENTER + needleLength * Math.sin(radians);

  const status =
    usage > limit
      ? `Over the ${formatNumber(limit)} gallon limit`
      : usage > limit * 0.8
        ? 'Approaching the current limit'
        : 'Comfortably within the current limit';

  return (
    <div className={styles.gaugeWrap}>
      <svg
        className={styles.gauge}
        viewBox="0 0 200 130"
        role="img"
        aria-label={`Usage gauge showing ${roundedUsagePercent} percent of the target limit`}
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
            <stop offset="0%" stopColor="#47a7d1" />
            <stop offset="35%" stopColor="#6fbf73" />
            <stop offset="65%" stopColor="#f4bf68" />
            <stop offset="82%" stopColor="#f28c38" />
            <stop offset="100%" stopColor="#dc7461" />
          </linearGradient>
        </defs>
        <path
          className={styles.gaugeTrack}
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
        />
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
        />
        <g aria-hidden="true">
          {gaugeTicks.map((tick) => (
            <line
              key={`tick-${tick.value}`}
              className={`${styles.gaugeTick} ${
                tick.isMajor ? styles.gaugeTickMajor : styles.gaugeTickMinor
              }`}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
            />
          ))}
        </g>
        <line
          className={styles.gaugeNeedle}
          x1={GAUGE_CENTER}
          y1={GAUGE_CENTER}
          x2={needleX}
          y2={needleY}
        />
        <circle className={styles.gaugeCenter} cx={GAUGE_CENTER} cy={GAUGE_CENTER} r="6" />
        <g aria-hidden="true">
          {gaugeTicks
            .filter((tick) => tick.label)
            .map((tick) => (
              <text
                key={`label-${tick.value}`}
                className={styles.gaugeLabel}
                x={tick.labelX}
                y={tick.labelY}
              >
                {tick.label}
              </text>
            ))}
        </g>
      </svg>
      <p className={styles.gaugePercent}>{roundedUsagePercent}%</p>
      <p className={styles.gaugeStatus}>{status}</p>
      {isOverEstimatedLimit ? (
        <div className={styles.gaugeCharge}>
          <p className={styles.gaugeChargeLabel}>Estimated current overage charge</p>
          <p className={styles.gaugeChargeValue}>
            {formatCurrency(estimatedCurrentOverageCharge)}
          </p>
          <p className={styles.gaugeChargeMeta}>
            Based on {formatNumber(overageGallons)} gallons over the current limit.
          </p>
        </div>
      ) : null}
    </div>
  );
}

function buildBillingRows(periods, { includeRemaining = false } = {}) {
  return periods.map((period) => ({
    id: period.id,
    cells: [
      period.rangeLabel,
      `${formatNumber(period.usage)} gal`,
      includeRemaining
        ? period.remaining >= 0
          ? `${formatNumber(period.remaining)} remaining`
          : `${formatNumber(Math.abs(period.remaining))} over`
        : `${formatNumber(period.overage)} gal`,
      formatCurrency(period.charge),
    ],
  }));
}

export function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('Invalid credentials. Please try again.');
      setIsLoading(false);
      return;
    }

    router.push('/dashboard');
  }

  return (
    <AuthLayout
      eyebrow="Member Access"
      title="Log in"
      description="Access recent usage, account history, and member-only billing tools."
      asideTitle="Member account access"
      asideText="Sign in to view your dashboard, check recent billing periods, and open the member account tools tied to your water record."
      asidePoints={[
        {
          title: 'Recent usage',
          text: 'Review recent periods with usage totals and estimated charges.',
        },
        {
          title: 'Account tools',
          text: 'Open usage lookup, billing history, and password recovery from one place.',
        },
      ]}
    >
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="login-email" className={styles.label}>
            Email
          </label>
          <input
            id="login-email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="login-password" className={styles.label}>
            Password
          </label>
          <input
            id="login-password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {error ? <p className={styles.errorMessage}>{error}</p> : null}

        <div className={styles.buttonRow}>
          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
          <Link href="/forgot-password" className={styles.buttonSecondary}>
            Reset password
          </Link>
        </div>
      </form>

      <p className={styles.authFooter}>
        Need an account? <Link href="/signup">Create one here.</Link>
      </p>
    </AuthLayout>
  );
}

export function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, lastName }),
      });

      const payload = await response.json();
      if (!response.ok) {
        setError(payload.message || 'Unable to create the account.');
        setIsLoading(false);
        return;
      }

      const signInResult = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (signInResult?.error) {
        setError('Account created, but automatic login failed. Please log in manually.');
        setIsLoading(false);
        return;
      }

      router.push('/dashboard');
    } catch (networkError) {
      setError('A network error occurred. Please try again.');
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout
      eyebrow="Create Account"
      title="Sign up"
      description="Register with the same last name used for your community water account."
      asideTitle="Create your member account"
      asideText="Use the same last name associated with your water account so you can access the dashboard and related billing tools."
      asidePoints={[
        {
          title: 'Usage dashboard',
          text: 'Review recent periods and estimated charges after your first sign-in.',
        },
        {
          title: 'Lookup pages',
          text: 'Jump directly into meter and billing tools when you need a quick answer.',
        },
      ]}
    >
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="signup-last-name" className={styles.label}>
            Last name
          </label>
          <input
            id="signup-last-name"
            type="text"
            className={styles.input}
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Enter the account last name"
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="signup-email" className={styles.label}>
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="signup-password" className={styles.label}>
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a secure password"
            required
          />
        </div>

        {error ? <p className={styles.errorMessage}>{error}</p> : null}

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className={styles.authFooter}>
        Already registered? <Link href="/login">Log in instead.</Link>
      </p>
    </AuthLayout>
  );
}

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const payload = await response.json();
      setMessage(payload.message || 'Request completed.');
      setIsError(!response.ok);
    } catch (error) {
      setMessage('Network error. Please try again later.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout
      eyebrow="Password Help"
      title="Forgot password"
      description="Enter your email and we will send a password reset link if the account exists."
      asideTitle="Reset your password"
      asideText="Use your account email to request a secure reset link. If the address is on file, you can create a new password and return to your account."
      asidePoints={[
        {
          title: 'Fast recovery',
          text: 'Request a reset link directly from the site with your account email.',
        },
        {
          title: 'Same member tools',
          text: 'Once reset, your dashboard and billing pages remain available as usual.',
        },
      ]}
    >
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="forgot-email" className={styles.label}>
            Email
          </label>
          <input
            id="forgot-email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
            required
          />
        </div>

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Sending link...' : 'Send reset link'}
        </button>

        {message ? (
          <p className={isError ? styles.errorMessage : styles.successMessage}>
            {message}
          </p>
        ) : null}
      </form>

      <p className={styles.authFooter}>
        Remembered your password? <Link href="/login">Back to login.</Link>
      </p>
    </AuthLayout>
  );
}

export function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setIsError(false);

    if (password !== confirmPassword) {
      setIsError(true);
      setMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const payload = await response.json();
      setMessage(payload.message || 'Password reset complete.');
      setIsError(!response.ok);

      if (response.ok) {
        setTimeout(() => {
          router.push('/login');
        }, 2400);
      }
    } catch (error) {
      setIsError(true);
      setMessage('Network error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout
      eyebrow="Secure Access"
      title="Reset password"
      description="Choose a new password to restore access to your member dashboard."
      asideTitle="Set a new password"
      asideText="Open the secure link from your email and choose a new password for your member account."
      asidePoints={[
        {
          title: 'Protected reset',
          text: 'Use the email link we sent you to confirm the reset request.',
        },
        {
          title: 'Direct return',
          text: 'After a successful reset, you can head straight back to the login screen.',
        },
      ]}
    >
      {!token ? (
        <>
          <p className={styles.errorMessage}>This reset link is missing or invalid.</p>
          <div className={styles.buttonRow}>
            <Link href="/forgot-password" className={styles.button}>
              Request a new link
            </Link>
          </div>
        </>
      ) : (
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="reset-password" className={styles.label}>
              New password
            </label>
            <input
              id="reset-password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="reset-confirm-password" className={styles.label}>
              Confirm password
            </label>
            <input
              id="reset-confirm-password"
              type="password"
              className={styles.input}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Updating password...' : 'Reset password'}
          </button>

          {message ? (
            <p className={isError ? styles.errorMessage : styles.successMessage}>
              {message}
            </p>
          ) : null}
        </form>
      )}
    </AuthLayout>
  );
}

export function MemberDashboardPage() {
  const { data: session, status } = useSession();
  const lastName = session?.user?.lastName;
  const { data, error, loading } = useRemoteData(
    status === 'authenticated' && lastName
      ? `/api/dashboard?lastName=${encodeURIComponent(lastName)}`
      : null,
  );

  const meters = useMemo(() => {
    if (!Array.isArray(data)) {
      return [];
    }

    return data
      .filter((record) => record?.meter_serialNum)
      .map((record) => {
        const periods = buildUsagePeriods(record, {
          chargeMode: 'flat',
          maxPeriods: 6,
        });
        const summary = summarizeUsage(periods);

        return {
          record,
          periods,
          summary,
        };
      });
  }, [data]);

  if (status === 'loading') {
    return (
      <Page>
        <LoadingState title="Loading dashboard" description="Checking your member session." />
      </Page>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <Page>
        <Hero
          eyebrow="Member Dashboard"
          title="Log in to view your account"
          description="Sign in to review recent billing periods, usage history, and account tools."
          actions={
            <>
              <ActionLink href="/login">Log in</ActionLink>
              <ActionLink href="/register" secondary>
                Check by meter number
              </ActionLink>
            </>
          }
        />
      </Page>
    );
  }

  if (loading) {
    return (
      <Page>
        <LoadingState title="Loading dashboard" description="Fetching account history for your meters." />
      </Page>
    );
  }

  if (error) {
    return (
      <Page>
        <EmptyState
          title="Dashboard unavailable"
          description={error}
          action={<ActionLink href="/login">Return to login</ActionLink>}
        />
      </Page>
    );
  }

  return (
    <Page className={styles.page}>
      <Hero
        eyebrow="Member Dashboard"
        title={`${lastName} account overview`}
        description="Review your recent usage periods, estimated overage charges, and linked meters from a single dashboard."
        actions={
          <>
            <ActionLink href="/register">Usage lookup</ActionLink>
            <button
              type="button"
              className={styles.buttonSecondary}
              onClick={() => signOut({ callbackUrl: '/login' })}
            >
              Log out
            </button>
          </>
        }
        stats={[
          { label: 'Meters found', value: String(meters.length) },
          {
            label: 'Latest estimated charge',
            value: formatCurrency(meters[0]?.periods[0]?.charge ?? 0),
          },
          {
            label: 'Recent usage tracked',
            value: `${formatNumber(
              meters.reduce((total, meter) => total + meter.summary.totalUsage, 0),
            )} gal`,
          },
        ]}
      />

      {meters.length === 0 ? (
        <EmptyState
          title="No readings found"
          description="We could not find meter readings for this account name."
          action={<ActionLink href="/register">Open usage lookup</ActionLink>}
        />
      ) : (
        meters.map(({ record, periods, summary }) => (
          <Section
            key={record.meter_serialNum}
            eyebrow="Meter"
            title={`Meter ${record.meter_serialNum}`}
            description={`Recent usage periods on file for ${record.last_name}.`}
          >
            <SummaryGrid
              items={[
                { label: 'Recent periods', value: String(periods.length) },
                { label: 'Usage tracked', value: `${formatNumber(summary.totalUsage)} gal` },
                { label: 'Highest period', value: `${formatNumber(summary.highestUsage)} gal` },
                { label: 'Est. charges', value: formatCurrency(summary.totalCharge) },
              ]}
            />

            <InfoTable
              title="Recent billing periods"
              description="Estimated charges are calculated from the current flat overage rate after the first 6,000 gallons."
              columns={['Billing period', 'Usage', 'Over 6,000', 'Estimated charge']}
              rows={buildBillingRows(periods)}
            />
          </Section>
        ))
      )}
    </Page>
  );
}

export function BillingLookupPage() {
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState([]);
  const [selected, setSelected] = useState(null);
  const [searchLabel, setSearchLabel] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch(event) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }

    setLoading(true);
    setError('');
    setSelected(null);
    setMatches([]);
    setSearchLabel(trimmed);

    try {
      const response = await fetch('/api/spreadsheet/fetch');
      const payload = await response.json();
      if (!response.ok) {
        throw new Error('Unable to search billing records.');
      }

      const filtered = payload.filter(
        (entry) =>
          typeof entry.last_name === 'string' &&
          entry.last_name.toLowerCase().includes(trimmed.toLowerCase()),
      );

      if (!filtered.length) {
        setError(`No account matched "${trimmed}".`);
        setLoading(false);
        return;
      }

      if (filtered.length === 1) {
        setSelected(filtered[0]);
      } else {
        setMatches(filtered);
      }
    } catch (networkError) {
      setError('Unable to search right now. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const recentPeriods = useMemo(() => {
    if (!selected) {
      return [];
    }

    return buildUsagePeriods(selected, {
      chargeMode: 'flat',
      maxPeriods: 8,
    });
  }, [selected]);

  const summary = summarizeUsage(recentPeriods);
  const chartData = useMemo(
    () =>
      recentPeriods
        .slice()
        .reverse()
        .map((period) => ({
          date: period.toLabel,
          usage: period.usage,
        })),
    [recentPeriods],
  );

  return (
    <Page className={styles.page}>
      <Hero
        eyebrow="Billing Lookup"
        title="Find an account by last name"
        description="Search billing records, review recent reading periods, and estimate current flat-rate overage charges."
        actions={
          <>
            <ActionLink href="/register">Lookup by meter</ActionLink>
            <ActionLink href="/contact" secondary>
              Need help?
            </ActionLink>
          </>
        }
        stats={[
          { label: 'Search mode', value: 'Partial match' },
          { label: 'Recent view', value: 'Last 8 periods' },
          { label: 'Charge basis', value: '6,000 gal limit' },
        ]}
      />

      <Section
        title="Search records"
        description="Use a full or partial last name. If there are several matches, you can pick the correct meter from a short list."
      >
        <Panel>
          <form className={styles.stack} onSubmit={handleSearch}>
            <div className={styles.field}>
              <label htmlFor="billing-last-name" className={styles.label}>
                Account last name
              </label>
              <input
                id="billing-last-name"
                type="text"
                className={styles.input}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Example: Frett"
                required
              />
            </div>

            <div className={styles.buttonRow}>
              <button type="submit" className={styles.button} disabled={loading}>
                {loading ? 'Searching...' : 'Search billing records'}
              </button>
              {(selected || matches.length) && (
                <button
                  type="button"
                  className={styles.buttonSecondary}
                  onClick={() => {
                    setSelected(null);
                    setMatches([]);
                    setError('');
                    setSearchLabel('');
                  }}
                >
                  Reset
                </button>
              )}
            </div>
          </form>

          {error ? <p className={styles.errorMessage}>{error}</p> : null}
        </Panel>
      </Section>

      {matches.length > 1 ? (
        <Section
          title={`Multiple matches for "${searchLabel}"`}
          description="Pick the correct account below to open the billing summary."
        >
          <div className={styles.searchResults}>
            {matches.map((record) => (
              <button
                key={`${record.last_name}-${record.meter_serialNum}`}
                type="button"
                className={styles.searchChoice}
                onClick={() => {
                  setSelected(record);
                  setMatches([]);
                }}
              >
                <div>
                  <strong>{record.last_name}</strong>
                  <span>Meter {record.meter_serialNum || 'Unavailable'}</span>
                </div>
                <span>Open account</span>
              </button>
            ))}
          </div>
        </Section>
      ) : null}

      {selected ? (
        <>
          <Section
            eyebrow="Selected Account"
            title={`${selected.last_name} billing summary`}
            description={`Recent periods on file for meter ${selected.meter_serialNum}.`}
          >
            <SummaryGrid
              items={[
                { label: 'Meter', value: selected.meter_serialNum || 'Unknown' },
                { label: 'Recent usage', value: `${formatNumber(summary.totalUsage)} gal` },
                { label: 'Highest period', value: `${formatNumber(summary.highestUsage)} gal` },
                { label: 'Est. charges', value: formatCurrency(summary.totalCharge) },
              ]}
            />
          </Section>

          <InfoTable
            title="Recent billing periods"
            description="Estimated charges use the current flat overage approach after the first 6,000 gallons in a period."
            columns={['Billing period', 'Usage', 'Over 6,000', 'Estimated charge']}
            rows={buildBillingRows(recentPeriods)}
          />

          {chartData.length ? (
            <article className={styles.chartCard}>
              <div className={styles.tableHeader}>
                <div>
                  <h3 className={styles.tableHeaderTitle}>Usage trend</h3>
                  <p className={styles.tableHeaderText}>
                    Usage by billing period for the selected account.
                  </p>
                </div>
              </div>
              <div className={styles.chartArea}>
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(16, 79, 104, 0.12)" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={formatChartLabelMMDDYYYY}
                      stroke="#4a6174"
                    />
                    <YAxis stroke="#4a6174" />
                    <Tooltip labelFormatter={formatChartLabelMMDDYYYY} />
                    <Line
                      type="monotone"
                      dataKey="usage"
                      stroke="#1b82a7"
                      strokeWidth={3}
                      dot={{ fill: '#1b82a7', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </article>
          ) : null}
        </>
      ) : null}
    </Page>
  );
}

export function MeterUsagePage({ meterSerialNum }) {
  const { data, error, loading } = useRemoteData(
    meterSerialNum ? `/api/people/${encodeURIComponent(meterSerialNum)}` : null,
  );

  const latestReading = useMemo(() => getLatestReading(data), [data]);
  const recentPeriods = useMemo(
    () => buildUsagePeriods(data, { chargeMode: 'flat', maxPeriods: 6 }),
    [data],
  );

  const [readingInput, setReadingInput] = useState('');
  const [usage, setUsage] = useState(null);
  const [message, setMessage] = useState('');

  function calculateUsage() {
    const numericReading = Number.parseInt(readingInput, 10);

    if (!latestReading) {
      setMessage('No baseline reading is available for this meter.');
      setUsage(null);
      return;
    }

    if (Number.isNaN(numericReading)) {
      setMessage('Enter the current meter reading using digits only.');
      setUsage(null);
      return;
    }

    if (numericReading < latestReading.reading) {
      setMessage(
        `The current reading cannot be lower than the latest official reading on file (${formatNumber(latestReading.reading)}).`,
      );
      setUsage(null);
      return;
    }

    setMessage('');
    setUsage(numericReading - latestReading.reading);
  }

  if (loading) {
    return (
      <Page>
        <LoadingState title="Loading meter" description="Fetching the latest reading on file." />
      </Page>
    );
  }

  if (error || !data) {
    return (
      <Page>
        <EmptyState
          title="Meter not found"
          description={error || 'We could not find that serial number.'}
          action={
            <ActionLink href="/howtoreadmeter.pdf" external>
              How to read your meter
            </ActionLink>
          }
        />
      </Page>
    );
  }

  return (
    <Page className={styles.page}>
      <Hero
        eyebrow="Meter Usage"
        title={`${data.last_name} meter lookup`}
        description="Enter the reading currently shown on your meter to estimate usage since the latest official reading on file."
        actions={
          <>
            <ActionLink href="/howtoreadmeter.pdf" external>
              How to read your meter
            </ActionLink>
          </>
        }
        stats={[
          { label: 'Meter', value: data.meter_serialNum },
          {
            label: 'Latest official reading',
            value: latestReading ? latestReading.label : 'Unavailable',
          },
          {
            label: 'Baseline value',
            value: latestReading ? formatNumber(latestReading.reading) : 'Unavailable',
          },
        ]}
      />

      <div className={styles.meterWrap}>
        <Panel className={styles.meterCard} title="Enter your current reading">
          <span className={styles.meterBadge}>Meter #{data.meter_serialNum}</span>
          <div className={styles.field}>
            <label htmlFor="current-reading" className={styles.label}>
              Current meter reading
            </label>
            <input
              id="current-reading"
              className={styles.input}
              inputMode="numeric"
              value={readingInput}
              onChange={(event) => {
                setReadingInput(event.target.value.replace(/\D/g, ''));
                setUsage(null);
                setMessage('');
              }}
              placeholder="Digits only"
            />
          </div>
          <div className={styles.buttonRow}>
            <button type="button" className={styles.button} onClick={calculateUsage}>
              Calculate usage
            </button>
            <button
              type="button"
              className={styles.buttonSecondary}
              onClick={() => {
                setReadingInput('');
                setUsage(null);
                setMessage('');
              }}
            >
              Clear
            </button>
          </div>

          {message ? <p className={styles.errorMessage}>{message}</p> : null}

          <div className={styles.meterResult}>
            <p className={styles.summaryLabel}>Current estimate</p>
            <p className={styles.meterValue}>
              {usage === null ? '0' : formatNumber(usage)} gal
            </p>
            <p className={styles.meterMeta}>
              Based on the latest official reading from{' '}
              {latestReading ? latestReading.label : 'the records on file'}.
            </p>
          </div>
        </Panel>

        <UsageGauge usage={usage ?? 0} />
      </div>

      <InfoTable
        title="Recent official reading periods"
        description="These are the latest stored periods on file for this meter."
        columns={['Billing period', 'Usage', 'Over 6,000', 'Estimated charge']}
        rows={buildBillingRows(recentPeriods)}
      />
    </Page>
  );
}

export function HistoryPage({ fetchUrl, mode, title, description, eyebrow }) {
  const { data, error, loading } = useRemoteData(fetchUrl);

  const readingHistory = useMemo(() => {
    if (!data) {
      return [];
    }

    return buildUsagePeriods(data, { chargeMode: 'flat', reverse: false });
  }, [data]);

  const recentBilling = useMemo(
    () =>
      readingHistory
        .filter((period) => period.toDate >= new Date(2023, 7, 1))
        .reverse()
        .slice(0, 8),
    [readingHistory],
  );

  const legacyBilling = useMemo(
    () =>
      buildUsagePeriods(data, {
        startKey: 'aug10_20',
        endKey: 'jun07_22',
        chargeMode: 'legacy',
        reverse: true,
      }),
    [data],
  );

  const annualBudget = useMemo(() => buildAnnualBudgetSummary(data), [data]);

  if (loading) {
    return (
      <Page>
        <LoadingState title="Loading history" description="Fetching the record details." />
      </Page>
    );
  }

  if (error || !data) {
    return (
      <Page>
        <EmptyState
          title="History unavailable"
          description={error || 'We could not find that account.'}
          action={<ActionLink href="/register">Open usage lookup</ActionLink>}
        />
      </Page>
    );
  }

  const heroStats = [
    { label: 'Account', value: data.last_name || 'Unknown' },
    { label: 'Meter', value: data.meter_serialNum || 'Unavailable' },
    {
      label: 'Latest reading',
      value: getLatestReading(data)?.label || 'Not available',
    },
  ];

  return (
    <Page className={styles.page}>
      <Hero
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={
          <>
            <ActionLink href="/register">Meter lookup</ActionLink>
          </>
        }
        stats={heroStats}
      />

      {mode === 'users' ? (
        <>
          <Section
            title="Recent bi-monthly billing"
            description="This section shows the newest reading periods using the current flat overage model."
          >
            <SummaryGrid
              items={[
                { label: 'Periods shown', value: String(recentBilling.length) },
                {
                  label: 'Usage tracked',
                  value: `${formatNumber(summarizeUsage(recentBilling).totalUsage)} gal`,
                },
                {
                  label: 'Estimated charges',
                  value: formatCurrency(summarizeUsage(recentBilling).totalCharge),
                },
                {
                  label: 'Highest period',
                  value: `${formatNumber(summarizeUsage(recentBilling).highestUsage)} gal`,
                },
              ]}
            />
            <InfoTable
              title="Current billing view"
              description="Overage estimates use the current flat-rate approach after the first 6,000 gallons."
              columns={['Billing period', 'Usage', 'Over 6,000', 'Estimated charge']}
              rows={buildBillingRows(recentBilling)}
            />
          </Section>

          {annualBudget.length ? (
            <Section
              title="2022-2023 annual budget summary"
              description="Historic annual usage and remaining gallons from the 48,000 gallon budget cycle."
            >
              <InfoTable
                title="Annual budget"
                description={`Year total: ${formatNumber(data.year_total)} gallons. Fees on file: ${data.fees || '0'}.`}
                columns={['Period', 'Range', 'Usage', 'Remaining of 48,000']}
                rows={annualBudget.map((period) => ({
                  id: period.key,
                  cells: [
                    period.label,
                    period.range,
                    `${formatNumber(period.usage)} gal`,
                    <span
                      key={`${period.key}-remaining`}
                      className={toneClass(period.remaining, { positiveIsGood: true })}
                    >
                      {period.remaining >= 0
                        ? `${formatNumber(period.remaining)} remaining`
                        : `${formatNumber(Math.abs(period.remaining))} over`}
                    </span>,
                  ],
                }))}
              />
            </Section>
          ) : null}

          {legacyBilling.length ? (
            <Section
              title="Historic tiered billing history"
              description="Older billing periods use the stepped fee model that was in place before the current flat overage rate."
            >
              <InfoTable
                title="Historical billing"
                description="Charges are calculated using the original stepped fee schedule for those periods."
                columns={['Billing period', 'Usage', 'Over 6,000', 'Charge']}
                rows={buildBillingRows(legacyBilling, { legacy: true })}
              />
            </Section>
          ) : null}
        </>
      ) : null}

      {mode === 'annual' ? (
        <Section
          title="Annual budget countdown"
          description="This historic view tracks usage against the annual 48,000 gallon allocation."
        >
          <SummaryGrid
            items={[
              { label: 'Budget', value: `${formatNumber(data.budget)} gal` },
              { label: 'Year total', value: `${formatNumber(data.year_total)} gal` },
              {
                label: 'Year remaining',
                value: `${formatNumber(Math.abs(Number(data.year_remain ?? 0)))} gal`,
              },
              { label: 'Fees on file', value: data.fees || '$0.00' },
            ]}
          />
          <InfoTable
            title="Annual usage periods"
            description="Each row shows period usage and how much of the annual allocation remained afterward."
            columns={['Period', 'Range', 'Usage', 'Remaining of 48,000']}
            rows={annualBudget.map((period) => ({
              id: period.key,
              cells: [
                period.label,
                period.range,
                `${formatNumber(period.usage)} gal`,
                <span
                  key={`${period.key}-remaining`}
                  className={toneClass(period.remaining, { positiveIsGood: true })}
                >
                  {period.remaining >= 0
                    ? `${formatNumber(period.remaining)} remaining`
                    : `${formatNumber(Math.abs(period.remaining))} over`}
                </span>,
              ],
            }))}
          />
        </Section>
      ) : null}

      {mode === 'over' ? (
        <Section
          title="Historic overage periods"
          description="Review stepped overage charges from earlier billing periods."
        >
          <SummaryGrid
            items={[
              { label: 'Periods shown', value: String(legacyBilling.length) },
              {
                label: 'Usage tracked',
                value: `${formatNumber(summarizeUsage(legacyBilling).totalUsage)} gal`,
              },
              {
                label: 'Total charges',
                value: formatCurrency(summarizeUsage(legacyBilling).totalCharge),
              },
              {
                label: 'Largest overage',
                value: `${formatNumber(
                  Math.max(...legacyBilling.map((period) => period.overage), 0),
                )} gal`,
              },
            ]}
          />
          <InfoTable
            title="Stepped fee history"
            description="Legacy charges increase in tiers after 6,000 gallons, then again beyond 10,000 and 20,000 gallons."
            columns={['Billing period', 'Usage', 'Over 6,000', 'Charge']}
            rows={buildBillingRows(legacyBilling, { legacy: true })}
          />
        </Section>
      ) : null}

      {mode === 'countdown' ? (
        <Section
          title="Usage threshold history"
          description="See how close each recorded period came to the 6,000 gallon threshold before charges started."
        >
          <InfoTable
            title="Threshold countdown"
            description="Positive values mean gallons remaining before the fee threshold. Negative values indicate how far the period went past it."
            columns={['Billing period', 'Usage', 'Remaining / over', 'Charge']}
            rows={legacyBilling.map((period) => ({
              id: period.id,
              cells: [
                period.rangeLabel,
                `${formatNumber(period.usage)} gal`,
                <span
                  key={`${period.id}-remaining`}
                  className={toneClass(period.remaining, { positiveIsGood: true })}
                >
                  {period.remaining >= 0
                    ? `${formatNumber(period.remaining)} before limit`
                    : `${formatNumber(Math.abs(period.remaining))} over limit`}
                </span>,
                formatCurrency(period.charge),
              ],
            }))}
          />
        </Section>
      ) : null}

      {mode === 'billing2023' ? (
        <Section
          title="Historic 2022-2023 usage"
          description="Usage history from the available 2022-2023 official readings."
        >
          <InfoTable
            title="Recorded periods"
            description="Usage is calculated between each official reading in the available 2022-2023 record set."
            columns={['Billing period', 'Usage', 'Over 6,000', 'Estimated charge']}
            rows={buildBillingRows(
              readingHistory
                .filter(
                  (period) =>
                    period.toDate >= new Date(2022, 5, 1) &&
                    period.toDate <= new Date(2023, 11, 31),
                )
                .reverse(),
            )}
          />
        </Section>
      ) : null}
    </Page>
  );
}
