import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "src/pages/Login";
// import Signup from "src/pages/Signup";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { isLoggedInState } from "../states/userState";

import Cookies from "js-cookie";
import Main from "../pages/Main";
import Nearby from "../pages/Nearby";
import Favorite from "../pages/Favorite";
import StoreDetail from "../pages/StoreDetail";
import Basket from "../pages/Basket";
import Result from "../pages/Result";
import Notification from "../pages/Notification";
import History from "../pages/History";
import CreateReview from "../pages/CreateReview";
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
        <Route path="/nearby" element={<Nearby />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/store/:storeId" element={<StoreDetail />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/result" element={<Result />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/history" element={<History />} />
        <Route path="/create-review" element={<CreateReview />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
