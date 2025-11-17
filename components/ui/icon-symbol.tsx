import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

const MAPPING = {
  'house.fill': 'home',
  'house': 'home',
  'heart': 'favorite',
  'lightbulb': 'lightbulb-outline',
  'person': 'person',
  'slider.horizontal.3': 'tune',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'fork.knife': 'restaurant',
  'leaf': 'eco',
  'xmark.circle': 'cancel',
  'plus': 'add',
  'plus.circle': 'add-circle-outline',
  'trash': 'delete',
  'pencil': 'edit',
  'flame': 'whatshot',
  'person.2': 'people',
  'chevron.down': 'keyboard-arrow-down',
  'chevron.up': 'keyboard-arrow-up',
  'globe.americas': 'public',
  'calendar': 'event',
  'clock': 'schedule',
  'bolt': 'flash-on',
  'sun.max': 'wb-sunny',
  'moon': 'brightness-2',
  'cloud.drizzle': 'grain',
  'wind': 'air',
  'snowflake': 'ac-unit',
  'drop': 'opacity',
  'lungs': 'local-hospital',
  'figure.walk': 'directions-walk',
  'trophy': 'emoji-events',
  'scalemass': 'fitness-center',
  'heart.text.square': 'favorite',
} as IconMapping;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
