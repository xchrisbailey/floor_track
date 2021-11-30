import tw, { styled } from 'twin.macro';

const InputWidths = {
  full: tw`w-full`,
  auto: tw`w-auto`,
  half: tw`w-1/2`,
};

export const Input = styled.input(
  ({ width }: { width: 'full' | 'auto' | 'half' }) => [
    tw`p-2 border rounded`,
    width ? InputWidths[width] : InputWidths['auto'],
  ]
);
