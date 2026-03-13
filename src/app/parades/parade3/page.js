import { MediaItemPage } from '@/components/site/media-pages';
import { paradeVideos } from '@/components/site/site-content';

export default function Page() {
  const video = paradeVideos[2];

  return (
    <MediaItemPage
      eyebrow="Parade Archive"
      title={video.title}
      description={video.description}
      src={video.src}
      backHref="/parades"
      stats={[
        { label: 'Archive', value: 'Parade' },
        { label: 'Year', value: '2020' },
        { label: 'Format', value: 'Video' },
      ]}
    />
  );
}
