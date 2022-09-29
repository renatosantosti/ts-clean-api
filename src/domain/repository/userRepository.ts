import {
  IUser,
  UpdateUserPayload,
  UpdateUserPasswordPayload,
} from "../entities/User";

export interface ICreateUserRepository {
  execute(user: IUser): Promise<IUser>;
}

export interface IGetUserRepository {
  execute(id: number): Promise<IUser>;
}

export interface IListUserRepository {
  execute(user: IUser): Promise<IUser>;
}

export interface IUpdateUserRepository {
  execute(user: UpdateUserPayload): Promise<IUser>;
}
export interface IUpdateUserPasswordRepository {
  execute(user: UpdateUserPasswordPayload): Promise<IUser>;
}

export interface IDeleteUserRepository {
  execute(id: number): void;
}
