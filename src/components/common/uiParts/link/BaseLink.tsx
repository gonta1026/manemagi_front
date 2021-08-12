import React, { ReactNode } from 'react';
import Link from 'next/link';

const BaseLink = ({
  className = '',
  children,
  pathname,
  query,
}: {
  className?: string;
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
    <a {...{ className }}>{children}</a>
  </Link>
);

export default BaseLink;
