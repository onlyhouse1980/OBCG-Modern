import { DocumentViewer } from '@/components/site/page-shell';

export default function Page() {
  return (
    <DocumentViewer
      eyebrow="Meeting Minutes"
      title="2023 board appointment minutes"
      description="Board appointment meeting minutes from November 13, 2023."
      embedUrl="https://drive.google.com/file/d/1KosFWqxpNCN1vwOL-44RJmNN4El0d7Rr/preview"
    />
  );
}
