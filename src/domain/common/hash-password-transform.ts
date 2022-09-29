export interface IHashPasswordTransform {
  execute(password: string): Promise<string>;
}
