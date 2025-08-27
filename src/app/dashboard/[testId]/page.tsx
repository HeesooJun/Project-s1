import DashboardClient from './dashboard-client';

export default function DashboardPage({ params }: { params: { testId: string } }) {
  return <DashboardClient testId={params.testId} />;
}