import { baseUrl } from './baseUrl';

export const serverMutation = async ({
  data,
  path,
  method = 'POST',
}: {
  data?: any;
  path: string;
  method?: 'POST' | 'PATCH' | 'PUT' | 'DELETE';
}) => {
  try {
    const res = await fetch(`${baseUrl}/${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => null);
      throw new Error(errData?.message || `API request failed with status ${res.status}`);
    }

    const resData = await res.json();
    return resData;
  } catch (error) {
    console.error(`Error mutating API (${path}):`, error);
    throw error;
  }
};
