import { URL_API } from '@/utils/url/api-url';
import { type Movement } from '../types/movements-types';

export async function getDailyMovements (): Promise<Movement[]> {
  try {
    const response = await fetch(`${URL_API}/api/daily-movements`, { next: { revalidate: 30 } });
    const body = await response.text();
    const data = JSON.parse(body).data;
    return data === undefined ? [] : data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
