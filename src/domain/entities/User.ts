export type IUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  active: boolean;
};

export type UpdateUserPayload = {
  id: number;
  name: string;
  email: string;
  active: boolean;
};

export interface UpdateUserPasswordPayload {
  id: number;
  password: string;
}
