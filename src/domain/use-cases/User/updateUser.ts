import { IUser, UpdateUserPayload } from "@/domain/entities/User";
import { IUpdateUserRepository } from "@/domain/repository/userRepository";

export interface IUpdateUser {
  execute(user: IUser): Promise<UpdateUserPayload>;
}

export class UpdateUser implements IUpdateUser {
  constructor(private readonly saveUserRepository: IUpdateUserRepository) {}
  async execute(user: UpdateUserPayload): Promise<IUser> {
    const saved = await this.saveUserRepository.execute(user);
    return saved;
  }
}
