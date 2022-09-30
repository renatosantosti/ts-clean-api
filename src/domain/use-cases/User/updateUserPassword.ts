import { UpdateUserPasswordPayload } from "@/domain/entities/User";
import { IValidatorField } from "@/domain/common/validator-field";
import { IHashPasswordTransform } from "@/domain/common/hash-password-transform";
import { IUpdateUserPasswordRepository } from "@/domain/repository/userRepository";
export interface IUpdatePassword {
  execute(
    user: UpdateUserPasswordPayload,
    validators: IValidatorField[]
  ): Promise<UpdateUserPasswordPayload>;
}

export class UpdateUserPassword implements IUpdatePassword {
  constructor(
    private readonly updateUserPasswordRepository: IUpdateUserPasswordRepository,
    readonly hashPasswordTransform: IHashPasswordTransform
  ) {}

  async execute(
    user: UpdateUserPasswordPayload,
    validators: IValidatorField[]
  ): Promise<UpdateUserPasswordPayload> {
    try {
      const valitionsPromisses = validators.map(
        async (valitor) => await valitor.isValid(user.password)
      );
      try {
        await Promise.all(valitionsPromisses);
        const pass = await this.hashPasswordTransform.execute(user.password);
        return this.updateUserPasswordRepository.execute({
          ...user,
          password: pass,
        });
      } catch (err) {
        throw new Error("Erro ao validar");
      }
    } catch (err) {
      throw new Error("Invalid password");
    }
  }
}
