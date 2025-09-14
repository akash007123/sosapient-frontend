import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 transition-colors duration-200">
      <Header />
      <main className="pt-16 lg:pt-20">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;