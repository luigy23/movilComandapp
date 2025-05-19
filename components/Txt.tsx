import { Text, TextProps } from 'react-native';

interface TxtProps extends TextProps {
  className?: string;
}

export default function Txt({ className = '', style, ...props }: TxtProps) {
  return (
    <Text
      {...props}
      className={`font-manrope ${className}`.trim()}
      style={[{ fontFamily: 'Manrope_400Regular' }, style]}
    />
  );
} 