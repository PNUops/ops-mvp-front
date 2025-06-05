import { MemberType } from './MemberType';

export type User = {
  memberId: number;
  name: string;
  roles: MemberType;
};
