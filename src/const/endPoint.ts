// railsのコントローラーに一致する形でエンドポイントを整理している。こちらは試作で作っているので使わない可能性もあり。（2021/6/26）
export const END_POINT = {
  DEVISE_TOKEN_AUTH: {
    REGISTRATIONS: {
      CREATE: '/auth', // ユーザー新規登録
      NEW: '/auth/sign_in', // ユーザーログイン
    },
  },
  SHOPS: {
    INDEX: '/shops', // ショップ登録
    CREATE: '/shops', // ショップ登録
  },
  SHOPPINGS: {
    INDEX: '/shoppings', // ショップ一覧
    CREATE: '/shoppings', // 買い物登録
  },
  CLAIMS: {
    INDEX: '/claims', // 請求一覧
    CREATE: '/claims', // 請求登録
  },
  SETTINGS: {
    INDEX: '/settings',
    PATCH: '/settings',
  },
} as const;
