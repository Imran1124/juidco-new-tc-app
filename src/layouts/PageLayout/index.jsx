import React, { useCallback, useEffect } from 'react';
import HeadRoom from 'react-headroom';
import { Outlet, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { IoArrowForwardSharp } from 'react-icons/io5';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { IoSettingsOutline } from 'react-icons/io5';
// forwad icon
import { RiArrowRightSLine } from 'react-icons/ri';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useAppContext } from '../../context';
// import NewSideBar from '@/components/sidebar/NewSideBar';

const PropertyLayout = () => {
  const ctxValue = useAppContext();
  const navigate = useNavigate();
  return (
    <>
      <HeadRoom>
        <div className="p-5 bg-gray-50 border-b-2  w-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="mr-3">
                <IoArrowBack
                  className="cursor-pointer w-5 h-5"
                  onClick={() => navigate(-1)}
                />
              </div>
              <div className="mr-2">
                <IoArrowForwardSharp
                  className="cursor-pointer w-5 h-5"
                  onClick={() => navigate(1)}
                />
              </div>
              <div>
                <h1 className="text-sm font-semibold">{ctxValue?.getTitle}</h1>
              </div>
            </div>
            <small className="text-red-700 text-sm">(Beta)</small>
            <div className="flex items-center">
              <div className="mr-3">
                <IoSettingsOutline
                  size="1.4rem"
                  onClick={() =>
                    ctxValue?.setOpenSettings(!ctxValue?.openSettings)
                  }
                />
              </div>
              {/* <SideBar /> */}

              <div>
                <RxHamburgerMenu
                  size="1.4rem"
                  onClick={() =>
                    ctxValue?.setIsDrawerOpen(!ctxValue?.isDrawerOpen)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </HeadRoom>
      {/* <NewSideBar /> */}
      <Outlet />
    </>
  );
};

export default React.memo(PropertyLayout);
