
import BackButton from "@/components/BackButton";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { ZoomIn, FadeInUp } from "react-native-reanimated";
import { AnimatedHeader, AnimatedText, AnimatedButton, AnimatedCard, AnimatedInputCard } from "../components/AnimatedComponents";
import { db } from "../FirebaseConfig";

const Appointment = () => {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    address: "",
  })
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' })
      });
    }
    return dates;
  };

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", 
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const services = [
    "PC Build Consultation",
    "Repair Diagnosis", 
    "Hardware Installation",
    "System Optimization",
    "General Consultation"
  ];

  const handleBooking = async () => {
    if (!data.name || !data.address || !selectedDate || !selectedTime || !selectedService) {
      Alert.alert("Missing Information", "Please fill in your name, address and select a date, time, and service type.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare appointment data for Firestore
      const appointmentData = {
        name: data.name.trim(),
        address: data.address.trim(),
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
        createdAt: serverTimestamp(),
        status: "pending"
      };

      console.log("Submitting appointment to Firestore...", appointmentData);

      // Add document to Firestore
      const docRef = await addDoc(collection(db, "appointments"), appointmentData);

      console.log("Appointment booked successfully with ID: ", docRef.id);
      
      Alert.alert(
        "Appointment Confirmed!",
        `Your appointment is scheduled for ${selectedDate} at ${selectedTime} for ${selectedService}.`,
        [
          { text: "Make Payment", onPress: () => router.push('/payment') },
          { text: "OK", style: "default" }
        ]
      );

      // Reset form after successful booking
      setData({
        name: "",
        address: "",
      });
      setSelectedDate("");
      setSelectedTime("");
      setSelectedService("");

    } catch (error: any) {
      console.error("Error booking appointment: ", error);
      console.error("Error details:", {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      
      let errorMessage = "Failed to save appointment. Please try again.";
      
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
      
      Alert.alert("Booking Error", errorMessage);
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
          <AnimatedText delay={200} style={styles.title}>Book Appointment</AnimatedText>
          <AnimatedText delay={400} style={styles.subtitle}>Schedule your professional consultation</AnimatedText>
          <Animated.View 
            entering={ZoomIn.delay(600).springify()}
            style={styles.headerDecoration} 
          />
        </View>
      </AnimatedHeader>

      {/* Custom Back Button */}
      <View style={styles.backButtonContainer}>
        <BackButton
        // variant = default, minimal, flating
        variant="floating"
        color="#ffffff"
        title=""
        />

      </View>

      {/* Name card */}
      <AnimatedInputCard delay={200} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>1. Contact Information</Text>
          <Text style={styles.cardSubtitle}>Let us know how to reach you</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            value={data.name}
            onChangeText={(text) => setData({...data, name: text})}
            placeholder="Your full name"
            placeholderTextColor="#666666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address *</Text>
          <TextInput
            style={styles.input}
            value={data.address}
            onChangeText={(text) => setData({...data, address: text})}
            placeholder="1234 E power ave"
            placeholderTextColor="#666666"
            // keyboardType="home-address"
            autoCapitalize="none"
          />
        </View>
        
      </AnimatedInputCard>

      {/* Service Selection Card */}
      <AnimatedInputCard delay={300} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>2. Choose Your Service</Text>
          <Text style={styles.cardSubtitle}>What can we help you with today?</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.serviceContainer}>
          {services.map((service) => (
            <TouchableOpacity
              key={service}
              style={[
                styles.serviceCard,
                selectedService === service && styles.serviceCardActive
              ]}
              onPress={() => setSelectedService(service)}
            >
              <Text style={[
                styles.serviceCardText,
                selectedService === service && styles.serviceCardTextActive
              ]}>
                {service}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </AnimatedInputCard>

      {/* Date Selection Card */}
      <AnimatedInputCard delay={400} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>3. Pick Your Date</Text>
          <Text style={styles.cardSubtitle}>Available dates for the next 2 weeks</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateContainer}>
          {generateDates().map((dateObj) => (
            <TouchableOpacity
              key={dateObj.date}
              style={[
                styles.dateCard,
                selectedDate === dateObj.date && styles.dateCardActive
              ]}
              onPress={() => setSelectedDate(dateObj.date)}
            >
              <Text style={[
                styles.dateDay,
                selectedDate === dateObj.date && styles.dateTextActive
              ]}>
                {dateObj.day}
              </Text>
              <Text style={[
                styles.dateNumber,
                selectedDate === dateObj.date && styles.dateTextActive
              ]}>
                {dateObj.dayNum}
              </Text>
              <Text style={[
                styles.dateMonth,
                selectedDate === dateObj.date && styles.dateTextActive
              ]}>
                {dateObj.month}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </AnimatedInputCard>

      {/* Time Selection Card */}
      <AnimatedInputCard delay={500} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>4. Select Time</Text>
          <Text style={styles.cardSubtitle}>Choose your preferred time slot</Text>
        </View>
        <View style={styles.timeGrid}>
          {timeSlots.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeCard,
                selectedTime === time && styles.timeCardActive
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text style={[
                styles.timeCardText,
                selectedTime === time && styles.timeCardTextActive
              ]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </AnimatedInputCard>

      {/* Appointment Summary Card */}
      {selectedDate && selectedTime && selectedService && (
        <AnimatedCard delay={600} style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>📅 Appointment Summary</Text>
          </View>
          <View style={styles.summaryContent}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service:</Text>
              <Text style={styles.summaryValue}>{selectedService}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Date:</Text>
              <Text style={styles.summaryValue}>{selectedDate}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Time:</Text>
              <Text style={styles.summaryValue}>{selectedTime}</Text>
            </View>
          </View>
          <View style={styles.feeNotice}>
            <Text style={styles.feeText}>💳 $25 consultation fee required</Text>
          </View>
        </AnimatedCard>
      )}

      {/* Booking Button */}
      <AnimatedButton
        delay={700}
        onPress={handleBooking}
        style={[
          styles.bookButton,
          (!selectedDate || !selectedTime || !selectedService) && styles.bookButtonDisabled,
          isSubmitting && styles.bookButtonSubmitting
        ]}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#ffffff" size="large" />
        ) : (
          <Text style={styles.bookButtonText}>Confirm Appointment</Text>
        )}
      </AnimatedButton>

      {/* Information Card */}
      <AnimatedCard delay={800} style={styles.infoCard}>
        <Text style={styles.infoTitle}>What to Expect</Text>
        <View style={styles.infoList}>
          <View style={styles.infoItem}>
            <Text style={styles.infoBullet}>•</Text>
            <Text style={styles.infoText}>Professional consultation at your location</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoBullet}>•</Text>
            <Text style={styles.infoText}>Detailed assessment of your needs</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoBullet}>•</Text>
            <Text style={styles.infoText}>Transparent pricing discussion</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoBullet}>•</Text>
            <Text style={styles.infoText}>Same-day service when possible</Text>
          </View>
        </View>
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
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  input:{
    backgroundColor: "#0f0f0f",
    borderWidth: 2,
    borderColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#ffffff",
  },
  serviceContainer: {
    flexDirection: "row",
  },
  serviceCard: {
    backgroundColor: "#0f0f0f",
    borderWidth: 2,
    borderColor: "#2a2a2a",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginRight: 12,
    minWidth: 140,
    alignItems: "center",
  },
  serviceCardActive: {
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
  },
  serviceCardText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#b0b0b0",
    textAlign: "center",
  },
  serviceCardTextActive: {
    color: "#000000",
    fontWeight: "900",
  },
  dateContainer: {
    flexDirection: "row",
  },
  dateCard: {
    backgroundColor: "#0f0f0f",
    borderWidth: 2,
    borderColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 80,
    alignItems: "center",
  },
  dateCardActive: {
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
  },
  dateDay: {
    fontSize: 14,
    fontWeight: "700",
    color: "#888888",
    marginBottom: 4,
  },
  dateNumber: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 4,
  },
  dateMonth: {
    fontSize: 14,
    fontWeight: "700",
    color: "#888888",
  },
  dateTextActive: {
    color: "#000000",
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeCard: {
    backgroundColor: "#0f0f0f",
    borderWidth: 2,
    borderColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
    width: "48%",
    marginBottom: 12,
    alignItems: "center",
  },
  timeCardActive: {
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
  },
  timeCardText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#b0b0b0",
  },
  timeCardTextActive: {
    color: "#000000",
    fontWeight: "900",
  },
  summaryCard: {
    backgroundColor: "#1a1a1a",
    margin: 16,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderLeftWidth: 4,
    borderLeftColor: "#ffffff",
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  summaryHeader: {
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: 0.5,
    textShadowColor: "rgba(255, 255, 255, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  summaryContent: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#a0a0a0",
    letterSpacing: 0.3,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "900",
    color: "#ffffff",
  },
  feeNotice: {
    backgroundColor: "#2a2a2a",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffffff",
  },
  feeText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 0.3,
  },
  bookButton: {
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
  bookButtonDisabled: {
    backgroundColor: "#2a2a2a",
  },
  bookButtonSubmitting: {
    backgroundColor: "#1a1a1a",
  },
  bookButtonText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
  },
  infoCard: {
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
  infoTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 16,
    letterSpacing: 0.5,
    textShadowColor: "rgba(255, 255, 255, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  infoBullet: {
    fontSize: 18,
    color: "#ffffff",
    marginRight: 12,
    fontWeight: "bold",
    textShadowColor: "rgba(255, 255, 255, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  infoText: {
    fontSize: 16,
    color: "#b0b0b0",
    flex: 1,
    lineHeight: 24,
    letterSpacing: 0.3,
  },
});

export default Appointment;
