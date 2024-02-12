// 'use client';

import { type ActionButton } from '@/components/organisms/reusable-table/types/modified-types';

export const actionButtons: ActionButton[] = [
  {
    label     : 'Editar',
    className : 'btn btn-sm btn-primary',
    goto      : 'roles/{id}/edit'
  }
];
