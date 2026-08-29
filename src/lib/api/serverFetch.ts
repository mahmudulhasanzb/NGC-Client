import { baseUrl } from './baseUrl';

export const serverFetch = async ({
  path,
  revalidate,
  cache = 'no-store',
}: {
  path: string;
  revalidate?: number;
  cache?: RequestCache;
}) => {
  try {
    const fetchOptions: RequestInit =
      revalidate !== undefined
        ? { next: { revalidate } }
        : { cache: 'no-store' };

    const res = await fetch(`${baseUrl}/${path}`, {
      ...fetchOptions,
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
