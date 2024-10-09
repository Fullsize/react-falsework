import React from 'react';
import bg from '@/images/1.png';
const Page: React.FC = () => {
  return (
    <div
      className="w-full h-full "
      style={{ backgroundImage: `url(${bg})`, backgroundSize: '100% 100%' }}
    ></div>
  );
};
export default Page;
