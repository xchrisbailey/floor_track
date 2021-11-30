import tw, { styled } from 'twin.macro';
import Image from 'next/image';

type Card = {
  type: 'collection' | 'info';
};

type InfoTab = {
  color: 'green' | 'blue';
  position?: 'left' | undefined;
};

type CardHeader = {
  color: 'purple' | 'yellow' | 'pink' | 'default';
  type: 'collection' | 'info';
};

// info card header colors
const headerColors = {
  pink: tw`bg-pink-500`,
  yellow: tw`bg-yellow-500`,
  purple: tw`bg-purple-500`,
  default: tw`bg-gray-100`,
};

// header type option styles
const headerTypes = {
  info: tw`tracking-wide uppercase rounded-t`,
  collection: tw`flex items-center w-1/2 md:flex-grow`,
};

// color variants for info tabs
const infoTabColors = {
  blue: tw`bg-blue-300`,
  green: tw`bg-green-300`,
};

// base card styles for collections and sidebar
export const CardBase = styled.article(({ type }: Card) => [
  tw`mb-2 bg-gray-100 rounded shadow`,
  type === 'collection' && tw`flex p-0 overflow-hidden`,
]);

// header container for collections and sidebar
export const CardHeader = styled.h3(({ color, type }: CardHeader) => [
  tw`p-2`,
  color ? headerColors[color] : headerColors['default'],
  type && headerTypes[type],
]);

export const CardContent = styled.div(() => [tw`p-2`]);

export const CardImage = styled(Image)(() => [tw`rounded-full shadow-inner`]);

export const CardLink = styled.a(() => [
  tw`mx-2 text-blue-700 underline hover:text-blue-800 hover:no-underline`,
]);

export const CardInfoTab = styled.div(({ color, position }: InfoTab) => [
  tw`flex items-center justify-center w-1/4 p-2 md:w-1/5`,
  color && infoTabColors[color],
  position === 'left' && tw`rounded-l`,
]);
