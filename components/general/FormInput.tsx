import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { FieldError } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { basicMotionProps, existVars } from "@/lib/motion";
interface FormInputProps {
  control: any;
  label: string;
  name: string;
  placeholder: string;
  description?: string;
  type?: string;
  error: FieldError | undefined;
}
const FormInput = ({
  control,
  label,
  name,
  placeholder,
  description,
  type,
  error,
}: FormInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} type={type || "text"} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <AnimatePresence>
            {error && (
              <motion.div variants={existVars} {...basicMotionProps}>
                <FormMessage />
              </motion.div>
            )}
          </AnimatePresence>
        </FormItem>
      )}
    />
  );
};

export default FormInput;
