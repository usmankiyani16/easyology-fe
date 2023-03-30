import React, { useEffect } from "react";
import "./login.scss";
import Login_Logo from "../../../assets/icons/layout/Login_Logo.png";
import easyology_logo from "../../../assets/icons/layout/easyology_logo.png";
import cart from "../../../assets/images/Purchase online.png";

import { Form, Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../../utils/interfaces";
import { useRecoilState } from "recoil";
import { authState } from "../../../store/auth.store";
import { post } from "../../../utils/api/api";
import { loadingState } from "../../../store/loading-store";
import Loader from "../../common/loader/loader";

const Login = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [loading, setLoading] = useRecoilState(loadingState);

  const navigate = useNavigate();
  const { role }: any = JSON.parse(localStorage.getItem("user") || "{}");
  useEffect(() => {
    if (role === UserRole.ADMIN) {
      navigate("/admin-dashboard");
    } else if (role && role !== UserRole.ADMIN) {
      navigate("/dashboard");
    }
  }, [role]);
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    try {
      setLoading(true);
      const response = await post("/user/sign-in", {
        email: values.email,
        password: values.password,
      });
      setAuth(response);
      console.log("response", response);
      let obj = {
        data: response?.data,
        token: response?.token,
        email: response?.data?.email,
        role: response?.data?.role,
        accessToken: response?.token?.AccessToken,
      };
      localStorage.setItem("user", JSON.stringify(obj));
      if (obj?.role === UserRole.ADMIN) {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {loading && <Loader />}
      <div className="_main-container">
        <div className="_top-container grid grid-cols-2">
          <div className="_welcome_back text-center">
            <div className="_welcome_back_text mt-12">
              <h1 className="text-5xl mr-3">Welcome Back</h1>
            </div>

            <div className="_easyology_logo mt-5">
              <img src={Login_Logo} alt="" className="w-12 h-12" />
              <div className="_log_in text-lg h-7 mt-2">
                <p>Login Into POS Store</p>
              </div>
            </div>
          </div>

          <div className="_easyology_slogan">
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

        <div className="_bottom-container grid grid-cols-2 ">
          <div className="_login_form mt-10">
            <p className="_enter_credentials text-center ">
              Enter your email and password below
            </p>

            <Form
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
                    type: "email",
                    message: "Please correct email!",
                  },
                  {
                    type: "email",
                  },
                ]}
              >
                <Input />
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
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 9,
                  span: 1,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className="_easyology_welcome_slogan flex mt-12 justify-around">
            <div className="_card_image ">
              <img src={cart} alt="Easyology Card" />
            </div>

            <div className="_welcome_header">
              <h3>Welcome to Easyology</h3>
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
