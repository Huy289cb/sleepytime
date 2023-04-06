import { useColorModeValue } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { ComponentType } from "react";

type Props = {
  element: string;
  children: React.ReactElement | string;
};

export default function AnimatedText({ element, children, ...otherProps }: Props) {
  const MotionELement = motion(element, { forwardMotionProps: true });
  return (
    <AnimatePresence mode="wait">
      <MotionELement
        {...otherProps}
        style={{ display: "inline-block" }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </MotionELement>
    </AnimatePresence>
  );
}
