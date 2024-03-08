'use client';

import { nameInCode } from '../metadata';
import { type ActionButton } from '@/components/organisms/reusable-table/types/modified-types';

export const actionButtons: ActionButton[] = [
  {
    label     : 'Editar',
    className : 'btn btn-sm btn-primary',
    goto      : `${nameInCode}/{id}/edit`
  }
];
