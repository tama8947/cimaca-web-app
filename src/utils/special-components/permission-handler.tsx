import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useGetPermissions } from '@/config/global-hooks/permissions';
import { type UserWithRoleType } from '@/global-types/permissions-types';

export default function PermissionHandler () {
  const pathName = usePathname();
  const session = useSession();
  const { data, refetch } = useGetPermissions();
  useEffect(() => {
    if (session?.data?.user?.email !== undefined) refetch().then(() => {}).catch(() => {});

    const user = session.data?.user as UserWithRoleType;

    if (data !== undefined && user !== null) {
      user.role = data;
    }
  }, [pathName, data]);
  return (
    <></>
  );
};
