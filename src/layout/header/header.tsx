import React from "react";
import {
  cart2Icon,
  cartIcon,
  downloadIcon,
  profileIcon,
} from "../../assets/icons";
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import './header.scss'



const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const onSearch = (value: string) => console.log(value);



const Header = () => {

   // Getting Current Date

   const current = new Date();
   const date = `${current.getDate()}/${
     current.getMonth() + 1
   }/${current.getFullYear()}`;


  return (
    <div className="flex justify-between items-center w-full pt-3 px-5">
      <div className="flex gap-4 w-1/3">
        <img src={profileIcon} />
        <div className="flex flex-col justify-center">
          <span className="_header_easyology primary-color text-2xl">Easyology</span>
          <span className='_current_date'>{date}</span>
        </div>
      </div>
      <div className="w-1/3">


      <Space direction="vertical">
   
    <Search placeholder="input search text" onSearch={onSearch} enterButton />
  
  </Space>






      </div>
      <div className="flex justify-end gap-9 ml-auto">
        <img className="w-7 h-7" src={cartIcon} alt="cart" />
        <img className="w-7 h-7" src={downloadIcon} alt="download" />
        <img className="w-7 h-7" src={cart2Icon} alt="cart" />
      </div>
    </div>
  );
};

export default Header;