import React from "react";

function AboutUs() {
  return (
    <div className=" bg-[#7d7259] min-height-screen full  flex items-center justify-center p-5 ">
      <div className="bg-[#d2c59d] opacity-100 flex flex-col rounded-2xl shadow-2xl shadow-primary  max-w-7xl p-5 items-center  gap-10 ">
        <h1 className=" font-bold text-primary text-[50px]">About Us</h1>
        <p className=" font-medium text-md text-center">
          Our opinion-sharing platform was created with the goal of bringing
          people together around their common interests. We believe that
          everyone has a story to tell and opinions to share, and our platform
          is designed to enable everyone to express themselves freely.
        </p>
        <img
          className=" shadow-xl shadow-black border-primary border"
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
        <p className=" font-medium text-md text-center pt-10 pb-10">
          We're a passionate team of web developers and marketing experts, all
          committed to providing an exceptional user experience. We're
          constantly listening to feedback from our community to improve our
          platform and make it even more accessible and enjoyable to use.
        </p>
        <img
          className="shadow-xl shadow-black border-primary border"
          src="https://images.unsplash.com/photo-1495106245177-55dc6f43e83f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
        <p className=" font-medium text-md text-center pt-10 pb-10">
          Feel free to contact us if you have any questions or comments about
          our platform. We're always happy to chat with our users and gather
          their opinions and suggestions.
        </p>
        <img
          className="  shadow-xl shadow-black border-primary border"
          src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
        <button className="  btn btn-primary">Contact Us</button>
      </div>
    </div>
  );
}

export default AboutUs;
