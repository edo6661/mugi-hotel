export const errorHandler = <T>(
  error: T,
  reason?: string,
  callback?: () => T
) => {
  console.error(error);
  if (reason) {
    throw new Error(reason);
  }
  if (callback) {
    return callback();
  }
};
