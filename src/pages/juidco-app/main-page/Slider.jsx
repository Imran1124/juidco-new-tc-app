import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import LazyImage from '../../../components/image/LazyImage';

export default function Slider() {
  return (
    <div className="rounded-lg w-full">
      <Carousel
        className="rounded-lg"
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
      >
        <div>
          <LazyImage src="/images/bn1.webp" className="h-48 bg-cover" />
          {/* <p className="legend">
            Property Tax Payment, Water Tax Payment, Building Plan Approval
          </p> */}
        </div>
        <div>
          <LazyImage src="/images/bn2.webp" className="h-48 bg-cover" />
          {/* <p className="legend">
            Property Tax Payment, Water Tax Payment, Building Plan Approval
          </p> */}
        </div>
        <div>
          <LazyImage src="/images/banner2.webp" className="h-48 bg-cover" />
          {/* <p className="legend">
            Property Tax Payment, Water Tax Payment, Building Plan Approval
          </p> */}
        </div>
        <div>
          <LazyImage src="/images/banner3.webp" className="h-48 bg-cover" />
          {/* <p className="legend">
            Property Tax Payment, Water Tax Payment, Building Plan Approval
          </p> */}
        </div>
      </Carousel>
    </div>
  );
}
