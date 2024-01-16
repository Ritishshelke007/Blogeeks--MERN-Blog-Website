import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import UserAuth from "./pages/UserAuth";
import { createContext, useState, useEffect } from "react";
import { lookInSession } from "./common/sessions";
import Editor from "./pages/Editor";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import PageNotFound from "./pages/404NotFound";
import UserProfilePage from "./pages/UserProfilePage";
import BlogPage from "./pages/BlogPage";

export const userContext = createContext({});

function App() {
  const [userAuthContext, setUserAuthContext] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");
    userInSession
      ? setUserAuthContext(JSON.parse(userInSession))
      : setUserAuthContext({ access_token: null });
  }, []);

  return (
    <>
      <userContext.Provider value={{ userAuthContext, setUserAuthContext }}>
        <Routes>
          <Route path="/editor" element={<Editor />} />
          <Route path="/" element={<Navbar />}>
            <Route index element={<HomePage />} />
            <Route path="/signin" element={<UserAuth type="sign-in" />} />
            <Route path="/signup" element={<UserAuth type="sign-up" />} />
            <Route path="search/:query" element={<SearchPage />} />
            <Route path="user/:id" element={<UserProfilePage />} />
            <Route path="blog/:blog_id" element={<BlogPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </userContext.Provider>
    </>
  );
}

export default App;
