
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
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>Chat with Gadget Garage</Text>
      </View>

      <ScrollView style={styles.messagesContainer}>
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

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
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

      <View style={styles.quickActions}>
        <Text style={styles.quickActionsTitle}>Quick Actions:</Text>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#9b59b6",
    padding: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#ecf0f1",
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  messageContainer: {
    marginBottom: 15,
    maxWidth: "80%",
    padding: 12,
    borderRadius: 18,
  },
  customerMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#3498db",
  },
  businessMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  customerMessageText: {
    color: "#ffffff",
  },
  businessMessageText: {
    color: "#2c3e50",
  },
  timestamp: {
    fontSize: 12,
    marginTop: 5,
  },
  customerTimestamp: {
    color: "#ecf0f1",
    textAlign: "right",
  },
  businessTimestamp: {
    color: "#95a5a6",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#ffffff",
    alignItems: "flex-end",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#3498db",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  sendButtonDisabled: {
    backgroundColor: "#bdc3c7",
  },
  sendButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  quickActions: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  quickActionsTitle: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 10,
  },
  quickActionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickActionButton: {
    backgroundColor: "#ecf0f1",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 2,
    alignItems: "center",
  },
  quickActionText: {
    fontSize: 12,
    color: "#2c3e50",
  },
});

export default Messages;
