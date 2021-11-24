import tw, { styled } from 'twin.macro';

interface CardHeaderProps {
  color: 'purple' | 'yellow';
}
export const CardBase = styled.article(() => [
  tw`mb-2 bg-gray-200 rounded shadow`,
]);
export const CardHeader = styled.h3(({ color }: CardHeaderProps) => [
  tw`p-2 tracking-wide uppercase rounded-t`,
  color === 'purple' && tw`bg-purple-400`,
  color === 'yellow' && tw`bg-yellow-400`,
]);
export const CardContent = styled.div(() => [tw`p-2`]);
