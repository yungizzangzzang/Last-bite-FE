import { BrowserRouter, Route, Routes } from "react-router-dom";

import Basket from "../pages/Basket";
import CreateReview from "../pages/CreateReview";
import Favorite from "../pages/Favorite";
import History from "../pages/History";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Mypage from "../pages/Mypage";
import Nearby from "../pages/Nearby";
import Notification from "../pages/Notification";
import OwnerMain from "../pages/OwnerMain";
import OwnerNotification from "../pages/OwnerNotification";
import OwnerResult from "../pages/OwnerResult";
import OwnerReview from "../pages/OwnerReview";
import OwnerSetting from "../pages/OwnerSetting";
import OwnerStore from "../pages/OwnerStore";
import RegisterItem from "../pages/RegisterItem";
import Result from "../pages/Result";
import Review from "../pages/Review";
import Setting from "../pages/Setting";
import SignUp from "../pages/SignUp";
import StoreDetail from "../pages/StoreDetail/StoreDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/nearby" element={<Nearby />} />
        <Route path="/favorite" element={<Favorite />} />

        <Route path="/store/:id" element={<StoreDetail />} />
        <Route path="/review/:id" element={<Review />} />

        <Route path="/basket" element={<Basket />} />
        <Route path="/result" element={<Result />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/history" element={<History />} />
        <Route path="/create-review/:id" element={<CreateReview />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/setting" element={<Setting />} />

        <Route path="/owner/:id" element={<OwnerMain />} />
        <Route path="/register-item" element={<RegisterItem />} />
        <Route path="/owner/review/:id" element={<OwnerReview />} />

        <Route path="/owner/store/:id" element={<OwnerStore />} />

        <Route path="/owner/result/:id" element={<OwnerResult />} />
        <Route path="/owner/notification/:id" element={<OwnerNotification />} />
        <Route path="/owner/setting" element={<OwnerSetting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
