import { TIcon } from '../components/common/uiParts/atoms/icon/BaseIcon';

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
  },
  {
    name: '請求',
    link: '/claim',
    icon: '',
  },
  {
    name: '請求登録',
    link: '/claim/new',
    icon: '',
  },
  {
    name: '設定',
    link: '/setting',
    icon: 'settings',
  },
] as const;

// childLinks: [
//   {
//     name: '買い物登録',
//     link: '/shopping/new',
//   },
// ],
