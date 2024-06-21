import React from 'react';
import {
  FaMobileAlt,
  FaTshirt,
  FaBlender,
  FaBook,
  FaSpa,
  FaFootballBall,
  FaPuzzlePiece,
  FaCar,
  FaAppleAlt,
  FaGem,
} from 'react-icons/fa';
import { MdOutlineMiscellaneousServices } from "react-icons/md";

export const DynamicIcon = ({className, iconName }: {className:string, iconName: string }) => {
  let IconComponent;

  switch (iconName) {
    case 'electronics':
      IconComponent = FaMobileAlt;
      break;
    case 'fashion':
      IconComponent = FaTshirt;
      break;
    case 'home-appliances':
      IconComponent = FaBlender;
      break;
    case 'books':
      IconComponent = FaBook;
      break;
    case 'beauty':
      IconComponent = FaSpa;
      break;
    case 'sports':
      IconComponent = FaFootballBall;
      break;
    case 'toys':
      IconComponent = FaPuzzlePiece;
      break;
    case 'automotive':
      IconComponent = FaCar;
      break;
    case 'grocery':
      IconComponent = FaAppleAlt;
      break;
    case 'jewelry':
      IconComponent = FaGem;
      break;
    case 'service':
      IconComponent = MdOutlineMiscellaneousServices ;
    default:
      IconComponent = FaMobileAlt; // Default icon
  }

  return (
    // <div className="sm:text-5xl text-3xl md:text-7xl">
    <div className={`${className}`}>
      <IconComponent />
    </div>
  );
};
