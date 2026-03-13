import { MediaItemPage } from '@/components/site/media-pages';
import { whaleVideos } from '@/components/site/site-content';

export default function Page() {
  const video = whaleVideos[0];

  return (
    <MediaItemPage
      eyebrow="Whale Video"
      title={video.title}
      description={video.description}
      src={video.src}
      backHref="/videos"
      stats={[
        { label: 'Archive', value: 'Whales' },
        { label: 'Location', value: 'Pickering Passage' },
        { label: 'Recorded', value: 'July 2022' },
      ]}
    />
  );
}
