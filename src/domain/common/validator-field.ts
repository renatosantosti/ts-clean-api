export interface IValidatorField {
  isValid(a: unknown): Promise<boolean>;
}
