import React, { useContext, useRef } from "react";
import InputBox from "../components/InputBox";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/sessions";
import { userContext } from "../App";
import { googleAuth } from "../auth/firebaseAuth";

const UserAuth = ({ type }) => {
  let {
    userAuthContext: { access_token },
    setUserAuthContext,
  } = useContext(userContext);

  console.log(access_token);

  axios.defaults.withCredentials = true;

  const userAuthThroughServer = (serverRoute, formData) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
      .then(({ data }) => {
        storeInSession("user", JSON.stringify(data));
        setUserAuthContext(data);
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = type == "sign-in" ? "/signin" : "/signup";

    let form = new FormData(formId);
    let formData = {};

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    for (const [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { fullname, email, password } = formData;

    if (fullname) {
      if (fullname.length < 3) {
        return toast.error("Fullname must be at least 3 letters long");
      }
    }

    if (!email.length) {
      return toast.error("Enter email");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Email is invalid");
    }

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password should greater than 6 characters with 1 numeric, 1 lowercase and 1 uppercase letter"
      );
    }

    userAuthThroughServer(serverRoute, formData);
  };

  const handleGoogleAuth = (e) => {
    e.preventDefault();

    googleAuth()
      .then((user) => {
        let serverRoute = "/google-auth";
        let formData = {
          access_token: user.accessToken,
        };

        userAuthThroughServer(serverRoute, formData);
      })
      .catch((err) => {
        toast.error("Error logging in");
        return console.log(err);
      });
  };

  return access_token ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form className="w-[80%] max-w-[400px]" id="formId">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-10">
            {type == "sign-in" ? "Welcome back" : "Join us today"}
          </h1>
          {type !== "sign-in" ? (
            <InputBox
              name="fullname"
              type="text"
              placeholder="Full name"
              iconName="fi-rr-circle-user"
            />
          ) : (
            ""
          )}

          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            iconName="fi-rr-envelope"
          />

          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            iconName="fi-rr-key"
          />

          <button
            className="btn-dark block mx-auto mt-10"
            type="submit"
            onClick={handleSubmit}
          >
            {type.replace("-", " ")}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-50 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button
            className="btn-dark flex items-center justify-center gap-3 w-[90%] mx-auto "
            onClick={handleGoogleAuth}
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          {type == "sign-in" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don't have an account ?
              <Link to="/signup" className="underline text-black text-xl ml-1 ">
                Join us today .
              </Link>
            </p>
          ) : (
            <p className="mt-6  text-dark-grey text-xl text-center">
              Already have an account ?
              <Link to="/signin" className="underline text-black text-xl ml-1 ">
                Sign in here .
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuth;
