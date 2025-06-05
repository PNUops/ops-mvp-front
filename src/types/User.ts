import { MemberType } from './MemberType';

export type User = {
  id: number;
  name: string;
  roles: MemberType[];
};
