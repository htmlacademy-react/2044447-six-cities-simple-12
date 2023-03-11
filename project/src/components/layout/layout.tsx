import React from 'react';
import Header from '../header/header';
import cn from 'classnames';
import { Helmet } from 'react-helmet-async';

type LayoutProps = {
  className?: string;
  hasNav?: boolean;
  children: React.ReactNode;
  pageTitle: string;
};

const Layout: React.FC<LayoutProps> = ({
  className,
  children,
  hasNav,
  pageTitle,
}) => (
  <div className={cn('page', className)}>
    <Header hasNav={hasNav} />
    <Helmet>
      <title>Six Cities. {pageTitle}</title>
    </Helmet>

    {children}
  </div>
);

export default Layout;
