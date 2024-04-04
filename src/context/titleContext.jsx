import { useState } from 'react';

// comment: This context is used to set the title of the page.

export default function TitleContext() {
  const [getTitle, setTitle] = useState('');
  return {
    getTitle,
    setTitle
  };
}
