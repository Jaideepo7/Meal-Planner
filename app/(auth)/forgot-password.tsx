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
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Send, ChevronLeft, Lightbulb } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { sendPasswordReset } from '../../services/auth';
import { useState } from 'react';

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
      alignItems: 'center',
      position: 'relative',
    },
    backButton: {
      position: 'absolute',
      left: 24,
      top: 60,
    },
    iconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primaryForeground,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.primaryForeground,
      marginBottom: 8,
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
    emailInfo: {
      fontSize: 12,
      color: colors.mutedForeground,
      marginTop: 4,
    },
    sendResetLinkButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      padding: 16,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 16,
    },
    sendResetLinkButtonText: {
      color: colors.primaryForeground,
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
    backToSignInButton: {
      backgroundColor: colors.secondary,
      borderRadius: 8,
      padding: 16,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      borderColor: colors.border,
      borderWidth: 1,
    },
    backToSignInButtonText: {
      color: colors.secondaryForeground,
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
    rememberPasswordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 16,
      marginVertical: 32,
    },
    rememberPasswordTextContainer: {
      marginLeft: 16,
    },
    rememberPasswordText: {
      color: colors.text,
    },
    rememberPasswordLink: {
      color: colors.primary,
      fontWeight: '600',
    },
  });
}

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendResetLink = async () => {
    setLoading(true);
    const { success, error } = await sendPasswordReset(email);
    setLoading(false);
    if (success) {
      Alert.alert(
        'Reset Link Sent',
        'Please check your email for reset instructions.'
      );
      router.push('/(auth)/sign-in');
    } else {
      Alert.alert(
        'Error',
        error || 'Failed to send reset link. Please try again.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ChevronLeft size={24} color={colors.primaryForeground} />
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <Send size={32} color={colors.primary} />
          </View>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            No worries, we'll send you reset instructions
          </Text>
        </View>

        <View style={styles.content}>
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
            <Text style={styles.emailInfo}>
              Enter the email address associated with your account
            </Text>
          </View>

          <TouchableOpacity
            style={styles.sendResetLinkButton}
            onPress={handleSendResetLink}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.primaryForeground} />
            ) : (
              <Send size={20} color={colors.primaryForeground} />
            )}
            <Text style={styles.sendResetLinkButtonText}>Send Reset Link</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rememberPasswordContainer}>
          <Lightbulb size={24} color={colors.primary} />
          <View style={styles.rememberPasswordTextContainer}>
            <Text style={styles.rememberPasswordText}>Remember your password?</Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')}>
              <Text style={styles.rememberPasswordLink}>
                Try signing in again
              </Text>
            </TouchableOpacity>
          </View>
        </View>

          <TouchableOpacity
            style={styles.backToSignInButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={20} color={colors.secondaryForeground} />
            <Text style={styles.backToSignInButtonText}>Back to Sign In</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
