import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { GrRefresh } from 'react-icons/gr';
import { useAppContext } from '../../context';

export default function SettingsModel() {
  const cancelButtonRef = useRef(null);
  const ctxValue = useAppContext();

  const handleModel = () => {
    ctxValue?.setOpenSettings(!ctxValue?.openSettings);
  };

  const AppPermission = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ Key: 'OPEN_SETTINGS' })
      );
    }
    handleModel();
  };

  return (
    <Transition.Root show={ctxValue?.openSettings} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={ctxValue?.setOpenSettings}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex mt-52 items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <h1 className="text-red-600 text-3xl">
                        <IoSettingsOutline size="1.2rem" />
                      </h1>
                    </div> */}
                    <div className="text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h2"
                        className="text-xl font-semibold leading-6 text-gray-900"
                      >
                        Settings
                      </Dialog.Title>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="bg-gray-50" onClick={() => AppPermission()}>
                  <div className="flex items-center justify-start gap-2 py-3 px-8 cursor-pointer">
                    <IoSettingsOutline size="1.2rem" />
                    <h1 className="text-sm text-gray-800">
                      Android App Permission
                    </h1>
                  </div>
                </div>
                <hr />
                <div
                  className="bg-gray-50 py-3 px-8 "
                  onClick={() => window.location.reload()}
                >
                  <div className="flex items-center justify-start gap-2 cursor-pointer">
                    <GrRefresh size="1.2rem" />
                    <h1 className="text-sm text-gray-800">
                      Reload Application
                    </h1>
                  </div>
                </div>
                <hr />
                <div
                  className="bg-gray-50 py-3 px-8 "
                  onClick={() => {
                    ctxValue?.logout();
                    handleModel();
                  }}
                >
                  <div className="flex items-center justify-start gap-2 cursor-pointer">
                    <RiLogoutBoxRLine size="1.5rem" className="text-red-700" />
                    <h1 className="text-sm text-red-700 font-semibold">
                      Logout
                    </h1>
                  </div>
                </div>
                <div className="mb-2" />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
