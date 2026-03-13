import { DocumentViewer } from '@/components/site/page-shell';

export default function Page() {
  return (
    <DocumentViewer
      eyebrow="Water Quality Report"
      title="Consumer confidence report 2023"
      description="Annual consumer confidence reporting for Orchard Beach water users."
      embedUrl="https://drive.google.com/file/d/138cLOdgQe-NH56BaG8h00q7hZw1qWDT_/preview"
    />
  );
}
