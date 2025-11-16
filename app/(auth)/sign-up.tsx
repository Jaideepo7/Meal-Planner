'use client';

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  useColorScheme,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, Apple, User, Chrome } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { signUp, signInWithGoogle, signInWithApple } from '../../services/auth';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

function getStyles(colors: typeof Colors.light) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flexGrow: 1,
      padding: 24,
      justifyContent: 'center',
    },
    header: {
      alignItems: 'center',
      marginBottom: 32,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.mutedForeground,
    },
    form: {},
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
    createAccountButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      padding: 16,
      alignItems: 'center',
      marginBottom: 16,
    },
    createAccountButtonText: {
      color: colors.primaryForeground,
      fontSize: 16,
      fontWeight: '600',
    },
    socialSignInContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 16,
    },
    socialSignInButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      padding: 16,
      marginHorizontal: 8,
      flex: 1,
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
    signInContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    signInText: {
      color: colors.mutedForeground,
    },
    signInLink: {
      color: colors.primary,
      fontWeight: '600',
      marginLeft: 4,
    },
  });
}

export default function SignUpScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }
    setLoading(true);
    const { success, user, error } = await signUp(email, password);
    setLoading(false);
    if (success && user) {
      login(user);
    } else {
      Alert.alert('Sign Up Failed', error || 'Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    if (Platform.OS !== 'web') {
      Alert.alert(
        'Unsupported Platform',
        'Google Sign-In is only available on the web.'
      );
      return;
    }
    setLoading(true);
    const { success, user, error } = await signInWithGoogle();
    setLoading(false);
    if (success && user) {
      login(user);
    } else {
      Alert.alert('Google Sign In Failed', error || 'Please try again.');
    }
  };

  const handleAppleSignIn = async () => {
    setLoading(true);
    const { success, user, error } = await signInWithApple();
    setLoading(false);
    if (success && user) {
      login(user);
    } else {
      Alert.alert(
        'Apple Sign In Failed',
        error || 'An error occurred during Apple Sign-In. Please try again.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join MealMind AI today</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.socialSignInContainer}>
            <TouchableOpacity
              style={[styles.socialSignInButton, styles.googleButton]}
              onPress={handleGoogleSignIn}
            >
              <Chrome size={20} color="#000000" />
              <Text style={[styles.socialSignInText, styles.googleText]}>
                Sign up with Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialSignInButton, styles.appleButton]}
              onPress={handleAppleSignIn}
            >
              <Apple size={20} color="#FFFFFF" />
              <Text style={[styles.socialSignInText, styles.appleText]}>
                Sign up with Apple
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.input}>
              <User size={20} color={colors.mutedForeground} />
              <TextInput
                style={styles.inputText}
                placeholder="John Doe"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>
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

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={styles.input}>
              <Lock size={20} color={colors.mutedForeground} />
              <TextInput
                style={styles.inputText}
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.primaryForeground} />
            ) : (
              <Text style={styles.createAccountButtonText}>Create Account</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')}>
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
