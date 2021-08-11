// railsのコントローラーに一致する形でエンドポイントを整理している。こちらは試作で作っているので使わない可能性もあり。（2021/6/26）
const auth = 'auth';
const shops = 'shops';
const shoppings = 'shoppings';
const claims = 'claims';
const settings = 'settings';

export const END_POINT = {
  DEVISE_TOKEN_AUTH: {
    REGISTRATIONS: {
      CREATE: `/${auth}`, // ユーザー新規登録
      NEW: `/${auth}/sign_in`, // ユーザーログイン
    },
  },
  SHOPS: {
    INDEX: `/${shops}`, // ショップ登録
    CREATE: `/${shops}`, // ショップ登録
  },
  SHOPPINGS: {
    INDEX: `/${shoppings}`, // ショップ一覧
    CREATE: `/${shoppings}`, // 買い物登録
    SHOW: (id: number | string) => `/${shoppings}/${id}`, // 買い物詳細
    EDIT: (id: number | string) => `/${shoppings}/${id}/edit`, // 買い物編集
    UPDATE: (id: number | string) => `/${shoppings}/${id}`, // 買い物編集
    DELETE: (id: number | string) => `/${shoppings}/${id}`, // 買い物削除
  },
  CLAIMS: {
    INDEX: `/${claims}`, // 請求一覧
    CREATE: `/${claims}`, // 請求登録
    NEW: `/${claims}/new`, // 請求登録
    UPDATE: (id: number | string) => `/${claims}/${id}`, // 請求受領
  },
  SETTINGS: {
    INDEX: `/${settings}`,
    UPDATE: `/${settings}`,
  },
} as const;
