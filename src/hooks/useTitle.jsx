import React, { useEffect } from 'react';
import { useAppContext } from '../context';

// comment: This hook is used to set the title of the page.

export default function UseTitle(titleName = '') {
  const title = useAppContext();
  useEffect(() => {
    title?.setTitle(titleName);
  }, [titleName]);
  return null;
}
