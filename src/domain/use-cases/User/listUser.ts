import { IUser } from "@/domain/entities/User";
import { IListUserRepository } from "@/domain/repository/userRepository";

export interface IListUser {
  execute(): Promise<Array<IUser>>;
}

export class ListUser implements IListUser {
  constructor(private readonly listUserRepository: IListUserRepository) {}
  execute(): Promise<Array<IUser>> {
    return this.listUserRepository.execute();
  }
}
