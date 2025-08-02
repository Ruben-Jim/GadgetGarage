
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Messages</Text>
          <Text style={styles.subtitle}>Chat with Gadget Garage</Text>
          <View style={styles.headerDecoration} />
        </View>
      </View>

      {/* Messages Container */}
      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map((message) => (
          <View
            key={message.id}
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
          </View>
        ))}
      </ScrollView>

      {/* Quick Actions Card */}
      <View style={styles.quickActionsCard}>
        <Text style={styles.quickActionsTitle}>Quick Questions</Text>
        <View style={styles.quickActionButtons}>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => setNewMessage("What are your current rates for PC building?")}
          >
            <Text style={styles.quickActionText}>💰 Pricing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => setNewMessage("How long does a typical repair take?")}
          >
            <Text style={styles.quickActionText}>⏰ Timeline</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => setNewMessage("Do you offer warranties on your work?")}
          >
            <Text style={styles.quickActionText}>🛡️ Warranty</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Input Container */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message..."
            placeholderTextColor="#9ca3af"
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[styles.sendButton, !newMessage.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: "#7c3aed",
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#e2e8f0",
    textAlign: "center",
    marginBottom: 20,
  },
  headerDecoration: {
    width: 60,
    height: 4,
    backgroundColor: "#a855f7",
    borderRadius: 2,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: "85%",
    padding: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  customerMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#1e40af",
    borderBottomRightRadius: 6,
  },
  businessMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderBottomLeftRadius: 6,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
  },
  customerMessageText: {
    color: "#ffffff",
  },
  businessMessageText: {
    color: "#1e293b",
  },
  timestamp: {
    fontSize: 12,
    marginTop: 8,
    fontWeight: "500",
  },
  customerTimestamp: {
    color: "#dbeafe",
    textAlign: "right",
  },
  businessTimestamp: {
    color: "#64748b",
  },
  quickActionsCard: {
    backgroundColor: "#ffffff",
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 16,
  },
  quickActionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  quickActionButton: {
    backgroundColor: "#f8fafc",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },
  inputContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  textInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    maxHeight: 120,
    fontSize: 16,
    backgroundColor: "#f8fafc",
  },
  sendButton: {
    backgroundColor: "#1e40af",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sendButtonDisabled: {
    backgroundColor: "#d1d5db",
  },
  sendButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default Messages;
