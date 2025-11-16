
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, useColorScheme, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { ChevronLeft, Send, ChefHat, Sparkles } from 'lucide-react-native';
import Colors from '../constants/Colors';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import { usePreferences } from '../context/PreferencesContext';
import { usePantry } from '../context/PantryContext';
import { sendMessageToGemini } from '../services/gemini';

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
    headerIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.primaryForeground,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
      flexDirection: 'row',
    },
    headerTitleContainer: {
        alignItems: 'center',
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
    suggestedQuestionsTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primary,
      marginTop: 24,
      marginBottom: 12,
    },
    suggestedQuestionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 24,
    },
    suggestedQuestionButton: {
      backgroundColor: colors.primary + '20',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 8,
    },
    suggestedQuestionText: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: '500',
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

  const suggestedQuestions = [
    "What can I make with my current ingredients?",
    "Suggest a recipe for weight loss",
    "What's a good high-protein meal?",
    "Plan my meals for tomorrow",
  ];

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
    // Auto-send the suggested question
    setTimeout(() => {
      handleSend(question);
    }, 100);
  };

  const handleSend = async (customMessage?: string) => {
    const messageToSend = customMessage || message;
    if (!messageToSend.trim() || loading) return;

    const newMessage: Message = { role: 'user', content: messageToSend };
    setChatHistory(prev => [...prev, newMessage]);
    setMessage('');
    setLoading(true);

    try {
      const aiResponseText = await sendMessageToGemini(
        messageToSend,
        chatHistory,
        cuisines,
        restrictions,
        goals,
        pantry
      );
      
      const aiResponse: Message = {
        role: 'assistant',
        content: aiResponseText
      };
      setChatHistory(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Sorry, I encountered an error. Please try again.';
      const errorResponse: Message = { 
        role: 'assistant', 
        content: errorMessage.includes('API key') 
          ? 'Gemini API key is not configured. Please set EXPO_PUBLIC_GEMINI_API_KEY in your .env file.'
          : 'Sorry, I encountered an error. Please try again.' 
      };
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
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <ChevronLeft size={24} color={colors.primaryForeground} />
              </TouchableOpacity>
              <View style={styles.headerIcon}>
                <ChefHat size={24} color={colors.primary} />
                <Sparkles size={16} color={colors.primary} style={{ marginLeft: -8, marginTop: -8 }} />
              </View>
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
              {chatHistory.length === 1 && (
                <>
                  <Text style={styles.suggestedQuestionsTitle}>Suggested questions:</Text>
                  <View style={styles.suggestedQuestionsContainer}>
                    {suggestedQuestions.map((question, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.suggestedQuestionButton}
                        onPress={() => handleSuggestedQuestion(question)}
                      >
                        <Text style={styles.suggestedQuestionText}>{question}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}
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
                    onSubmitEditing={() => handleSend()}
                    editable={!loading}
                />
                <TouchableOpacity style={styles.sendButton} onPress={() => handleSend()} disabled={!message.trim() || loading}>
                    <Send size={24} color={(!message.trim() || loading) ? colors.mutedForeground : colors.primary} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
