import React from 'react';
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';

const ClaimNew = (): JSX.Element => {
  return (
    <CommonWrapTemplate>
      <div>請求登録ページ</div>
      <ul>
        <li>
          買い物一覧を出力させてチェックボックスでチェックをつけたものを請求するようにできるようにする。
        </li>
        <li>請求をする前に請求合計金額をモーダルで出す。</li>
        <li>請求が終わったら、請求一覧画面（`/claim`）へ遷移させる。</li>
      </ul>
    </CommonWrapTemplate>
  );
};

export default ClaimNew;
