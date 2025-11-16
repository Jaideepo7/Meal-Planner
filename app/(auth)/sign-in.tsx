
'use client';

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, TextInput, useColorScheme, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, Apple, Chrome } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { signIn, signInWithGoogle } from '../../services/auth';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

function getStyles(colors: typeof Colors.light) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      padding: 24,
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
      alignSelf: 'flex-end',
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
    const { success, user, error } = await signIn(email, password);
    setLoading(false);
    if (success && user) {
      login(user);
    } else {
      Alert.alert('Sign In Failed', error || 'Please check your credentials and try again.');
    }
  };
  
    const handleGoogleSignIn = async () => {
    setLoading(true);
    const { success, user, error } = await signInWithGoogle();
    setLoading(false);
    if (success && user) {
      login(user);
    } else {
      Alert.alert('Google Sign In Failed', error || 'Please try again.');
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue to MealMind AI</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.socialSignInContainer}>
            <TouchableOpacity style={[styles.socialSignInButton, styles.googleButton]} onPress={handleGoogleSignIn}>
              <Chrome size={20} color="#000000" />
              <Text style={[styles.socialSignInText, styles.googleText]}>Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialSignInButton, styles.appleButton]}>
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
        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
