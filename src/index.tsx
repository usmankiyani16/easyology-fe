import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConfigProvider } from "antd";
import { theme } from "./theme/theme";
import './sass/common.scss';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
// import "antd/dist/antd.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ConfigProvider theme={theme}>
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);

