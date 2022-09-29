import { IUser, UpdateUserPasswordPayload } from "@/domain/entities/User";
import { IValidatorField } from "@/domain/common/validator-field";
import { IHashPasswordTransform } from "@/domain/common/hash-password-transform";

export interface IUpdatePassword {
  execute(
    user: UpdateUserPasswordPayload,
    validators: IValidatorField[]
  ): Promise<IUser>;
}

export class UpdatePassword implements IUpdatePassword {
  constructor(
    private readonly updatePassword: UpdateUserPasswordPayload,
    readonly hashPasswordTransform: IHashPasswordTransform[]
  ) {}

  async execute(
    user: UpdateUserPasswordPayload,
    validators: IValidatorField[]
  ): Promise<IUser> {
    try {
      validators.map((valitor) => valitor.isValid(user.password));
      return this.updatePassword.execute(user);
    } catch (err) {
      throw new Error("Invalid password");
    }
  }
}
