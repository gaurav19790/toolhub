export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
      },
    ],
    sitemap: 'https://yourdomain.com/sitemap.xml',
    host: 'https://yourdomain.com',
  };
}