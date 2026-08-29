import { baseUrl } from './baseUrl';

export const serverFetch = async ({
  path,
  revalidate = 60,
  cache,
}: {
  path: string;
  revalidate?: number;
  cache?: RequestCache;
}) => {
  try {
    const res = await fetch(`${baseUrl}/${path}`, {
      ...(cache ? { cache } : { next: { revalidate } }),
    });

    if (!res.ok) {
      throw new Error(`API request failed: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from API (${path}):`, error);
    return null;
  }
};
