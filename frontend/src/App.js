import Products from "./components/Products/Products";
import Header from "./components/Layout/Header";
import Subheader from "./components/Layout/Subheader";
import { Route, Routes, Navigate } from "react-router-dom";
import { Login, Signup } from "./components/Auth/index.js";
import { checkIsLoggedIn } from "./action/auth";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkIsLoggedIn(() => {}));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header />
      <Subheader />
      <Routes>
        {!authState.idToken && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/signup" element={<Navigate to="/" />} />

        {/* <Route path="/:login" element={<AuthIndex />} />
        <Route path="/:signup" element={<AuthIndex />} /> */}
        <Route path="/404" element={<h1>404 Not Found</h1>}></Route>
        <Route path="/:category?" element={<Products />}></Route>

        <Route path="/*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
};

export default App;
