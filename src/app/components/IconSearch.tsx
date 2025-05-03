'use client';

import React from 'react';
import { useSpring, animated } from 'react-spring';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { SEARCH_MODAL_ID } from '@/constants';
import { useGlobalUIActions } from '@/components/GlobalUIProvider';

import { IconProps } from './Icon.types';
import IconWrapper from './IconWrapper';

export function IconSearch({
  size = 20,
  isBooped,
  style = {},
  className = '',
  ...delegated
}: IconProps) {
  const iconStyle = useSpring({
    ...style,
    transform: isBooped ? 'scale(1.1) rotate(8deg)' : 'scale(1) rotate(0deg)',
    config: {
      tension: 300,
      friction: 10,
    },
  });

  const shimmerStyle = useSpring({
    transform: isBooped
      ? 'rotate(-20deg) translateX(-40%)'
      : 'rotate(-20deg) translateX(50%)',
    config: {
      tension: 300,
      friction: 12,
    },
  });

  return (
    <span className="relative inline-block transition-transform duration-300 ease-[cubic-bezier(0.06,0.63,0.43,1)]">
      <span className="absolute top-[23%] right-[30%] w-1/2 h-[45%] rounded-full overflow-hidden scale-[0.85] rotate-[-20deg] origin-center transition-opacity duration-500 delay-500 dark:opacity-100 opacity-0">
        <animated.span
          style={shimmerStyle}
          className="absolute inset-0 w-full h-full rounded-full bg-white dark:bg-background opacity-50 dark:opacity-100"
        />
      </span>
      <animated.svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width={`${size / 16}rem`}
        height={`${size / 16}rem`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={iconStyle}
        className={twMerge('stroke-current block overflow-visible', className)}
        {...delegated}
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </animated.svg>
    </span>
  );
}

function WrappedIconSearch(props: Omit<IconProps, 'isBooped'>) {
  const { toggleModal } = useGlobalUIActions();

  return (
    <IconWrapper alt="Search" onClick={() => toggleModal(SEARCH_MODAL_ID)}>
      {({ isBooped }) => <IconSearch {...props} isBooped={isBooped} />}
    </IconWrapper>
  );
}

export default WrappedIconSearch;
