import { HistoryPage } from '@/components/account/account-pages';

export default async function Page({ params }) {
  const { meter_serialNum } = await params;

  return (
    <HistoryPage
      fetchUrl={`/api/people/${encodeURIComponent(meter_serialNum)}`}
      mode="billing2023"
      eyebrow="Historic Usage"
      title={`Meter ${meter_serialNum} usage history`}
      description="A condensed reading history for the earlier 2022-2023 usage pages."
    />
  );
}
