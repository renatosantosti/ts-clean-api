import { IUser } from "@/domain/entities/User";
import { ICreateUserRepository } from "@/domain/repository/userRepository";

export interface ICreateUser {
  execute(user: IUser): Promise<IUser>;
}

export class CreateUser implements ICreateUser {
  constructor(private readonly saveUserRepository: ICreateUserRepository) {}
  async execute(user: IUser): Promise<IUser> {
    const saved = await this.saveUserRepository.execute(user);
    return saved;
  }
}
