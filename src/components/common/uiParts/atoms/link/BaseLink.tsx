import React, { ReactNode } from 'react';
import Link from 'next/link';

const BaseLink = ({
  children,
  pathname,
  query,
}: {
  children: ReactNode;
  pathname: string;
  query?: string;
}): JSX.Element => (
  <Link
    href={{
      pathname,
      query,
    }}
  >
    <a>{children}</a>
  </Link>
);

export default BaseLink;
