
import BackButton from "@/components/BackButton";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Animated, { FadeInUp, ZoomIn } from "react-native-reanimated";
import { AnimatedHeader, AnimatedText, AnimatedButton, AnimatedCard } from "../components/AnimatedComponents";

interface Message {
  id: number;
  text: string;
  sender: "customer" | "business";
  timestamp: Date;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! Thanks for your interest in our services. How can I help you today?",
      sender: "business",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        text: newMessage.trim(),
        sender: "customer",
        timestamp: new Date()
      };
      setMessages([...messages, message]);
      setNewMessage("");
      
      // Simulate business response
      setTimeout(() => {
        const response: Message = {
          id: messages.length + 2,
          text: "Thanks for your message! I'll get back to you with details shortly.",
          sender: "business",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, response]);
      }, 1500);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" />
      
      {/* Modern Header */}
      <AnimatedHeader style={styles.header}>
        <View style={styles.headerContent}>
          <AnimatedText delay={200} style={styles.title}>Messages</AnimatedText>
          <AnimatedText delay={400} style={styles.subtitle}>Chat with Gadget Garage</AnimatedText>
          <Animated.View 
            entering={ZoomIn.delay(600).springify()}
            style={styles.headerDecoration} 
          />
        </View>
      </AnimatedHeader>

      {/* Custom Back Button */}
      <View style={styles.backButtonContainer}>
        <BackButton 
      // variant = default, minimal, floating
          variant="floating" 
          color="#ffffff" 
          title=""
        />
      </View>

      {/* Messages Container */}
      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map((message, index) => (
          <Animated.View
            key={message.id}
            entering={FadeInUp.delay(index * 100).springify()}
            style={[
              styles.messageContainer,
              message.sender === "customer" ? styles.customerMessage : styles.businessMessage
            ]}
          >
            <Text style={[
              styles.messageText,
              message.sender === "customer" ? styles.customerMessageText : styles.businessMessageText
            ]}>
              {message.text}
            </Text>
            <Text style={[
              styles.timestamp,
              message.sender === "customer" ? styles.customerTimestamp : styles.businessTimestamp
            ]}>
              {formatTime(message.timestamp)}
            </Text>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Quick Actions Card */}
      <AnimatedCard delay={300} style={styles.quickActionsCard}>
        <Text style={styles.quickActionsTitle}>Quick Questions</Text>
        <View style={styles.quickActionButtons}>
          {[
            { text: "💰 Pricing", message: "What are your current rates for PC building?" },
            { text: "⏰ Timeline", message: "How long does a typical repair take?" },
            { text: "🛡️ Warranty", message: "Do you offer warranties on your work?" }
          ].map((action, index) => (
            <AnimatedButton
              key={index}
              delay={400 + index * 100}
              onPress={() => setNewMessage(action.message)}
              style={styles.quickActionButton}
            >
              <Text style={styles.quickActionText}>{action.text}</Text>
            </AnimatedButton>
          ))}
        </View>
      </AnimatedCard>

      {/* Input Container */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message..."
            placeholderTextColor="#666666"
            multiline
            maxLength={500}
          />
          <AnimatedButton
            delay={600}
            onPress={sendMessage}
            style={[styles.sendButton, !newMessage.trim() && styles.sendButtonDisabled]}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </AnimatedButton>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  header: {
    backgroundColor: "#000000",
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
  },
  headerContent: {
    alignItems: "center",
  },
  
  title: {
    fontSize: 36,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "center",
    textShadowColor: "rgba(255, 255, 255, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: "#a0a0a0",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  headerDecoration: {
    width: 80,
    height: 3,
    backgroundColor: "#ffffff",
    borderRadius: 2,
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  backButtonContainer: {
    position: "absolute",
    top: 58,
    left: 15,
    zIndex: 10,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#0a0a0a",
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: "85%",
    padding: 18,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  customerMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#ffffff",
    borderBottomRightRadius: 6,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  businessMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderBottomLeftRadius: 6,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
  },
  customerMessageText: {
    color: "#000000",
    fontWeight: "600",
  },
  businessMessageText: {
    color: "#ffffff",
    fontWeight: "500",
  },
  timestamp: {
    fontSize: 12,
    marginTop: 8,
    fontWeight: "600",
  },
  customerTimestamp: {
    color: "#333333",
    textAlign: "right",
  },
  businessTimestamp: {
    color: "#888888",
  },
  quickActionsCard: {
    backgroundColor: "#1a1a1a",
    margin: 16,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  quickActionsTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 16,
    letterSpacing: 0.5,
    textShadowColor: "rgba(255, 255, 255, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  quickActionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  quickActionButton: {
    backgroundColor: "#0f0f0f",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#b0b0b0",
    letterSpacing: 0.3,
  },
  inputContainer: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#2a2a2a",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  textInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#2a2a2a",
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    maxHeight: 120,
    fontSize: 16,
    backgroundColor: "#0f0f0f",
    color: "#ffffff",
  },
  sendButton: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 24,
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  sendButtonDisabled: {
    backgroundColor: "#2a2a2a",
  },
  sendButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
});

export default Messages;
