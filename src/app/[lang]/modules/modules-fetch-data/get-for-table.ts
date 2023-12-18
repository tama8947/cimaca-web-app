import { type DataForTable, type Module } from '../modules-types/types';
import { URL_API } from '@/utils/url/api-url';

export async function getModulesForTable (
  searchParams: string
): Promise<[] | [Module[], number]> {
  try {
    const response = await fetch(
            `${URL_API}/api/modules/modules/get-for-table?${searchParams}`,
            { next: { revalidate: 30 } }
    );
    const data: DataForTable = await response.json();
    return data === undefined ? [] : [data.data, data.totalRecords];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
