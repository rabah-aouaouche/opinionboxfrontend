import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const Blog = ({ data, updateMode, deleteBlog }) => {
  console.log("mjdfqlqf", data.title);
  return (
    <div className=" relative  bg-[#FFF9EA] mt-10 text-white p-10 rounded-2xl flex flex-col justify-between ">
      <div className="   text-center w-[1000px] h-[50px] text-black">
        <h1 className=" font-bold text-3xl">{data.title}</h1>
      </div>
      <div className="  w-[1000px] h-[300px] text-black">
        <p className="">{data.content}</p>
      </div>
      <div className="  w-[1000px] h-[50px] text-black">
        <h1>
          {" "}
          <span className=" text-primary font-semibold">Author :</span>{" "}
          {data.author.firstname + " " + data.author.lastname}
        </h1>
      </div>
      <div className="  w-[1000px] h-[50px] text-black">
        <h1>
          {" "}
          <span className=" text-primary font-semibold">Tags :</span>{" "}
          {data.tags}
        </h1>
      </div>

      <div className="icons flex flex-col">
        <BiEdit className="icon " onClick={updateMode} />
        <AiFillDelete className="icon" onClick={deleteBlog} />
      </div>
    </div>
  );
};

export default Blog;
