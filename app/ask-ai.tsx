
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, useColorScheme, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { ChevronLeft, Send } from 'lucide-react-native';
import Colors from '../constants/Colors';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import { usePreferences } from '../context/PreferencesContext';
import { usePantry } from '../context/PantryContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function getStyles(colors: any) {
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
      paddingVertical: 40,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      alignItems: 'center',
      flexDirection: 'row',
      gap: 12,
    },
    headerTitleContainer: {
        alignItems: 'center',
        flex: 1,
        paddingRight: 36,
    },
    title: {
      color: colors.primaryForeground,
      fontSize: 24,
      fontWeight: 'bold',
    },
    subtitle: {
      color: colors.primaryForeground,
      fontSize: 14,
      opacity: 0.8,
      marginTop: 2,
    },
    content: {
      flex: 1,
    },
    contentContainer: {
      padding: 24,
      paddingBottom: 100,
    },
    messageContainer: {
      marginBottom: 12,
    },
    userMessageContainer: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      padding: 12,
      alignSelf: 'flex-end',
      maxWidth: '80%',
    },
    assistantMessageContainer: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 12,
      alignSelf: 'flex-start',
      maxWidth: '80%',
    },
    userMessage: {
      color: colors.primaryForeground,
      fontSize: 14,
    },
    assistantMessage: {
      color: colors.cardForeground,
      fontSize: 14,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        borderRadius: 16,
        paddingHorizontal: 16,
        margin: 24,
    },
    input: {
        flex: 1,
        height: 50,
        color: colors.cardForeground,
    },
    sendButton: {
        marginLeft: 12,
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
    }
  });
}

export default function AskAiScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = getStyles(colors);
  const { cuisines, restrictions, goals } = usePreferences();
  const { pantry } = usePantry();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm your AI meal assistant. Based on your preferences, I can help you find recipes, plan meals, and answer questions about your dietary goals. What would you like to know?" },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const newMessage: Message = { role: 'user', content: message };
    setChatHistory(prev => [...prev, newMessage]);
    setMessage('');
    setLoading(true);

    try {
      // This is where you would make the API call to your backend
      // For now, we'll just simulate a response
      await new Promise(resolve => setTimeout(resolve, 2000));
      const preferencesText = `Here are your current preferences:\n- Cuisines: ${cuisines.length > 0 ? cuisines.join(', ') : 'Not set'}\n- Dietary Restrictions: ${restrictions.length > 0 ? restrictions.join(', ') : 'Not set'}\n- Health Goals: ${goals.length > 0 ? goals.join(', ') : 'Not set'}`;
      const pantryText = `Here are the items in your pantry: ${pantry.length > 0 ? pantry.join(', ') : 'Not set'}`;
      const aiResponse: Message = {
        role: 'assistant',
        content: `This is a simulated response based on your message: "${message}".\n\nA real response from the Gemini API would use your preferences to generate a personalized meal suggestion.\n\n${preferencesText}\n\n${pantryText}`
      };
      setChatHistory(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorResponse: Message = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
      setChatHistory(prev => [...prev, errorResponse]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeft size={24} color={colors.primaryForeground} />
                </TouchableOpacity>
              <View style={styles.headerTitleContainer}>
                <Text style={styles.title}>Ask AI</Text>
                <Text style={styles.subtitle}>Your personalized meal assistant</Text>
              </View>
            </View>

            <ScrollView 
                style={styles.content} 
                contentContainerStyle={styles.contentContainer} 
                ref={scrollViewRef} 
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({animated: true})}
            >
              {chatHistory.map((msg, index) => (
                <View key={index} style={styles.messageContainer}>
                  <View style={msg.role === 'user' ? styles.userMessageContainer : styles.assistantMessageContainer}>
                    <Text style={msg.role === 'user' ? styles.userMessage : styles.assistantMessage}>{msg.content}</Text>
                  </View>
                </View>
              ))}
              {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color={colors.primary} />
                </View>
              )}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Ask me anything..."
                    placeholderTextColor={colors.mutedForeground}
                    value={message}
                    onChangeText={setMessage}
                    onSubmitEditing={handleSend}
                    editable={!loading}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend} disabled={!message.trim() || loading}>
                    <Send size={24} color={(!message.trim() || loading) ? colors.mutedForeground : colors.primary} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
