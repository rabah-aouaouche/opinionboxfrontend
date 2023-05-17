import React from "react";

import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const LASTNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const MOBILE_REGEX = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/;

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = "/api/user/register";

function Signup() {
  const userRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [lastname, setLastname] = useState("");
  const [validLastname, setValidLastname] = useState(false);
  const [lastnameFocus, setLastnameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [mobile, setMobile] = useState("");
  const [validMobile, setValidMobile] = useState(false);
  const [mobileFocus, setMobileFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    } else if (lastnameRef.current) {
      lastnameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const isUserValid = USER_REGEX.test(user);
    const isLastNameValid = LASTNAME_REGEX.test(lastname);
    const isEmailValid = EMAIL_REGEX.test(email);
    const isMobileValid = MOBILE_REGEX.test(mobile);
    console.log(isUserValid);
    console.log(user);
    console.log(isLastNameValid);
    console.log(lastname);
    console.log(isEmailValid);
    console.log(email);
    console.log(isMobileValid);
    console.log(mobile);
    setValidName(isUserValid);
    setValidLastname(isLastNameValid);
    setValidEmail(isEmailValid);
    setValidMobile(isMobileValid);
  }, [user, lastname, email, mobile]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if bouton enabled with js hack
    const v1 = USER_REGEX.test(user);
    const v2 = LASTNAME_REGEX.test(lastname);
    const v3 = EMAIL_REGEX.test(email);
    const v4 = MOBILE_REGEX.test(mobile);

    const v5 = PWD_REGEX.test(pwd);
    if (!v1 || !v2 || !v3 || !v4 || !v5) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      console.log(user, lastname, email, mobile, pwd);
      const response = await axios.post(REGISTER_URL, {
        firstname: user,
        lastname: lastname,
        email: email,
        mobile: mobile,
        password: pwd,
      });
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear input fields
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <div
          className="hero min-h-screen p-5"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")`,
          }}
        >
          <section className=" flex-col justify-center  bg-black bg-opacity-40 flex rounded-2xl shadow-lg shadow-black lg:w-[40%] md:w-[800px] p-5 items-center">
            <h1 className="font-bold text-4xl text-primary pb-4">Success!</h1>
            <p>
              <Link to="/login">
                <a href="" className=" text-primary font-bold">
                  👉 Login 👈
                </a>
              </Link>
            </p>
          </section>
        </div>
      ) : (
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
              backgroundImage: `url("https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")`,
            }}
          >
            {/* Login Container */}
            <div className="bg-black bg-opacity-40 flex rounded-2xl shadow-lg shadow-black lg:w-[40%] md:w-[800px] p-5 items-center  ">
              {/* form */}
              <div className=" md:w-full px-16 ">
                <h2 className="font-bold text-4xl text-primary pb-4">
                  Sign Up
                </h2>

                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="asserive"
                >
                  {errMsg}
                </p>

                <form
                  action=""
                  className="flex flex-col gap-4 "
                  onSubmit={handleSubmit}
                >
                  <label htmlFor="firstname">
                    Firstname:
                    <span className={validName ? "valid" : "hide "}>
                      <FontAwesomeIcon Icon icon={faCheck} />
                    </span>
                    <span className={validName || !user ? "hide" : "invalid"}>
                      <FontAwesomeIcon Icon icon={faTimes} />
                    </span>
                  </label>

                  <input
                    className="p-2  rounded-xl border  "
                    type="text"
                    name="firstname"
                    placeholder="Firstname"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                  />

                  <p
                    id="uidnote"
                    className={
                      userFocus && user && !validName
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters. <br />
                    Must begin with a letter. <br />
                    Letters, numbers, underscores, hyphens allowed.
                  </p>

                  <label htmlFor="lastname">
                    Lastname:
                    <span className={validLastname ? "valid" : "hide "}>
                      <FontAwesomeIcon Icon icon={faCheck} />
                    </span>
                    <span
                      className={
                        validLastname || !lastname ? "hide" : "invalid"
                      }
                    >
                      <FontAwesomeIcon Icon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    className="p-2  rounded-xl border  "
                    type="text"
                    name="lastname"
                    placeholder="Lastname"
                    id="lastname"
                    ref={lastnameRef}
                    autoComplete="off"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                    aria-invalid={validLastname ? "false" : "true"}
                    aria-describedby="uidnote2"
                    onFocus={() => setLastnameFocus(true)}
                    onBlur={() => setLastnameFocus(false)}
                  />
                  <p
                    id="uidnote2"
                    className={
                      lastnameFocus && lastname && !validLastname
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters. <br />
                    Must begin with a letter. <br />
                    Letters, numbers, underscores, hyphens allowed.
                  </p>

                  <label htmlFor="email">
                    Email:
                    <span className={validEmail ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validEmail || !email ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>

                  <input
                    className="p-2 rounded-xl border"
                    type="email"
                    name="email"
                    placeholder="Email"
                    id="email"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="emailnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                  />

                  <p
                    id="emailnote"
                    className={
                      emailFocus && email && !validEmail
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Please enter a valid email address.
                  </p>

                  <label htmlFor="mobile">
                    Mobile:
                    <span className={validMobile ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={validMobile || !mobile ? "hide" : "invalid"}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>

                  <input
                    className="p-2 rounded-xl border"
                    type="mobile"
                    name="mobile"
                    placeholder="Mobile"
                    id="mobile"
                    ref={mobileRef}
                    autoComplete="off"
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    aria-invalid={validMobile ? "false" : "true"}
                    aria-describedby="mobilenote"
                    onFocus={() => setMobileFocus(true)}
                    onBlur={() => setMobileFocus(false)}
                  />

                  <p
                    id="emailnote"
                    className={
                      mobileFocus && mobile && !validMobile
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Please enter a valid mobile.
                  </p>

                  <label htmlFor="password">
                    Password:
                    <span className={validPwd ? "valid" : "hide "}>
                      <FontAwesomeIcon Icon icon={faCheck} />
                    </span>
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                      <FontAwesomeIcon Icon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    className="p-2  rounded-xl border  "
                    type="password"
                    name="password"
                    placeholder="password"
                    id="password"
                    ref={userRef}
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  />
                  <p
                    id="pwdnote"
                    className={
                      pwdFocus && !validPwd ? "instructions" : "offscreen"
                    }
                  >
                    <FontAwesomeIcon Icon icon={faInfoCircle} />
                    8 to 24 characters.
                    <br />
                    Must include uppercase and lowercase letters, a number and a
                    special character.
                    <br />
                    Allowed special characters:{" "}
                    <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="dollar sign">$</span>{" "}
                    <span aria-label="percent">%</span>
                  </p>

                  <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                      <FontAwesomeIcon Icon icon={faCheck} />
                    </span>
                    <span
                      className={validMatch || !matchPwd ? "hide" : "invalid"}
                    >
                      <FontAwesomeIcon Icon icon={faTimes} />
                    </span>
                  </label>

                  <input
                    className="p-2  rounded-xl border  "
                    type="password"
                    id="confirm_pwd"
                    placeholder="confirm the password"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onblur={() => setMatchFocus(false)}
                  />
                  <p
                    id="confirmnote"
                    className={
                      matchFocus && !validMatch ? "instructions" : "offscreen"
                    }
                  >
                    <FontAwesomeIcon Icon icon={faInfoCircle} />
                    Must match the first password input field.
                  </p>

                  <button
                    className="btn btn-primary hover:scale-105 duration-300"
                    disabled={
                      !validName ||
                      !validLastname ||
                      !validEmail ||
                      !validPwd ||
                      !validMatch
                        ? true
                        : false
                    }
                  >
                    Sign up
                  </button>
                </form>

                <div className="mt-10 grid grid-cols-3 items-center text-gray-400">
                  <hr className="border-white-400" />
                  <p className="text-center text-white text-sm">OR</p>
                  <hr className="border-white-400" />
                </div>

                <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 font-medium">
                  <FcGoogle className=" mr-3" size={25} /> Continue with Google
                </button>

                <div className="text-sm text-white mt-4 items-center flex flex-row justify-center gap-1 ">
                  Already a member?
                  <Link to="/login">
                    <a href="" className=" text-primary font-bold">
                      Log in
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Signup;
