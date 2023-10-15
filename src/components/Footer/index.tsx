import { MessageOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Divider, Input } from 'antd';
import React from 'react';
const Footer: React.FC = () => {
  return (
    <div className='bg-[#131111] p-4'>
      <div className='grid grid-flow-row gap-8 text-white sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div>
          <p className='font-semibold text-xl mb-3'>Navigate</p>
          <div className='flex flex-row justify-between'>
            <ul>
              <li>Home</li>
              <li className='my-3'>About</li>
              <li>Our teams</li>
            </ul>
            <ul>
              <li>Whitepaper</li>
              <li className='my-3'>Marketplace</li>
              <li>Roadmap</li>
            </ul>
            <ul>
              <li>FAQs</li>
              <li className='my-3'>News</li>
              <li>Community</li>
            </ul>
          </div>
        </div>

        <div>
          <p className='font-semibold text-xl mb-3'>About us</p>
          <div>
            <div className='mb-3'>
              <PhoneOutlined /> 0123456789
            </div>
            <div>
              <MessageOutlined /> tymex-talent@tyme.com
            </div>
          </div>
        </div>

        <div>
          <p className='font-semibold text-xl mb-3'>Subscribe to receive our latest update</p>
          <div className='flex flex-row'>
            <Input /> <Button className='ml-3 text-white bg-orange-p'>Subscribe</Button>
          </div>
        </div>
      </div>
      <Divider className='border-white' />
      <div className='flex flex-row justify-between text-white'>
        <div>©2023 Tyme - Edit. All Rights reserved.</div>
        <div className='flex flex-row'>
          <p>Security</p>
          <p className='px-3'>Legal</p>
          <p>Privacy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
