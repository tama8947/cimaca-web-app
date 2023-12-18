import { type Module } from '../modules-types/types';
import { URL_API } from '@/utils/url/api-url';

export async function getEnabledModules (
  searchParams: string
): Promise<Module[]> {
  try {
    const response = await fetch(
            `${URL_API}/api/modules/modules/get-enabled?${searchParams}`,
            { next: { revalidate: 30 } }
    );
    const data = await response.json();
    return data === undefined ? [] : data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
