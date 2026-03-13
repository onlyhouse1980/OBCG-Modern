import { HistoryPage } from '@/components/account/account-pages';

export default async function Page({ params }) {
  const { last_name } = await params;

  return (
    <HistoryPage
      fetchUrl={`/api/overuse/${encodeURIComponent(last_name)}`}
      mode="countdown"
      eyebrow="Threshold Countdown"
      title={`${last_name} threshold history`}
      description="A threshold-focused view of how close each historic period came to the 6,000 gallon billing trigger."
    />
  );
}
