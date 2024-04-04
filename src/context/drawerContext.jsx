import { useState } from 'react';

export default function DrawerContext() {
  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return {
    open,
    setOpen,
    openSettings,
    setOpenSettings,
    isDrawerOpen,
    setIsDrawerOpen
  };
}
