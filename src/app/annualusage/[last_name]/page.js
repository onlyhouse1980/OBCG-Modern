import { HistoryPage } from '@/components/account/account-pages';

export default async function Page({ params }) {
  const { last_name } = await params;

  return (
    <HistoryPage
      fetchUrl={`/api/annualuse/${encodeURIComponent(last_name)}`}
      mode="annual"
      eyebrow="Annual Usage"
      title={`${last_name} annual usage`}
      description="A streamlined view of the historic annual budget cycle and remaining gallons by period."
    />
  );
}
