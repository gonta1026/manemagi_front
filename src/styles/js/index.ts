export const mediaSize = {
  XS: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
} as const;

export const isDeviceCheck = (targetDevice: 'sp' | 'tab' | 'other'): boolean => {
  let device = '';
  const ua = navigator.userAgent;
  if (
    ua.indexOf('iPhone') > 0 ||
    ua.indexOf('iPod') > 0 ||
    (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)
  ) {
    device = 'sp';
  } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
    device = 'tab';
  } else {
    device = 'other';
  }
  return targetDevice === device;
};
