import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "src/pages/Login";
// import Signup from "src/pages/Signup";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { isLoggedInState } from "../states/userState";

import Cookies from "js-cookie";
import Main from "../pages/Main";
const Router = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  useEffect(() => {
    const kakaoToken = Cookies.get("kakao_token");
    const accessToken = Cookies.get("accessToken");
    const googleToken = Cookies.get("google_token");

    if (kakaoToken || accessToken || googleToken) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("user");
    }
  }, [setIsLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} /> */}

        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
