const getUrlApi = () => {
  if (typeof process.env.LOCAL_URL === 'string') {
    return process.env.LOCAL_URL;
  }
  // Vercel urls
  if (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string') {
    return `https://${process.env.NEXT_PUBLIC_SITE_URL}`;
  }

  return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
};

export const URL_API = getUrlApi();
