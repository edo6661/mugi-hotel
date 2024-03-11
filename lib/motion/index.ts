export const basicTransitionVars = {
  duration: 0.3,
  ease: "easeInOut",
};
export const existVars = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const basicMotionProps = {
  variant: existVars,
  initial: "initial",
  animate: "animate",
  exit: "exit",
  transition: basicTransitionVars,
};
