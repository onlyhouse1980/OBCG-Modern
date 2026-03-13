import { MeterUsagePage } from '@/components/account/account-pages';

export default async function Page({ params }) {
  const { meter_serialNum } = await params;

  return <MeterUsagePage meterSerialNum={meter_serialNum} />;
}
