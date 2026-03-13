import { MediaItemPage } from '@/components/site/media-pages';
import { paradeVideos } from '@/components/site/site-content';

export default function Page() {
  const video = paradeVideos[0];

  return (
    <MediaItemPage
      eyebrow="Parade Archive"
      title={video.title}
      description={video.description}
      src={video.src}
      backHref="/parades"
      stats={[
        { label: 'Archive', value: 'Parade' },
        { label: 'Year', value: '2018' },
        { label: 'Format', value: 'Video' },
      ]}
    />
  );
}
