"use client";
import { Icon } from "@iconify/react";

import { ICustomIconfiyIconProps } from "@/interfaces/CustomIconifyIcon/CustomIconifyIcon";
import { listIcons } from '@iconify/react';

const CustomIconifyIcon = ({ name, className }: ICustomIconfiyIconProps) => {
 console.log("listIcons listIcons ",listIcons())
  return <Icon icon={"mdi:tshirt-crew"} className={className} />;
};
// mdi:lipstick  -> lipstick
// mdi:soccer   -> football
// mdi:television-classic  --> tv
// mdi:toy-brick-outline -> brick
// mdi:tshirt-crew   -> shirt

export default CustomIconifyIcon;
