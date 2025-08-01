"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimate } from "motion/react";
import React from "react";

export const Button = ({
  className,
  children,
  onClickStart,
  onClickComplete,
  onClickError,
  disabled,
  ...props
}) => {
  const [scope, animate] = useAnimate();

  const animateLoading = async () => {
    await animate(".loader", {
      width: "20px",
      scale: 1,
      display: "block",
    }, { duration: 0.2 });
  };

  const animateSuccess = async () => {
    await animate(".loader", {
      width: "0px",
      scale: 0,
      display: "none",
    }, { duration: 0.2 });

    await animate(".check", {
      width: "20px",
      scale: 1,
      display: "block",
    }, { duration: 0.2 });

    await animate(".check", {
      width: "0px",
      scale: 0,
      display: "none",
    }, { delay: 2, duration: 0.2 });
  };

  const animateError = async () => {
    await animate(".loader", {
      width: "0px",
      scale: 0,
      display: "none",
    }, { duration: 0.2 });

    await animate(".error", {
      width: "20px",
      scale: 1,
      display: "block",
    }, { duration: 0.2 });

    await animate(".error", {
      width: "0px",
      scale: 0,
      display: "none",
    }, { delay: 2, duration: 0.2 });

    // ✅ stronger horizontal shake
    await animate(scope.current, {
      x: [-10, 10, -8, 8, -6, 6, -4, 4, 0],
    }, {
      duration: 0.5,
      easing: "ease-in-out",
    });
  };


  const handleClick = async (event) => {
    if (disabled) return; // prevent clicking
    // ✅ RESET all icons
    await animate(scope.current.querySelector(".loader"), { width: "0px", scale: 0, display: "none" }, { duration: 0 });
    await animate(scope.current.querySelector(".check"), { width: "0px", scale: 0, display: "none" }, { duration: 0 });
    await animate(scope.current.querySelector(".error"), { width: "0px", scale: 0, display: "none" }, { duration: 0 });

    try {
      await animateLoading();
      const result = await onClickStart?.(event);

      if (result === true) {
        await animateSuccess();
        onClickComplete?.();
      } else {
        await animateError();
        onClickError?.();
      }
    } catch (err) {
      await animateError();
      onClickError?.(err);
    }
  };

  return (
    <motion.button
      layout
      layoutId="button"
      ref={scope}
      className={cn(
        "will-change-transform flex min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-full bg-gray-900 px-4 py-2 font-medium text-white ring-offset-2 transition duration-200 hover:ring-2 hover:ring-gray-900",
        disabled
          ? "cursor-not-allowed bg-gray-500 opacity-70"
          : "cursor-pointer bg-gray-900 hover:ring-2 hover:ring-gray-900",
        className
      )}
      {...props}
      onClick={handleClick}
    >
      <motion.div layout className="flex items-center gap-2">
        <Loader />
        <CheckIcon />
        <ErrorIcon />
        <motion.span layout>{children}</motion.span>
      </motion.div>
    </motion.button>
  );
};

const Loader = () => (
  <motion.svg
    animate={{ rotate: [0, 360] }}
    initial={{ scale: 0, width: 0, display: "none" }}
    style={{ scale: 0.5, display: "none" }}
    transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
    xmlns="http://www.w3.org/2000/svg"
    width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    className="loader text-white"
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="M12 3a9 9 0 1 0 9 9" />
  </motion.svg>
);

const CheckIcon = () => (
  <motion.svg
    initial={{ scale: 0, width: 0, display: "none" }}
    style={{ scale: 0.5, display: "none" }}
    xmlns="http://www.w3.org/2000/svg"
    width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    className="check text-white"
  >
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M9 12l2 2l4 -4" />
  </motion.svg>
);

const ErrorIcon = () => (
  <motion.svg
    initial={{ scale: 0, width: 0, display: "none" }}
    style={{ scale: 0.5, display: "none" }}
    xmlns="http://www.w3.org/2000/svg"
    width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    className="error text-white"
  >
    <circle cx="12" cy="12" r="9" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </motion.svg>
);
