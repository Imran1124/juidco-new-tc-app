import React from 'react';
import { Outlet } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';
import HeadRoom from 'react-headroom';
import { useAppContext } from '../../context';
import LazyImage from '../../components/image/LazyImage';

// comment: This component is used to set the layout of the dashboard page.
// It also contains the header of the dashboard page.

export default function DashboardLayout() {
  const ctxValue = useAppContext();
  return (
    <>
      <HeadRoom>
        <div className="px-5 py-3 bg-gray-50 border-b-2  w-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="mr-2">
                <LazyImage src="/jh-logo.webp" alt="jh-logo" className="w-11" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-gray-600">
                  UDHD
                  <p className="text-xs">Jharkhand</p>
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <IoSettingsOutline
                size="1.5rem"
                onClick={() =>
                  ctxValue?.setOpenSettings(!ctxValue?.openSettings)
                }
              />
              {/* <RiLogoutBoxRLine
                size="1.5rem"
                onClick={() => ctxValue?.logout()}
              /> */}
            </div>
            {/* <div className="flex items-center">
            <div>
              <p className="text-sm mr-2 text-gray-500">Admin</p>
            </div>
            <div className="">
              <img src="/amc_icon.png" className="w-12" />
            </div>
          </div> */}
          </div>
        </div>
      </HeadRoom>
      <Outlet />
    </>
  );
}
