import React, { Children } from "react";
import { Link } from "react-router-dom";

export default function BaseContainer({ children }) {
  return (
    <div>
      <section className="min-h-screen flex items-stretch text-white">
        <div
          className="lg:flex w-1/2 h-screen  hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
          style={{
            backgroundImage: "url(./banner.jpg)",
          }}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">
              Keep it special
            </h1>
            <p className="text-3xl my-4">
              Enjoy your moments in unique way, watch Movies  anywhere.
            </p>
            <div className="px-4 pb-2 pt-4"></div>
          </div>
          <div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4"></div>
        </div>

        <div className="lg:w-1/2 w-full h-screen bg-main flex items-center relative justify-center md:px-16 px-0 z-0">
          <div className="w-full py-6 z-20">
            <div class="my-6 ml-12 absolute top-5 flex justify-center sm:w-2/3 lg:px-0 mx-auto ">
              <Link to="/"> </Link>
            </div>

            <p className="text-gray-100">{/* or use email your account */}</p>
            <div className="w-full gap-8 flex-colo p-14  flex-colo bg-dry rounded-lg border border-border">
              <img
                src="/logo.png"
                alt="logo"
                className="w-1/2 h-[4rem] object-conver"
              ></img>
              {children}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
