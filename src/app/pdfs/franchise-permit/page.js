import { DocumentViewer } from '@/components/site/page-shell';

export default function Page() {
  return (
    <DocumentViewer
      eyebrow="Permit File"
      title="Mason County franchise permit"
      description="Franchise permit documentation for the Orchard Beach system."
      embedUrl="/franchisepermit.pdf"
      downloadUrl="/franchisepermit.pdf"
    />
  );
}
