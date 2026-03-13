import { MediaItemPage } from '@/components/site/media-pages';
import { whaleVideos } from '@/components/site/site-content';

export default function Page() {
  const video = whaleVideos[2];

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
        { label: 'View', value: 'Shoreline angle' },
      ]}
    />
  );
}
