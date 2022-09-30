import { IUser, UpdateUserPasswordPayload } from "@/domain/entities/User";
import { IHashPasswordTransform } from "@/domain/common/hash-password-transform";
import { IValidatorField } from "@/domain/common/validator-field";
import { CreateUser } from "@/domain/use-cases/User/createUser";
import { GetUser } from "@/domain/use-cases/User/getUser";
import { UpdateUser } from "@/domain/use-cases/User/updateUser";
import { UpdateUserPassword } from "@/domain/use-cases/User/updateUserPassword";
import {
  ICreateUserRepository,
  IGetUserRepository,
  IUpdateUserRepository,
  IUpdateUserPasswordRepository,
} from "@/domain/repository/userRepository";

// Mock repository for get user
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
// Mock repository for create new user
class MockCreateUserRepository implements ICreateUserRepository {
  async execute(user: IUser): Promise<IUser> {
    return {
      ...user,
      id: 15,
    } as IUser;
  }
}

// Mock repository for update user
class MockUpdateUserRepository implements IUpdateUserRepository {
  async execute(user: IUser): Promise<IUser> {
    return {
      ...user,
    } as IUser;
  }
}

// Mock repository for update user password
class MockUpdateUserPasswordRepository
  implements IUpdateUserPasswordRepository
{
  async execute(
    user: UpdateUserPasswordPayload
  ): Promise<UpdateUserPasswordPayload> {
    return {
      id: user.id,
      password: await new MockToHashService().execute(user.password),
    } as IUser;
  }
}

// Mock hash password
class MockToHashService implements IHashPasswordTransform {
  execute(password: string): Promise<string> {
    return new Promise((resolve) => {
      return resolve("hash_" + password);
    });
  }
}
// Mock validator field for password
class MockIValidatorFieldPassword implements IValidatorField {
  isValid(password: any): Promise<boolean> {
    return new Promise((resolve) => {
      if (password?.length >= 8) {
        resolve(true);
      } else {
        throw new Error("password should has at least 8 characters");
      }
    });
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

  it("Should update user password", async () => {
    // Doing test
    const userUpdatedUserPayload: UpdateUserPasswordPayload =
      await new UpdateUserPassword(
        new MockUpdateUserPasswordRepository(),
        new MockToHashService()
      ).execute(
        {
          id: 15,
          password: "12345678",
        },
        [new MockIValidatorFieldPassword()]
      );
    expect(userUpdatedUserPayload.password.includes("hash")).toBe(true);
  });

  it("Should not update user password wrong", async () => {
    try {
      // Doing test
      await new UpdateUserPassword(
        new MockUpdateUserPasswordRepository(),
        new MockToHashService()
      ).execute(
        {
          id: 15,
          password: "123",
        },
        [new MockIValidatorFieldPassword()]
      );
      throw new Error("password updated");
    } catch (err) {
      expect((err as Error).message).toBe("Invalid password");
    }
  });
});
