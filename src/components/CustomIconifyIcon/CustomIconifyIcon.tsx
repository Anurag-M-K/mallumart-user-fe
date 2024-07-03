"use client";
import { Icon } from "@iconify/react";

import { ICustomIconfiyIconProps } from "@/interfaces/CustomIconifyIcon/CustomIconifyIcon";

const CustomIconifyIcon = ({ name, className }: ICustomIconfiyIconProps) => {
  return <Icon icon={name} className={className} />;
};
// mdi:lipstick  -> lipstick
// mdi:soccer   -> football
// mdi:television-classic  --> tv
// mdi:toy-brick-outline -> brick
// mdi:tshirt-crew   -> shirt

export default CustomIconifyIcon;
