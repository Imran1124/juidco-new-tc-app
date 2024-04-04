import React from 'react';
import Page from '../../components/helmet';
import Categories from './main-page/Categories';
import Slider from './main-page/Slider';
import { useAppContext } from '../../context';

export default function MainPage() {
  const ctxValue = useAppContext();
  return (
    <Page title="Main">
      <div className="px-4 mx-auto mb-6">
        <div className="rounded-lg bg-gray-100 p-4 mt-3">
          <h1 className="text-xl font-semibold text-blue-700">
            Welcome <br />
            UDHD Jharkhand <small> ({ctxValue?.user?.user_name})</small>
          </h1>
        </div>
        <div className="overflow-hidden rounded-lg bg-gray-50  mt-3 mb-5">
          <Slider />
        </div>
        <div className="border-b-2 my-3" />
        <Categories />
        {/* line */}
      </div>
    </Page>
  );
}
