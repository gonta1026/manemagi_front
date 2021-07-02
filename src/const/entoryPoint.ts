// railsのコントローラーに一致する形でエンドポイントを整理している。こちらは試作で作っているので使わない可能性もあり。（2021/6/26）
export const ENTRY_POINT = {
  DEVISE_TOKEN_AUTH: {
    REGISTRATIONS: {
      CREATE: '/auth', // ユーザー新規登録
      NEW: '/auth/sign_in', // ユーザーログイン
    },
  },
  SHOPS: {
    CREATE: '/api/shops', // ショップ登録
  },
  SHOPPINGS: {
    INDEX: '/api/shoppings', // ショップ一覧
    CREATE: '/api/shoppings', // 買い物登録
  },
  CLAIMS: {
    INDEX: '/api/claims', // 請求一覧
    CREATE: 'api/claims', // 請求登録
  },
} as const;
