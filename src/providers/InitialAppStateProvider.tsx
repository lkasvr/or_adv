'use client';
import { setIsMobile } from '@/store/appSlice';
import { useMediaQuery } from '@react-hook/media-query';
import React from 'react';
import { useDispatch } from 'react-redux';

export default function InitialAppStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setIsMobile(isMobile));
  }, [isMobile, dispatch]);

  return <React.Fragment>{children}</React.Fragment>;
}
