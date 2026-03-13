import { DocumentViewer } from '@/components/site/page-shell';

export default function Page() {
  return (
    <DocumentViewer
      eyebrow="Meeting Minutes"
      title="September 2023 special meeting minutes"
      description="Special meeting minutes from September 17, 2023."
      embedUrl="https://drive.google.com/file/d/1Fj5pEnQhuoSXwU02ucB5fw2ATrq-tfpk/preview"
    />
  );
}
