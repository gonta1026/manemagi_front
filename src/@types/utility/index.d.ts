declare namespace Utilty {
  // 指定をしたKeysで指定をしたユニオンをnullを合わせたユニオン型へする変更をさせる。
  export type Nullable<T, Keys> = {
    [P in keyof T]: P extends Keys ? T[P] | null : T[P];
  };
  export type SelectChange<T, Keys, U> = {
    [P in keyof T]: P extends Keys ? U : T[P];
  };
  // 指定をしたkeyを新しい方に変更をさせる。
  export type Change<T, Key, NewType> = {
    [P in keyof T]: Key extends P ? NewType : T[P];
  };
}
