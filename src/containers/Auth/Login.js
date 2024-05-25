import React, { useState } from "react";
import "./Login.scss";
import { LogoWGHN } from "../../assets/icons/LoadSvgIcon";
import { baseUrl } from "../../utils/domain";
import { pathApi } from "../../utils";
import axios from "axios";
import { userLoginSuccess } from "../../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, } from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  console.log("isLoginedisLogined", isLoggedIn);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    let url = baseUrl + pathApi.LOGIN_USER;
    axios
      .post(url, {
        email,
        password,
      })
      .then((res) => {
        console.log("handlelogin", res.data);
        const { error_code, message, data } = res.data;
        if (error_code == 0) {
          dispatch(userLoginSuccess(data));
        } else {
          alert(message);
        }
      })
      .catch((e) => {
        console.log("errr login", e);
      });
  };

  if(isLoggedIn) {
      return <Redirect to={"/system/user-manage"} />;
  }

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-content row">
          <div className="logo col-12 text-center">
            <LogoWGHN width={200} height={100} />
          </div>
          <div className="title-login col-12 text-center">
            Đăng nhập vào WGHN
          </div>
          <div className="description col-12 text-center">
            Vui lòng nhập email và mật khẩu của bạn
          </div>
          <div className="col-12 form-group login-input">
            <label htmlFor="">Email</label>
            <input
              type="text"
              value={email}
              onChange={onChangeEmail}
              className="form-control"
              placeholder="Vui lòng nhập email..."
            />
          </div>
          <div className="col-12 form-group login-input">
            <label htmlFor="">Password</label>
            <input
              type="text"
              onChange={onChangePassword}
              value={password}
              className="form-control"
              placeholder="Vui lòng nhập password..."
            />
          </div>
          <div className="col-12 text-center">
            <button onClick={handleLogin} className="button-login">
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
