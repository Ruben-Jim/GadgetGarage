
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import 'firebase/database';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from "../FirebaseConfig";

const Quote = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    description: "",
    urgency: "normal",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceTypes = [
    "Custom PC Build",
    "PC Repair",
    "Hardware Installation",
    "System Optimization",
    "Other"
  ];

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.description) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Add document to Firestore
      const docRef = await addDoc(collection(db, "quotes"), {
        ...formData,
        createdAt: serverTimestamp(),
        status: "pending"
      });

      console.log("Quote submitted with ID: ", docRef.id);
      
      Alert.alert(
        "Quote Submitted Successfully!",
        "Thank you! We'll review your request and send you a free quote within 24 hours. You can also message us for any questions.",
        [
          { text: "Message Us", onPress: () => router.push('/messages') },
          { text: "OK", style: "default" }
        ]
      );

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        description: "",
        urgency: "normal",
      });

    } catch (error: any) {
      console.error("Error submitting quote: ", error);
      
      let errorMessage = "There was an error submitting your quote. Please try again or contact us directly.";
      
      // Check for specific Firebase errors
      if (error.code === 'permission-denied') {
        errorMessage = "Permission denied. Please check your Firebase configuration and security rules.";
      } else if (error.code === 'unavailable') {
        errorMessage = "Service temporarily unavailable. Please check your internet connection and try again.";
      } else if (error.code === 'unauthenticated') {
        errorMessage = "Authentication required. Please check your Firebase configuration.";
      }
      
      Alert.alert(
        "Submission Error",
        errorMessage,
        [
          { text: "Message Us", onPress: () => router.push('/messages') },
          { text: "OK", style: "default" }
        ]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="light" />
      
      {/* Modern Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Get Free Quote</Text>
          <Text style={styles.subtitle}>Tell us about your project</Text>
          <View style={styles.headerDecoration} />
        </View>
      </View>

      {/* Contact Information Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>1. Contact Information</Text>
          <Text style={styles.cardSubtitle}>Let us know how to reach you</Text>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({...formData, name: text})}
            placeholder="Your full name"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
            placeholder="your.email@example.com"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(text) => setFormData({...formData, phone: text})}
            placeholder="(555) 123-4567"
            placeholderTextColor="#9ca3af"
            keyboardType="phone-pad"
          />
        </View>
      </View>

      {/* Service Type Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>2. Service Type</Text>
          <Text style={styles.cardSubtitle}>What service do you need?</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.serviceTypeContainer}>
          {serviceTypes.map((service) => (
            <TouchableOpacity
              key={service}
              style={[
                styles.serviceTypeButton,
                formData.serviceType === service && styles.serviceTypeButtonActive
              ]}
              onPress={() => setFormData({...formData, serviceType: service})}
            >
              <Text style={[
                styles.serviceTypeText,
                formData.serviceType === service && styles.serviceTypeTextActive
              ]}>
                {service}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Project Details Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>3. Project Details</Text>
          <Text style={styles.cardSubtitle}>Tell us about your requirements</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Project Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => setFormData({...formData, description: text})}
            placeholder="Describe your project, current issues, or requirements..."
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Urgency Level</Text>
          <View style={styles.urgencyContainer}>
            {["low", "normal", "high", "urgent"].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.urgencyButton,
                  formData.urgency === level && styles.urgencyButtonActive
                ]}
                onPress={() => setFormData({...formData, urgency: level})}
              >
                <Text style={[
                  styles.urgencyText,
                  formData.urgency === level && styles.urgencyTextActive
                ]}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity 
        style={[
          styles.submitButton,
          isSubmitting && styles.submitButtonDisabled
        ]} 
        onPress={handleSubmit} 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#ffffff" size="large" />
        ) : (
          <Text style={styles.submitButtonText}>Submit Quote Request</Text>
        )}
      </TouchableOpacity>

      {/* Alternative Contact Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Need Immediate Help?</Text>
          <Text style={styles.cardSubtitle}>Message us directly for quick responses</Text>
        </View>
        <TouchableOpacity 
          style={styles.messageButton}
          onPress={() => router.push('/messages')}
        >
          <Text style={styles.messageButtonText}>💬 Message Us Directly</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: "#3498db",
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
    backgroundColor: "#60a5fa",
    borderRadius: 2,
  },
  card: {
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
  cardHeader: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#64748b",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f8fafc",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  serviceTypeContainer: {
    flexDirection: "row",
  },
  serviceTypeButton: {
    backgroundColor: "#f8fafc",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  serviceTypeButtonActive: {
    backgroundColor: "#3498db",
    borderColor: "#3498db",
  },
  serviceTypeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },
  serviceTypeTextActive: {
    color: "#ffffff",
  },
  urgencyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  urgencyButton: {
    flex: 1,
    backgroundColor: "#f8fafc",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  urgencyButtonActive: {
    backgroundColor: "#dc2626",
    borderColor: "#dc2626",
  },
  urgencyText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },
  urgencyTextActive: {
    color: "#ffffff",
  },
  submitButton: {
    backgroundColor: "#059669",
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonDisabled: {
    backgroundColor: "#6b7280",
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  messageButton: {
    backgroundColor: "#7c3aed",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default Quote;
