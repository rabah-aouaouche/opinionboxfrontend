import React from "react";
import RequireAuth from "./screens/RequireAuth";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "../src/screens/HomeScreen";
import Nav from "./Layout/Navbar/Nav";
import Footer from "./Layout/Footer/Footer";
import AboutUs from "./screens/AboutUs";
import Articles from "./screens/Articles";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Layout from "./screens/Layout";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/articles" element={<Articles />} />
          </Route>
          <Route path="/about-us" element={<AboutUs />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
