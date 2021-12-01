import tw, { styled } from 'twin.macro';

export const Brand = styled.h1(() => [
  tw`z-50 py-3 text-5xl tracking-wide lowercase font-brand text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-pink-400`,
]);

export const Hyper = styled.a(() => [
  tw`text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-pink-600 hover:text-indigo-600 border-indigo-600 ease-in-out duration-200`,
]);
