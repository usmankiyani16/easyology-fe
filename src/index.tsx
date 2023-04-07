import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { ConfigProvider } from "antd";
import { theme } from "./theme/theme";
import "./sass/common.scss";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Profilemodal from "./components/Modals/profile-modal/profile-modal";
import AddCategoryModal from "./components/Modals/add-po-modals/add-cat-modal";
import AddVendorModal from "./components/Modals/add-po-modals/add-vendor-modal";
import { ToastContainer } from "react-toastify";
import store from "./store/store";
import { Provider } from 'react-redux';
// import "antd/dist/antd.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <RecoilRoot>
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider theme={theme}>
        <App />
        <ToastContainer />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>,
  // </RecoilRoot>
);
