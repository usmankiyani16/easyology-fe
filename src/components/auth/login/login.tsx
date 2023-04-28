import React, { useEffect } from "react";
import "./login.scss";
import Login_Logo from "../../../assets/icons/layout/Login_Logo.png";
import easyology_logo from "../../../assets/icons/layout/easyology_logo.png";
import cart from "../../../assets/images/Purchase online.png";

import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../../utils/interfaces";
import { postApi } from "../../../utils/api/api";
import Loader from "../../common/loader/loader";
import { Toast } from "../../common/toast/toast";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { setLoading } from "../../../store/loader/loader-slice";
import { signin } from "../../../store/auth/auth-slice";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { role }: any = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (role === UserRole.SUPER_ADMIN) {
      navigate("/admin-dashboard");
    } else if (role && role !== UserRole.SUPER_ADMIN) {
      navigate("/dashboard");
    }
  }, [role]);

  const onFinish = async (values: any) => {
    delete values?.remember;

    await dispatch(signin(values));
  };

  const onFinishFailed = (errorInfo: any) => { };
  return (
    <>
      <div className="_main-container sm:block">

        {/* ----------- Grid 1 in Top Header ------------ */}

        <div className="_top-container grid md:grid-cols-2 xs:grid-cols-1">
          <div className="_welcome_back text-center">
            <div className="_welcome_back_text mt-12">
              <h1 className="text-5xl mr-3">Welcome Back</h1>
            </div>

            <div className="_easyology_logo mt-5">
              <img src={Login_Logo} alt="" className="w-12 h-12 m-auto" />
              <div className="_log_in text-lg h-7 mt-2">
                <p>Login Into POS Store</p>
              </div>
            </div>
          </div>

          <div className="_easyology_slogan  xs:hidden md:block">
            <div className="_easyology_slogan_details ml-5">
              <img
                src={easyology_logo}
                alt="Shopping Easyology Logo"
                className="mt-5"
              />

              <h3 className="underline text-3xl">Easyology</h3>
              <p className="m-0">Intuitive App to Simplify Your Online Sales</p>
            </div>
          </div>
        </div>

        {/* ----------- Grid 2 bottom ------------- */}

        <div className="_bottom-container grid xs:grid-cols-1 md:grid-cols-2">
          <div className="_login_form mt-10 m-auto">
            <p className="_enter_credentials">
              Enter your email and password below
            </p>

            <Form
              layout="vertical"
              className="mt-12"
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 500,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,

                    message: "Required Field",
                  },
                  {
                    type: "email",
                  },
                ]}
                hasFeedback
              >
                <Input
                  // sm:w-[320px] sm:h-[35px] 
                  className="sm:w-[379px] sm:h-[35px]"
                  placeholder="Enter email address"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                required
                tooltip="This is a required field"
                rules={[
                  {
                    required: true,

                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password

                  className="sm:w-[379px] sm:h-[35px]"
                  placeholder="Enter password"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="mt-4 m-auto">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className="_easyology_welcome_slogan flex mt-12 justify-around xs:hidden md:flex">
            <div className="_card_image ">
              <img src={cart} alt="Easyology Card" />
            </div>

            <div className="_welcome_header mt-2">
              <h3>WELCOME TO EASYOLOGY! 👋 </h3>
              <br />
              <p>
                Boost your business with ease and efficiency. From inventory
                management to analytics, we've got you covered. Let's start
                selling and tracking your success together
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
