import { type Role } from '../roles-types/types';
import { URL_API } from '@/utils/url/api-url';

export async function getRoles (
  searchParams: string
): Promise<[] | [Role[], number]> {
  try {
    const response = await fetch(
            `${URL_API}/api/modules/roles/get-for-table?${searchParams}`,
            { next: { revalidate: 30 } }
    );
    const data = await response.json();
    return data === undefined ? [] : [data.data, data.totalRecords];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
