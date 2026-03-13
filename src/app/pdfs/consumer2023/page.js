import { DocumentViewer } from '@/components/site/page-shell';

export default function Page() {
  return (
    <DocumentViewer
      eyebrow="Water Quality Report"
      title="Consumer confidence report 2022"
      description="Annual consumer confidence reporting for Orchard Beach water users."
      embedUrl="https://drive.google.com/file/d/1C5qGn2uNg4T6pxUdgwVobAlTngwSJa-N/preview"
    />
  );
}
