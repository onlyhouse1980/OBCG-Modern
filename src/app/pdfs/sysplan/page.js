import { DocumentViewer } from '@/components/site/page-shell';

export default function Page() {
  return (
    <DocumentViewer
      eyebrow="System Planning"
      title="Water system plan"
      description="Planning documentation for the Orchard Beach water system."
      embedUrl="https://drive.google.com/file/d/17lD6BK833c90-iDJ4hFkgL7wuZV1NtPN/preview"
    />
  );
}
