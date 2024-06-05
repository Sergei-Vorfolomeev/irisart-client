export class InterLayerObject<T = null> {
  constructor(
    public code: Code,
    public error?: string | null,
    public data?: T,
  ) {}
}

export enum Code {
  ok,
  error,
}
