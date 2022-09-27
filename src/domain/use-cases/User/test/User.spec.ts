import { IUser } from "@/domain/entities/User";
import { CreateUser } from "@/domain/use-cases/User/createUser";
import { ICreateUserRepository } from "@/domain/repository/userRepository";

// Mock repository
class MockCreateUserRepository implements ICreateUserRepository {
  async execute(user: IUser): Promise<IUser> {
    return {
      ...user,
      id: 15,
    } as IUser;
  }
}

describe("User", () => {
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
});
