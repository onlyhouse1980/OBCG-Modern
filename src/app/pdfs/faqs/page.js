import { DocumentViewer } from '@/components/site/page-shell';

export default function Page() {
  return (
    <DocumentViewer
      eyebrow="Help"
      title="Frequently asked questions"
      description="Reference answers for common Orchard Beach water and account questions."
      embedUrl="/FAQ.pdf"
      downloadUrl="/FAQ.pdf"
    />
  );
}
