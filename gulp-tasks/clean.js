export const clean = (cb) => {
  return $.del([$.conf.dev, $.conf.prod]).then(() => cb())
};
