
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import 'firebase/database';
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


const Quote = () => {
  const router = useRouter();
  
  {/* Old Quote form */}
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    description: "",
    urgency: "normal",
    
  });

  {/* New Quote form */}

  
  
  const serviceTypes = [
    "Custom PC Build",
    "PC Repair",
    "Hardware Installation",
    "System Optimization",
    "Other"
  ];

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.description) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }
    
    Alert.alert(
      "Quote Submitted",
      "Thank you! We'll review your request and send you a free quote within 24 hours. You can also message us for any questions.",
      [
        { text: "Message Us", onPress: () => router.push('/messages') },
        { text: "OK", style: "default" }
      ]
    );
  };



  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Get Free Quote</Text>
        <Text style={styles.subtitle}>Tell us about your project</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({...formData, name: text})}
            placeholder="Your full name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
            placeholder="your.email@example.com"
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
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Service Type</Text>
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

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Project Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => setFormData({...formData, description: text})}
            placeholder="Describe your project, current issues, or requirements..."
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Urgency</Text>
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

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Quote Request</Text>
        </TouchableOpacity>

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
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#3498db",
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
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  serviceTypeContainer: {
    flexDirection: "row",
  },
  serviceTypeButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  serviceTypeButtonActive: {
    backgroundColor: "#3498db",
    borderColor: "#3498db",
  },
  serviceTypeText: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  serviceTypeTextActive: {
    color: "#ffffff",
  },
  urgencyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  urgencyButton: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 2,
    alignItems: "center",
  },
  urgencyButtonActive: {
    backgroundColor: "#e74c3c",
    borderColor: "#e74c3c",
  },
  urgencyText: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  urgencyTextActive: {
    color: "#ffffff",
  },
  submitButton: {
    backgroundColor: "#27ae60",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  messageButton: {
    backgroundColor: "#9b59b6",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },
  messageButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Quote;
