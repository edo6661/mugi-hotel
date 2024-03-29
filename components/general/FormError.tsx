"use client";
import React from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { basicMotionProps, existVars } from "@/lib/motion";
import useIsClient from "@/hooks/useIsClient";
interface FormErrorProps {
  error: string;
}
const FormError = ({ error }: FormErrorProps) => {
  const isClient = useIsClient();

  if (!error) return null;
  return (
    <AnimatePresence>
      {isClient && error && (
        <motion.div
          variants={existVars}
          {...basicMotionProps}
          className="font-semibold bg-destructive/25 p-4 rounded-xl fl-itc gap-2 text-sm text-destructive"
        >
          <ExclamationTriangleIcon className=" w-4 h-4" />
          <p>{error}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormError;
