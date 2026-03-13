import { MediaLibraryPage } from '@/components/site/media-pages';
import { whaleVideos } from '@/components/site/site-content';

export default function Page() {
  return (
    <MediaLibraryPage
      eyebrow="Whale Videos"
      title="Pickering Passage whale sightings"
      description="A small archive of community-captured whale videos from Pickering Passage."
      items={whaleVideos}
      primaryHref="/videos/video"
      primaryLabel="View PUD meeting video"
      secondaryHref="/parades"
      secondaryLabel="Open parade archive"
    />
  );
}
