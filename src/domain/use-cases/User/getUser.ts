import { IUser } from "@/domain/entities/User";
import { IGetUserRepository } from "@/domain/repository/userRepository";

export interface IGetUser {
  execute(id: number): Promise<IUser>;
}

export class GetUser implements IGetUser {
  constructor(private readonly getUserRepository: IGetUserRepository) {}
  execute(id: number): Promise<IUser> {
    return this.getUserRepository.execute(id);
  }
}
