import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export const useURLSearchParams = (
  searchParamsString: string[],
  data: unknown[]
) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [isLoadingURL, setIsLoadingURL] = useState(false);

  const [previousSearchParams, setPreviousSearchParams] = useState('');

  const setUrlSearchParams = useCallback(() => {
    const stringSearchParams = searchParams.toString();
    const urlSearchParams = searchParamsString.reduce((previous, current, idx) => {
      return new URLSearchParams(`${previous.toString()}&${current}`);
    }, new URLSearchParams()
    ).toString();

    if (stringSearchParams === '') router.replace(`${pathName}?${urlSearchParams}`);

    if (urlSearchParams !== '' && urlSearchParams !== previousSearchParams) {
      router.push(`${pathName}?${urlSearchParams}`);
      setPreviousSearchParams(urlSearchParams);
      setIsLoadingURL(true);
    }
  }, [searchParamsString, router, searchParams, pathName, previousSearchParams]);

  useEffect(() => {
    setUrlSearchParams();
  }, [setUrlSearchParams]);

  useEffect(() => { if (isLoadingURL) setIsLoadingURL(false); }, [data, isLoadingURL]);

  return { isLoadingURL };
};
