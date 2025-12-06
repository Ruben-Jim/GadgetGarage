
import BackButton from "@/components/BackButton";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import 'firebase/database';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { ZoomIn, FadeInUp } from "react-native-reanimated";
import { AnimatedHeader, AnimatedText, AnimatedButton, AnimatedCard, AnimatedInputCard } from "../components/AnimatedComponents";
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

  // Format phone number as +1 (###) ###-####
  const formatPhoneNumber = (text: string) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');
    
    // If empty, return empty string
    if (cleaned.length === 0) {
      return '';
    }
    
    // If starts with 1, remove it (we'll add +1 prefix)
    let digits = cleaned.startsWith('1') ? cleaned.slice(1) : cleaned;
    
    // Limit to 10 digits (US phone number)
    digits = digits.slice(0, 10);
    
    // Format based on length
    if (digits.length === 0) {
      return '+1 ';
    } else if (digits.length <= 3) {
      return `+1 (${digits}`;
    } else if (digits.length <= 6) {
      return `+1 (${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setFormData({...formData, phone: formatted});
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.description) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Split name into firstName and lastName for Firestore compatibility
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Prepare quote data for Firestore
      const quoteData = {
        firstName: firstName,
        lastName: lastName,
        email: formData.email.trim(),
        phone: formData.phone.trim() || '',
        deviceType: formData.serviceType || 'Not specified',
        issue: formData.description.trim(),
        urgency: formData.urgency || 'normal',
        createdAt: serverTimestamp(),
        status: "pending"
      };

      console.log("Submitting quote to Firestore...", quoteData);

      // Add document to Firestore
      const docRef = await addDoc(collection(db, "quotes"), quoteData);

      console.log("Quote submitted successfully with ID: ", docRef.id);
      
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
      console.error("Error details:", {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      
      let errorMessage = "There was an error submitting your quote. Please try again or contact us directly.";
      
      // Check for specific Firebase errors
      if (error.code === 'permission-denied') {
        errorMessage = "Permission denied. Please check your Firebase configuration and security rules. Make sure Firestore allows write access.";
      } else if (error.code === 'unavailable') {
        errorMessage = "Service temporarily unavailable. Please check your internet connection and try again.";
      } else if (error.code === 'unauthenticated') {
        errorMessage = "Authentication required. Please check your Firebase API key configuration.";
      } else if (error.code === 'failed-precondition') {
        errorMessage = "Firestore is not enabled or not properly configured. Please check your Firebase project settings.";
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
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
      <AnimatedHeader style={styles.header}>
        <View style={styles.headerContent}>
          <AnimatedText delay={200} style={styles.title}>Get Free Quote</AnimatedText>
          <AnimatedText delay={400} style={styles.subtitle}>Tell us about your project</AnimatedText>
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

      {/* Contact Information Card */}
      <AnimatedInputCard delay={200} style={styles.card}>
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
            placeholderTextColor="#666666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
            placeholder="your.email@example.com"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={handlePhoneChange}
            placeholder="+1 (555) 123-4567"
            placeholderTextColor="#666666"
            keyboardType="phone-pad"
            maxLength={18}
          />
        </View>
      </AnimatedInputCard>

      {/* Service Type Card */}
      <AnimatedInputCard delay={300} style={styles.card}>
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
      </AnimatedInputCard>

      {/* Project Details Card */}
      <AnimatedInputCard delay={400} style={styles.card}>
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
            placeholderTextColor="#666666"
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
      </AnimatedInputCard>

      {/* Submit Button */}
      <AnimatedButton
        delay={600}
        onPress={handleSubmit}
        style={[
          styles.submitButton,
          isSubmitting && styles.submitButtonDisabled
        ]}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#ffffff" size="large" />
        ) : (
          <Text style={styles.submitButtonText}>Submit Quote Request</Text>
        )}
      </AnimatedButton>

      {/* Alternative Contact Card */}
      <AnimatedCard delay={700} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Need Immediate Help?</Text>
          <Text style={styles.cardSubtitle}>Message us directly for quick responses</Text>
        </View>
        <AnimatedButton
          delay={800}
          onPress={() => router.push('/messages')}
          style={styles.messageButton}
        >
          <Text style={styles.messageButtonText}>💬 Message Us Directly</Text>
        </AnimatedButton>
      </AnimatedCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  header: {
    backgroundColor: "#000000",
    paddingTop: 70,
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
  card: {
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
  cardHeader: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 4,
    letterSpacing: 0.5,
    textShadowColor: "rgba(255, 255, 255, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#a0a0a0",
    letterSpacing: 0.3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: "#0f0f0f",
    borderWidth: 2,
    borderColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#ffffff",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  serviceTypeContainer: {
    flexDirection: "row",
  },
  serviceTypeButton: {
    backgroundColor: "#0f0f0f",
    borderWidth: 2,
    borderColor: "#2a2a2a",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  serviceTypeButtonActive: {
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
  },
  serviceTypeText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#b0b0b0",
  },
  serviceTypeTextActive: {
    color: "#000000",
    fontWeight: "900",
  },
  urgencyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  urgencyButton: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    borderWidth: 2,
    borderColor: "#2a2a2a",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  urgencyButtonActive: {
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
  },
  urgencyText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#b0b0b0",
  },
  urgencyTextActive: {
    color: "#000000",
    fontWeight: "900",
  },
  submitButton: {
    backgroundColor: "#ffffff",
    margin: 16,
    padding: 22,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  submitButtonDisabled: {
    backgroundColor: "#2a2a2a",
  },
  submitButtonText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
  },
  messageButton: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  messageButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
});

export default Quote;
