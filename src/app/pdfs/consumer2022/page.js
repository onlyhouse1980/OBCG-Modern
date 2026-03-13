import { DocumentViewer } from '@/components/site/page-shell';

export default function Page() {
  return (
    <DocumentViewer
      eyebrow="Water Quality Report"
      title="Consumer confidence report 2021"
      description="Annual consumer confidence reporting for Orchard Beach water users."
      embedUrl="https://drive.google.com/file/d/1jJbNsfyhuwLOaFYmoqll0tFeCnsRnOWk/preview"
    />
  );
}
