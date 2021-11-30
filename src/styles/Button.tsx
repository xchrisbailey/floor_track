import tw, { styled, TwStyle } from 'twin.macro';

type Button = {
  color: 'blue' | 'purple' | 'pink';
};

type ButtonColors = {
  blue: TwStyle;
  purple: TwStyle;
  pink: TwStyle;
};

const buttonColors: ButtonColors = {
  blue: tw`bg-blue-300 hover:bg-blue-400`,
  purple: tw`bg-purple-300 hover:bg-purple-400`,
  pink: tw`bg-pink-300 hover:bg-pink-400`,
};

export const LinkButton = styled.a(({ color }: Button) => [
  tw`p-2 ml-1 rounded shadow cursor-pointer`,
  color ? buttonColors[color] : buttonColors['blue'],
]);
