import { type User } from '../users-types/types';
import { URL_API } from '@/utils/url/api-url';

export async function getUsers (
  searchParams: string
): Promise<[] | [User[], number]> {
  try {
    const response = await fetch(
            `${URL_API}/api/modules/users?${searchParams}`,
            { next: { revalidate: 30 } }
    );
    const data = await response.json();
    return data === undefined ? [] : [data.data, data.totalRecords];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
