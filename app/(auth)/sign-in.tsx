'use client';

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  useColorScheme,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, Apple, Chrome } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';

function getStyles(colors: typeof Colors.light) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
    },
    header: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingTop: 60,
      paddingBottom: 40,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    headerContent: {
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.primaryForeground,
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: colors.primaryForeground,
      opacity: 0.8,
      textAlign: 'center',
    },
    content: {
      flex: 1,
      padding: 24,
    },
    form: {
      flex: 1,
    },
    inputContainer: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 16,
    },
    inputText: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      marginLeft: 12,
    },
    forgotPassword: {
      alignSelf: 'center',
      marginBottom: 16,
    },
    forgotPasswordText: {
      color: colors.primary,
    },
    signInButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      padding: 16,
      alignItems: 'center',
      marginBottom: 16,
    },
    signInButtonText: {
      color: colors.primaryForeground,
      fontSize: 16,
      fontWeight: '600',
    },
    socialSignInContainer: {
      marginVertical: 24,
    },
    socialSignInButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
    },
    googleButton: {
      backgroundColor: '#FFFFFF',
      borderColor: colors.border,
      borderWidth: 1,
    },
    appleButton: {
      backgroundColor: '#000000',
    },
    socialSignInText: {
      marginLeft: 8,
      fontWeight: '600',
    },
    googleText: {
      color: '#000000',
    },
    appleText: {
      color: '#FFFFFF',
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 16,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerText: {
      marginHorizontal: 8,
      color: colors.mutedForeground,
    },
    signUpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    signUpText: {
      color: colors.mutedForeground,
    },
    signUpLink: {
      color: colors.primary,
      fontWeight: '600',
      marginLeft: 4,
    },
  });
}

export default function SignInScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSignIn = async () => {
    setLoading(true);
    const { success, error } = await login(email, password);
    setLoading(false);
    if (!success) {
      Alert.alert('Sign In Failed', error || 'Please check your credentials and try again.');
    }
    // The AuthProvider will handle the redirect on successful login
  };

  const handleGoogleSignIn = async () => {
    if (Platform.OS !== 'web') {
      Alert.alert('Unsupported Platform', 'Google Sign-In is only available on the web.');
      return;
    }
    Alert.alert('Google Sign In', 'Google sign-in is not implemented in this sample app.');
  };

  const handleAppleSignIn = async () => {
    Alert.alert('Apple Sign In', 'Apple sign-in is not implemented in this sample app.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue to Meal Maker</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.socialSignInContainer}>
            <TouchableOpacity style={[styles.socialSignInButton, styles.googleButton]} onPress={handleGoogleSignIn}>
              <Chrome size={20} color="#4285F4" />
              <Text style={[styles.socialSignInText, styles.googleText]}>Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialSignInButton, styles.appleButton]} onPress={handleAppleSignIn}>
              <Apple size={20} color="#FFFFFF" />
              <Text style={[styles.socialSignInText, styles.appleText]}>Continue with Apple</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.input}>
              <Mail size={20} color={colors.mutedForeground} />
              <TextInput
                style={styles.inputText}
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.input}>
              <Lock size={20} color={colors.mutedForeground} />
              <TextInput
                style={styles.inputText}
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity style={styles.forgotPassword} onPress={() => router.push('/(auth)/forgot-password')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn} disabled={loading}>
            {loading ? <ActivityIndicator color={colors.primaryForeground} /> : <Text style={styles.signInButtonText}>Sign In</Text>}
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don&apos;t have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
