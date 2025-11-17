'use client';

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, Apple, User, Chrome, ChevronLeft } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import Colors from '../../constants/Colors';

function getStyles(colors: typeof Colors.light) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
    },
    header: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingTop: 60,
      paddingBottom: 40,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      marginRight: 16,
    },
    headerContent: {
      flex: 1,
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.primaryForeground,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.primaryForeground,
      opacity: 0.8,
    },
    content: {
      padding: 24,
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
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }
    setLoading(true);
    const { success, error } = await signUp(email, password);
    setLoading(false);
    if (!success) {
      Alert.alert('Sign Up Failed', error || 'Please try again.');
    }
    // The AuthProvider will handle the redirect on successful sign-up
  };

  const handleGoogleSignIn = async () => {
    if (Platform.OS !== 'web') {
      Alert.alert(
        'Unsupported Platform',
        'Google Sign-In is only available on the web.'
      );
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
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.primaryForeground} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign in to continue to Meal Planner</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.content}>

        <View style={styles.form}>
          <View style={styles.socialSignInContainer}>
            <TouchableOpacity
              style={[styles.socialSignInButton, styles.googleButton]}
              onPress={handleGoogleSignIn}
            >
              <Chrome size={20} color="#4285F4" />
              <Text style={[styles.socialSignInText, styles.googleText]}>
                Continue with Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialSignInButton, styles.appleButton]}
              onPress={handleAppleSignIn}
            >
              <Apple size={20} color="#FFFFFF" />
              <Text style={[styles.socialSignInText, styles.appleText]}>
                Continue with Apple
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
                placeholderTextColor={colors.mutedForeground}
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
                placeholderTextColor={colors.mutedForeground}
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
                placeholderTextColor={colors.mutedForeground}
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
                placeholderTextColor={colors.mutedForeground}
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
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
