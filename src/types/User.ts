import { MemberType } from './MemberType';

export type User = {
  sub: number; // userId
  name: string;
  roles: MemberType[];
};
