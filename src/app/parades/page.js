import { MediaLibraryPage } from '@/components/site/media-pages';
import { paradeVideos } from '@/components/site/site-content';

export default function Page() {
  return (
    <MediaLibraryPage
      eyebrow="Parade Archive"
      title="Annual Fourth of July parade videos"
      description="A year-by-year archive of Orchard Beach parade recordings."
      items={paradeVideos}
      primaryHref="/videos"
      primaryLabel="Open whale videos"
      secondaryHref="/contact"
      secondaryLabel="Share community history"
    />
  );
}
