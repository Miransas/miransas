'use client';

import {
  AvatarGroup,
  AvatarGroupTooltip,
} from '@/components/animate-ui/components/animate/avatar-group';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

const AVATARS = [
  {
    src: 'https://res.cloudinary.com/dwdk20m6q/image/upload/v1788894744/photo_2026-09-08_22.11.45_ozmn34.jpg',
    fallback: 'SA',
    tooltip: 'Sardor Azimov',
  },
  {
    src: 'https://res.cloudinary.com/dwdk20m6q/image/upload/v1788894746/PhotoshopExtension_Image_yi5uaz.png',
    fallback: 'EK',
    tooltip: 'Efe Kaya',
  },
  {
    src: 'https://res.cloudinary.com/dwdk20m6q/image/upload/v1788894765/ChatGPT_Image_Sep_8_2026_10_11_10_PM_ovrglt.png',
    fallback: 'GM',
    tooltip: 'Guliruhsar M',
  },
 
];

export const AvatarGroupDemo = () => {
  return (
    <AvatarGroup className="flex mt-4">
      {AVATARS.map((avatar, index) => (
        <Avatar key={index} className="size-12 border-3 border-background">
          <AvatarImage src={avatar.src} />
          <AvatarFallback>{avatar.fallback}</AvatarFallback>
          <AvatarGroupTooltip>{avatar.tooltip}</AvatarGroupTooltip>
        </Avatar>
      ))}
    </AvatarGroup>
  );
};