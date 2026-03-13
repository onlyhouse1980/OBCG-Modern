const MONTHS = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
});

const READING_KEY = /^([a-z]{3})(\d{2})_(\d{2})$/i;

export function formatNumber(value) {
  const numericValue = Number(value ?? 0);
  if (!Number.isFinite(numericValue)) {
    return '0';
  }

  return numericValue.toLocaleString();
}

export function formatCurrency(value) {
  const numericValue = Number(value ?? 0);
  if (!Number.isFinite(numericValue)) {
    return '$0.00';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(numericValue);
}

export function parseReadingKey(key) {
  const match = String(key).match(READING_KEY);
  if (!match) {
    return null;
  }

  const [, monthKey, dayValue, yearValue] = match;
  const monthIndex = MONTHS[monthKey.toLowerCase()];
  if (monthIndex === undefined) {
    return null;
  }

  const fullYear = 2000 + Number(yearValue);
  const day = Number(dayValue);
  const date = new Date(fullYear, monthIndex, day);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return {
    key,
    date,
    label: DATE_FORMATTER.format(date),
    shortLabel: `${monthKey.slice(0, 1).toUpperCase()}${monthKey.slice(1).toLowerCase()} ${dayValue}, ${fullYear}`,
  };
}

export function collectReadingSeries(record) {
  if (!record) {
    return [];
  }

  return Object.entries(record)
    .map(([key, value]) => {
      const parsed = parseReadingKey(key);
      if (!parsed) {
        return null;
      }

      const reading = Number(value);
      if (!Number.isFinite(reading)) {
        return null;
      }

      return {
        ...parsed,
        reading,
      };
    })
    .filter(Boolean)
    .sort((left, right) => left.date - right.date);
}

export function getLatestReading(record) {
  const readings = collectReadingSeries(record);
  return readings.at(-1) ?? null;
}

export function getPreviousReading(record) {
  const readings = collectReadingSeries(record);
  return readings.at(-2) ?? null;
}

export function calculateFlatCharge(usage, limit = 6000, rate = 0.025) {
  const numericUsage = Number(usage ?? 0);
  if (!Number.isFinite(numericUsage) || numericUsage <= limit) {
    return 0;
  }

  return (numericUsage - limit) * rate;
}

export function calculateLegacyCharge(usage, limit = 6000) {
  const numericUsage = Number(usage ?? 0);
  if (!Number.isFinite(numericUsage) || numericUsage <= limit) {
    return 0;
  }

  if (numericUsage < 10000) {
    return (numericUsage - limit) * 0.005;
  }

  if (numericUsage < 20000) {
    return (numericUsage - 10000) * 0.01 + 19.99;
  }

  return (numericUsage - 20000) * 0.025 + 19.99 + 99.98;
}

export function buildUsagePeriods(
  record,
  {
    startKey,
    endKey,
    maxPeriods,
    limit = 6000,
    chargeMode = 'flat',
    reverse = true,
  } = {},
) {
  const startDate = startKey ? parseReadingKey(startKey)?.date : null;
  const endDate = endKey ? parseReadingKey(endKey)?.date : null;

  const readings = collectReadingSeries(record).filter(({ date }) => {
    if (startDate && date < startDate) {
      return false;
    }

    if (endDate && date > endDate) {
      return false;
    }

    return true;
  });

  const periods = [];

  for (let index = 1; index < readings.length; index += 1) {
    const previous = readings[index - 1];
    const current = readings[index];
    const usage = current.reading - previous.reading;
    const overage = Math.max(usage - limit, 0);
    const charge =
      chargeMode === 'legacy'
        ? calculateLegacyCharge(usage, limit)
        : calculateFlatCharge(usage, limit);

    periods.push({
      id: `${previous.key}-${current.key}`,
      fromKey: previous.key,
      toKey: current.key,
      fromLabel: previous.label,
      toLabel: current.label,
      rangeLabel: `${previous.label} to ${current.label}`,
      fromDate: previous.date,
      toDate: current.date,
      usage,
      overage,
      remaining: limit - usage,
      charge,
      currentReading: current.reading,
      previousReading: previous.reading,
      limit,
    });
  }

  const ordered = reverse ? periods.reverse() : periods;
  if (!maxPeriods) {
    return ordered;
  }

  return ordered.slice(0, maxPeriods);
}

export function buildAnnualBudgetSummary(record) {
  if (!record) {
    return [];
  }

  const budget = Number(record.budget ?? 0);
  const steps = [
    { key: 'jun_22', label: 'Jun 2022', range: 'Jun 07, 2022 to Aug 05, 2022' },
    { key: 'aug_22', label: 'Aug 2022', range: 'Aug 05, 2022 to Oct 07, 2022' },
    { key: 'oct_22', label: 'Oct 2022', range: 'Oct 07, 2022 to Dec 09, 2022' },
    { key: 'dec_22', label: 'Dec 2022', range: 'Dec 09, 2022 to Feb 04, 2023' },
    { key: 'feb_23', label: 'Feb 2023', range: 'Feb 04, 2023 to Apr 06, 2023' },
    { key: 'apr_23', label: 'Apr 2023', range: 'Apr 06, 2023 to Jun 05, 2023' },
  ];

  let usedSoFar = 0;

  return steps
    .map((step) => {
      const usage = Number(record[step.key]);
      if (!Number.isFinite(usage)) {
        return null;
      }

      usedSoFar += usage;

      return {
        ...step,
        usage,
        remaining: budget - usedSoFar,
      };
    })
    .filter(Boolean);
}

export function summarizeUsage(periods) {
  if (!periods.length) {
    return {
      totalUsage: 0,
      totalCharge: 0,
      highestUsage: 0,
      highestCharge: 0,
    };
  }

  return periods.reduce(
    (summary, period) => ({
      totalUsage: summary.totalUsage + period.usage,
      totalCharge: summary.totalCharge + period.charge,
      highestUsage: Math.max(summary.highestUsage, period.usage),
      highestCharge: Math.max(summary.highestCharge, period.charge),
    }),
    {
      totalUsage: 0,
      totalCharge: 0,
      highestUsage: 0,
      highestCharge: 0,
    },
  );
}
