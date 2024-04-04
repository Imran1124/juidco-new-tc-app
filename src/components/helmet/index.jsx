import { Helmet } from 'react-helmet-async';
import PropType from 'prop-types';
import { forwardRef, useEffect } from 'react';
import UseTitle from '../../hooks/useTitle';

// This component is used to set the title and meta tags of the page.
// It also scrolls to the top of the page when the title changes.
// It also sets the title of the page.
// It also sets the meta tags of the page.

const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => {
  UseTitle(title);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [title]);

  return (
    <>
      <Helmet>
        <title>{`${title} | JUIDCO`}</title>
        {meta}
      </Helmet>
      <div ref={ref} {...other}>
        {children}
      </div>
    </>
  );
});

export default Page;

Page.propTypes = {
  children: PropType.node,
  title: PropType.string,
  meta: PropType.node
};
