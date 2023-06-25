/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import IndexRouting from "./routes/IndexRouting";
import { getItem } from "./app/helper/localstorage.helper";
import LoginPage from "./app/pages/Login/LoginPage";
import SignUpPage from "./app/pages/Login/SignUpPage";
import Header from "./app/layout/Header";
import HomePage from "./app/pages/Home/HomePage";
import AboutUsPage from "./app/pages/AboutUs/AboutUsPage";
import HasilTestPage from "./app/pages/HasilTest/HasilTestPage";
import KonselorPage from "./app/pages/Konselor/KonselorPage";
import TesKonselingPage from "./app/pages/TesKonseling/TesKonselingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <IndexRouting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/*"
          element={
            <div>
              <Header />
              <div>
                <Outlet />
              </div>
            </div>
          }
        >
          <Route path="aboutus" element={<AboutUsPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="konselor" element={<KonselorPage />} />
          <Route path="tes-konseling" element={<TesKonselingPage />} />
          <Route path="hasil-tes/:kode" element={<HasilTestPage />} />
        </Route>

        <Route
          path=""
          element={
            <ProtectedRouteLogin>
              <div className={`bg-login`}>
                <Header />
                <div>
                  <Outlet />
                </div>
              </div>
            </ProtectedRouteLogin>
          }
        >
          <Route path="" element={<Navigate to={"home"} />}></Route>
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const ProtectedRouteLogin = ({ children }: any) => {
  const authCheck = () => {
    const user = getItem("user");
    if (user) {
      const timeRemaining = user.stsTokenManager.expirationTime - Date.now();
      if (timeRemaining < 0) {
        localStorage.clear();
        return false;
      }
      return true;
    } else {
      return false;
    }
  };
  const auth = authCheck();
  console.log("login", auth);
  if (!auth) {
    return children;
  } else {
    return <Navigate to={"/home"} />;
  }
};

const ProtectedRoute = ({ children }: any) => {
  const authCheck = () => {
    const user = getItem("user");
    if (user) {
      const timeRemaining = user.stsTokenManager.expirationTime - Date.now();
      if (timeRemaining < 0) {
        localStorage.clear();
        return false;
      }
      return true;
    } else {
      return false;
    }
  };
  const auth = authCheck();
  console.log(auth);
  if (auth) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
