declare namespace Utilty {
  export type Nullable<T, Keys> = {
    [P in keyof T]: Keys extends P ? T[P] | null : T[P];
  };
}
