import { TIcon } from '../components/common/uiParts/atoms/icon/BaseIcon';

// サイドバーなどのpageのリンクn仕様をする想定
type TPageMap = {
  name: string;
  link: string;
  icon: TIcon;
  query: string;
  childLinks: {
    name: string;
    link: string;
  }[];
}[];

export const pageMap = [
  {
    name: '買い物',
    link: '/shopping',
    icon: 'shoppingCart',
    childLinks: [
      {
        name: '買い物登録',
        link: '/shopping/new',
      },
    ],
  },
  {
    name: '請求',
    link: '/claim',
    icon: 'money',
    childLinks: [
      {
        name: '請求登録',
        link: '/claim/new',
      },
    ],
  },
  {
    name: '設定',
    link: '/setting',
    icon: 'settings',
    childLinks: [],
  },
] as TPageMap;
