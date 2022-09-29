import { IUser } from "@/domain/entities/User";
import { CreateUser } from "@/domain/use-cases/User/createUser";
import { GetUser } from "@/domain/use-cases/User/getUser";
import { UpdateUser } from "@/domain/use-cases/User/updateUser";
import {
  ICreateUserRepository,
  IGetUserRepository,
  IUpdateUserRepository,
} from "@/domain/repository/userRepository";

// Mock repository
class MockGetUserRepository implements IGetUserRepository {
  async execute(id: number): Promise<IUser> {
    return {
      id,
      name: "xyz",
      email: "string@test",
      password: "pwd",
      active: true,
    };
  }
}
// Mock repository
class MockCreateUserRepository implements ICreateUserRepository {
  async execute(user: IUser): Promise<IUser> {
    return {
      ...user,
      id: 15,
    } as IUser;
  }
}

// Mock repository
class MockUpdateUserRepository implements IUpdateUserRepository {
  async execute(user: IUser): Promise<IUser> {
    return {
      ...user,
    } as IUser;
  }
}

describe("User", () => {
  it("Should get a user by id", async () => {
    // create use case
    const getUser: GetUser = new GetUser(new MockGetUserRepository());
    // Doing test
    const user: IUser = await getUser.execute(15);
    expect(user.id).toBe(15);
  });

  it("Should create a new user", async () => {
    // create use case
    const createUser: CreateUser = new CreateUser(
      new MockCreateUserRepository()
    );
    // Doing test
    const user: IUser = await createUser.execute({
      id: 0,
      name: "xyz",
      email: "string@test",
      password: "pwd",
      active: true,
    });
    expect(user.name).toBe("xyz");
    expect(user.id).toBeGreaterThan(0);
  });

  it("Should update a user", async () => {
    // create use case
    const user = {
      id: 25,
      name: "xyz",
      email: "string@test",
      password: "pwd",
      active: true,
    };

    // Doing test
    const userUpdated: IUser = await new UpdateUser(
      new MockUpdateUserRepository()
    ).execute({
      ...user,
      name: "newName",
      email: "newEmail@test.com",
    });
    expect(userUpdated.name).toBe("newName");
    expect(userUpdated.email).toBe("newEmail@test.com");
    expect(userUpdated.id).toEqual(25);
  });
});
