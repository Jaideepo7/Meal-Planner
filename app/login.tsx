
import React from 'react';
import { View, Text, Button, StyleSheet, useColorScheme } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Colors from '../constants/Colors';

const LoginScreen = () => {
  const { login } = useAuth();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Login</Text>
      {/* In a real app, you would have text inputs for email/password */}
      <Button title="Log In" onPress={login} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default LoginScreen;
