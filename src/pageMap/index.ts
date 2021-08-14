export const page = {
  home: {
    name: () => '紹介', // nameの使う予定はなし。
    link: () => '/',
  },
  signup: {
    name: () => '新規登録',
    link: () => '/signup',
  },
  login: {
    name: () => 'ログイン',
    link: () => '/login',
  },
  top: {
    name: () => 'トップ',
    link: () => '/top',
  },
  shopping: {
    list: {
      name: () => '買い物一覧',
      link: () => '/shopping',
    },
    register: {
      name: () => '買い物登録',
      link: () => '/shopping/new',
    },
    show: {
      name: () => '買い物詳細',
      link: (shoppingId: string) => `/shopping/${shoppingId}`,
    },
    edit: {
      name: () => '買い物編集',
      link: (shoppingId: string) => `/shopping/${shoppingId}/edit`,
    },
  },
  shop: {
    list: {
      name: () => 'お店一覧',
      link: () => '/shop',
    },
    register: {
      name: () => 'お店登録',
      link: () => '/shop/new',
    },
  },
  claim: {
    list: {
      name: () => '請求一覧',
      link: () => '/claim',
    },
    show: {
      name: () => '請求詳細',
      link: (claimId: string) => `/claim/${claimId}/shopping`,
    },
    register: {
      name: () => '請求登録',
      link: () => '/claim/new',
    },
    shopping: {
      name: () => '請求内訳一覧',
      link: (claimId: string) => `/claim/${claimId}/shopping`,
    },
  },
  setting: {
    edit: {
      name: () => 'LINE設定',
      link: () => '/setting',
    },
  },
};

export const drawerLinks = [
  {
    name: page.shop.list.name(),
    link: page.shop.list.link(),
    icon: 'store',
  },
  {
    name: page.shop.register.name(),
    link: page.shop.register.link(),
    icon: '',
  },
  {
    name: page.shopping.list.name(),
    link: page.shopping.list.link(),
    icon: 'shoppingCart',
  },
  {
    name: page.shopping.register.name(),
    link: page.shopping.register.link(),
    icon: '',
  },
  {
    name: page.claim.list.name(),
    link: page.claim.list.link(),
    icon: 'money',
  },
  {
    name: page.claim.register.name(),
    link: page.claim.register.link(),
    icon: '',
  },
  {
    name: page.setting.edit.name(),
    link: page.setting.edit.link(),
    icon: 'settings',
  },
] as const;
