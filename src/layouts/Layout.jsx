import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className="bg-white h-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
export default Layout;
