import React from 'react';
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { BaseLink } from '../../components/common/uiParts/atoms';
import { pageMap } from '../../pageMap';

const Top = (): JSX.Element => {
  return (
    <CommonWrapTemplate>
      <section className={'mt-10'}>
        <p>トップページを作ってここをルートのページにしようと考えているが内容が決まっていない。</p>
        <ul>
          {pageMap.map((page, index) => {
            return (
              <li key={index}>
                <BaseLink pathname={page.link}>{page.name}</BaseLink>
              </li>
            );
          })}
        </ul>
      </section>
    </CommonWrapTemplate>
  );
};

export default Top;
