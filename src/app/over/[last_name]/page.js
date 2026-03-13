import { HistoryPage } from '@/components/account/account-pages';

export default async function Page({ params }) {
  const { last_name } = await params;

  return (
    <HistoryPage
      fetchUrl={`/api/overuse/${encodeURIComponent(last_name)}`}
      mode="over"
      eyebrow="Historic Overage"
      title={`${last_name} overage history`}
      description="Historic stepped overage charges from the earlier billing structure."
    />
  );
}
