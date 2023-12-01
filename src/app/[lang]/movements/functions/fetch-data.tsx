import { type Movement } from '../types/movements-types';
import { URL_API } from '@/utils/url/api-url';

export async function getDailyMovements (
  searchParams: string
): Promise<[] | [Movement[], number]> {
  try {
    const response = await fetch(
            `${URL_API}/api/modules/daily-movements?${searchParams}`,
            { next: { revalidate: 30 } }
    );
    const data = await response.json();
    return data === undefined ? [] : [data.data, data.totalRecords];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
