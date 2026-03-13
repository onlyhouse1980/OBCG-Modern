import { DocumentViewer } from '@/components/site/page-shell';

export default function Page() {
  return (
    <DocumentViewer
      eyebrow="Meeting Minutes"
      title="2024 annual meeting minutes"
      description="Minutes from the 2024 Orchard Beach annual meeting."
      embedUrl="https://drive.google.com/file/d/1E6QSZxqgehmMSoql4ZiTtE78fiq2FKiu/preview"
    />
  );
}
