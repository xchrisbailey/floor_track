import { Switch } from '@headlessui/react';
import tw, { styled } from 'twin.macro';

interface ToggleProps {
  color: 'purple' | 'pink';
  checked: boolean;
}

interface ToggleSliderProps {
  checked: boolean;
}

const toggleColors = { purple: tw`bg-purple-400`, pink: tw`bg-pink-400` };

export const ToggleContainer = tw.div`flex items-center p-2 place-content-between`;
export const ToggleLabel = tw.p`flex-grow pr-2 text-sm`;
export const ToggleAccess = tw.span`sr-only`;
export const ToggleSlider = styled.span(({ checked }: ToggleSliderProps) => [
  tw`inline-block w-4 h-4 transform bg-white rounded-full`,
  checked ? tw`translate-x-6` : tw`translate-x-1`,
]);

export const Toggle = styled(Switch)(({ color, checked }: ToggleProps) => [
  tw`relative inline-flex items-center h-6 rounded-full w-11`,
  checked ? toggleColors[color] : tw`bg-gray-300`,
]);
