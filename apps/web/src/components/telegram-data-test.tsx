'use client';

import { useViewport } from '@tma.js/sdk-react';
import { useEffect } from 'react';

const TelegramDataTest = () => {
  const viewport = useViewport();

  useEffect(() => {
    if (viewport?.isExpanded) return;
    viewport?.expand();
  }, [viewport]);

  return <h1>telegram</h1>;
};

export default TelegramDataTest;
