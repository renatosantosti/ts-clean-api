import { IUser } from "../entities/User";

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
  execute(id: number): Promise<IUser>;
}

export interface IDeleteUserRepository {
  execute(id: number): Promise<IUser>;
}
