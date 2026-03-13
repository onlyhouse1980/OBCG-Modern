const LINKS = [
  { path: '/about', changefreq: 'never', priority: 0.3 },
  { path: '/articles', changefreq: 'never', priority: 0.3 },
  { path: '/executive', changefreq: 'never', priority: 0.3 },
  { path: '/register', changefreq: 'never', priority: 0.3 },
  { path: '/contact', changefreq: 'never', priority: 0.3 },
];

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://obcg.org';

  return LINKS.map(({ path, ...rest }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    ...rest,
  }));
}
