import { MediaItemPage } from '@/components/site/media-pages';

export default function Page() {
  return (
    <MediaItemPage
      eyebrow="Community Meeting"
      title="PUD 1 meeting video"
      description="Meeting archive from May 16, 2025."
      src="https://drive.google.com/file/d/1Op6BCXirdL5YD0YOXRKE890U7uzvESOf/preview"
      backHref="/videos"
      stats={[
        { label: 'Date', value: 'May 16, 2025' },
        { label: 'Type', value: 'Meeting archive' },
        { label: 'Player', value: 'Embedded' },
      ]}
      embed
    />
  );
}
