import { HistoryPage } from '@/components/account/account-pages';

export default async function Page({ params }) {
  const { last_name } = await params;

  return (
    <HistoryPage
      fetchUrl={`/api/users/${encodeURIComponent(last_name)}`}
      mode="users"
      eyebrow="Account History"
      title={`${last_name} account history`}
      description="Recent billing periods, annual budget history, and historic stepped overage charges."
    />
  );
}
