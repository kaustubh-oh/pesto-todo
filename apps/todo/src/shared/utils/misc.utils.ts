/**
 * Used to either keep a slash or remove it irrespective of the url input.
 * Assuming pure url w/o any query parameters
 * @param url
 * @param keepSlash
 * @returns cleaned url string
 */
export const cleanUrlTrialingSlash = (url: string, keepSlash = true) => {
  const hasSlash = url.charAt(url.length - 1) === '/';

  if (!hasSlash && keepSlash) {
    return url + '/';
  }

  if (hasSlash && !keepSlash) {
    return url.slice(0, -1); // Remove the trailing slash
  }

  return url; // No action needed, return the original URL
};
