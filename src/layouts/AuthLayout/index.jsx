import React from 'react';
import { Outlet } from 'react-router-dom';
import LazyImage from '../../components/image/LazyImage';

export default function AuthLayout() {
  return (
    <div className="sm:w-1/2 lg:w-1/3 w-full mx-auto">
      <div className="bg-[#FDFCFE] h-screen">
        <div className="bg-[#94a3b8] h-1/2 w-full mx-auto rounded-b-2xl">
          <div className="py-12">
            <LazyImage
              src="/jh-logo.webp"
              className="bg-white rounded-full w-28 p-1 mx-auto"
            />

            <h1 className="text-center mt-3 font-semibold text-gray-50 text-xl capitalize">
              UDHD
              <p className="text-center font-normal text-gray-50 text-base capitalize">
                Jharkhand
              </p>
            </h1>
          </div>

          <div className="min-h-screen flex items-center justify-center p-4 -mt-60 duration-500 animate__animated animate__fadeInDown  darks:bg-gray-800">
            <div className="bg-white h-full p-8  shadow-lg w-full max-w-md  rounded-xl">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
