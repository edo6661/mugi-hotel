"use client";
import React from "react";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { basicMotionProps, existVars } from "@/lib/motion";
import useIsClient from "@/hooks/useIsClient";
interface FormSuccessProps {
  success: string;
}
const FormSuccess = ({ success }: FormSuccessProps) => {
  const isClient = useIsClient();
  if (!success) return null;
  return (
    <AnimatePresence>
      {isClient && success && (
        <motion.div
          variants={existVars}
          {...basicMotionProps}
          className="font-semibold bg-emerald-500/25 p-4 rounded-xl fl-itc gap-2 text-sm text-emerald-500"
        >
          <CheckCircledIcon className=" w-4 h-4" />
          <p>{success}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormSuccess;
