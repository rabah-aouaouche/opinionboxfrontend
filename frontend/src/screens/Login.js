import React from "react";
import { AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

import axios from "../api/axios";

const LOGIN_URL = "/api/user/login";

function Login() {
  const { setAuth, auth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (auth.token) {
      navigate("/");
    }
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, {
        email: email,
        password: pwd,
      });
      localStorage.setItem("User", JSON.stringify(response.data));
      // console.log(JSON.stringify(response));
      const accessToken = response?.data?.token;

      setAuth({ _id: response?.data?._id, token: accessToken });

      setEmail("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <div
        className="hero min-h-screen p-5"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1588773846628-13fce0a32105?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80")`,
        }}
      >
        {/* Login Container */}
        <div className="bg-black bg-opacity-40 flex rounded-2xl shadow-lg max-w-5xl p-5 items-center h-[650px] ">
          {/* form */}
          <div className=" md:w-1/2 px-16">
            <h2 className="font-bold text-2xl text-primary">Login</h2>
            <p className="text-sm text-white mt-4 ">
              If you already a member, easily log in
            </p>
            <form
              action=""
              className="flex flex-col gap-4 "
              onSubmit={handleSubmit}
            >
              <label htmlFor="email">Email:</label>
              <input
                className="p-2 mt-8 rounded-xl border  "
                type="text"
                name="email"
                id="email"
                ref={emailRef}
                placeholder="Email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <div className=" relative">
                <label htmlFor="password">Password:</label>
                <input
                  className="p-2 rounded-xl border w-full"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
                <AiFillEye className=" absolute top-2/3 right-3 -translate-y-1/2 fill-slate-500" />
              </div>
              <button className="btn btn-primary hover:scale-105 duration-300">
                Login
              </button>
            </form>
            <div className="mt-10 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-white-400" />
              <p className="text-center text-white text-sm">OR</p>
              <hr className="border-white-400" />
            </div>

            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 font-medium">
              <FcGoogle className=" mr-3" size={25} /> Login with Google
            </button>

            <div className="mt-5 text-xs text-white border-b py-4 ">
              <a href="">Forgot your password?</a>
            </div>

            <div className=" mt-3 text-xs text-white flex justify-between items-center gap-1">
              <p>Don't have an account?</p>
              <Link to="/signup">
                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 text-black font-medium ">
                  Register
                </button>
              </Link>
            </div>
          </div>
          {/* image */}
          <div className="w-1/2 p-5 md:block hidden">
            <img
              className="rounded-2xl"
              src="https://images.unsplash.com/photo-1635942174796-2e33f5b561bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
