export default interface ComponentConfig {
  type: string;
  js: string;
  declare: FunctionDeclare;
}

export enum FunctionDeclare {
  function = "function",
  const = "const"
}
