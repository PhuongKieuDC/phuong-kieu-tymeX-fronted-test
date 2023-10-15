import React from 'react';
import { Layout } from 'antd';
import Header from '../Header';
import Footer from '../Footer';

const { Content } = Layout;

interface ILayout {
  children: JSX.Element;
}

const CustomLayout: React.FC<ILayout> = (props) => {
  const { children } = props;
  return (
    <Layout>
      <Header />
      <div className='mt-[60px] bg-pink-p h-[calc(100vh-60px)]'>{children}</div>
      <Footer />
    </Layout>
  );
};

export default CustomLayout;
