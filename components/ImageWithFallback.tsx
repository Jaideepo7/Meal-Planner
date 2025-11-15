
import React, { useState } from 'react';
import { View, Image, StyleSheet, useColorScheme } from 'react-native';
import type { ImageProps } from 'react-native';
import { ImageOff } from 'lucide-react-native';
import Colors from '../constants/Colors';

export type ImageWithFallbackProps = ImageProps;

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const onError = () => {
    setHasError(true);
  };

  const { source, style, ...rest } = props;

  const sourceIsObject = typeof source === 'object' && source !== null;
  const uri = sourceIsObject && !Array.isArray(source) ? (source as any).uri : null;

  if (
    hasError ||
    !source ||
    (Array.isArray(source) && source.length === 0) ||
    (sourceIsObject && !Array.isArray(source) && !uri)
  ) {
    return (
      <View style={[styles.fallbackContainer, { backgroundColor: colors.muted }, style]}>
        <ImageOff color={colors.mutedForeground} size={48} />
      </View>
    );
  }

  return <Image source={source} style={style} onError={onError} {...rest} />;
}

const styles = StyleSheet.create({
  fallbackContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
