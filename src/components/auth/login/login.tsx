import React from "react";
import Login_Icon from "../../images/Login_Icon.png";
import Shop from "../../images/shop.png";
import Purchase_online from "../../images/Purchase_online.png";
import { NavLink, useNavigate, Link } from "react-router-dom";
import "./SignIn.css";
import "../../MediaQueries.css/MediaQueries.css";

const Login = () => {
  const navigateHome = useNavigate();
  const navigateToHome = () => {
    const route = "/dashboard";
    navigateHome(route);
  };

  return (
    <>
      {/* ------ Sign Container ---------- */}
      <div className="signIn-container">
        {/* ------- Left Side Login Details ------ */}

        <div className="Login_Details">
          <div className="container_details_Login">
            <p className="welcome_msg">Welcome Back!</p>

            <div className="Logo_title">
              <img src={Login_Icon} alt="" />

              <p className="Login_msg">Login to POS Store</p>
            </div>
            <div className="User_Type_Enter_Details">
              <p className="user_type">Administrator</p>
              <p className="enter_details">
                Enter your email and password below
              </p>
            </div>

            {/*----------- Login Form ----------- */}

            <div className="form_login">
              <form className="login_easyology">
                <label htmlFor="" className="login_labels">
                  Select Type
                </label>

                <select name="" id="" className="login_inputs">
                  <option value="admin">Administrator</option>
                  <option value="employee">Employee</option>
                </select>

                {/*   <input
                  type="email"
                  placeholder="Enter Email"
                  className="login_inputs"
                /> */}
                <label htmlFor="" className="login_labels">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter Email"
                  className="login_inputs"
                />
                <label htmlFor="" className="login_labels">
                  Password
                </label>

                <input
                  type="email"
                  placeholder="Enter Password"
                  className="login_inputs"
                />

                <div className="login_btn">
                  {/* <NavLink to="/dashboard"> */}

                  <button className="login_button">Login</button>

                  {/* </NavLink> */}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* --------- Right Side Easyology Details -------- */}

        <div className="Easyology_Details">
          <div className="container_details_easyology">
            <div className="background_red_image">
              <img src={Shop} alt="" />
              <p className="easyology_header">Easyology</p>
              <p className="app_slogan">
                Professional App for your eCommerce business
              </p>
            </div>

            <div className="container_easyology_welcome">
              <div className="Purchase_online">
                <img src={Purchase_online} alt="" />
              </div>

              <div className="FooterEasyology">
                <p className="easylogogyWelcome">
                  Welcome to <br /> Easyology
                </p>
                <p className="easyology_desc">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea
                  suscipit sed cumque, aperiam ipsa asperiores vel quod
                  temporibus atque unde.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
