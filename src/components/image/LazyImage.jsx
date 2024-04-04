import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import getRatio from './getRatio';

// ----------------------------------------------------------------------
/* eslint-disable react/display-name */

PropTypes.Image = {
  ratio: PropTypes.string,
  disabledEffect: PropTypes.bool,
  effect: PropTypes.string,
  ref: PropTypes.object
};

const Image = forwardRef(
  ({ ratio, disabledEffect = false, effect = 'blur', ...other }, ref) => {
    const content = (
      <LazyLoadImage
        wrapperClassName="wrapper"
        effect={disabledEffect ? undefined : effect}
        placeholderSrc="/assets/placeholder.svg"
        width="100%"
        // style={{ objectFit: 'cover' }}
        {...other}
      />
    );

    if (ratio) {
      return (
        <span
          ref={ref}
          style={{
            width: 1,
            lineHeight: 1,
            display: 'block',
            overflow: 'hidden',
            position: 'relative',
            paddingTop: getRatio(ratio)
            // '&.wrapper': {
            //   top: 0,
            //   left: 0,
            //   width: 1,
            //   height: 1,
            //   position: 'absolute',
            //   backgroundSize: 'cover !important'
            // }
          }}
        >
          {content}
        </span>
      );
    }

    return (
      <span
        ref={ref}
        style={{
          lineHeight: 1,
          display: 'block',
          overflow: 'hidden',
          position: 'relative'
          // '&:wrapper': {
          //   width: 1,
          //   height: 1,
          //   backgroundSize: 'cover !important'
          // }
        }}
      >
        {content}
      </span>
    );
  }
);

export default Image;
