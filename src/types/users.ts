export type ActionMode = 'edit' | 'delete';
export type UserMode = 'admin' | 'guest' | 'preview';

export const ACTION_MODE = {
  EDIT: 'edit',
  DELETE: 'delete',
} as const;

export const USER_MODE = {
  ADMIN: 'admin',
  GUEST: 'guest',
  PREVIEW: 'preview',
} as const;
