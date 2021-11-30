import tw, { styled } from 'twin.macro';
import Image from 'next/image';

interface CardType {
  type: 'collection' | 'info';
}

interface InfoTab {
  color: 'green' | 'blue';
  position?: 'left' | undefined;
}

interface CardHeaderProps {
  color: 'purple' | 'yellow' | 'default';
  type: 'collection' | 'info';
}

// base card styles for collections and sidebar
export const CardBase = styled.article(({ type }: CardType) => [
  tw`mb-2 bg-gray-200 rounded shadow`,
  type === 'collection' && tw`flex p-0 overflow-hidden`,
]);

// header container for collections and sidebar
export const CardHeader = styled.h3(({ color, type }: CardHeaderProps) => [
  tw`p-2`,
  type === 'info' && tw`tracking-wide uppercase rounded-t`,
  type === 'collection' && tw`flex items-center w-1/2 md:flex-grow`,
  color === 'purple' && tw`bg-purple-400`,
  color === 'yellow' && tw`bg-yellow-400`,
]);
export const CardContent = styled.div(() => [tw`p-2`]);

export const CardImage = styled(Image)(() => [tw`rounded-full shadow-inner`]);

export const CardLink = styled.a(() => [
  tw`mx-2 text-blue-700 underline hover:text-blue-800 hover:no-underline`,
]);

export const CardInfoTab = styled.div(({ color, position }: InfoTab) => [
  tw`flex items-center justify-center w-1/4 p-2 md:w-1/5`,

  color === 'blue' && tw`bg-blue-300`,

  color === 'green' && tw`bg-green-300`,

  position === 'left' && tw`rounded-l`,
]);
