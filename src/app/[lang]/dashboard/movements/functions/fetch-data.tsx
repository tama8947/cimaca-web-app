import { type Movement } from '../types/movements-types';

export async function getDailyMovements (): Promise<Movement[]> {
  try {
    const response = await fetch(`${process.env.STAGE_URL}/api/daily-movements`, { next: { revalidate: 30 } });
    const body = await response.text();
    const data = JSON.parse(body).data;
    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
