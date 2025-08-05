
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../FirebaseConfig";

const Appointment = () => {
  const router = useRouter();
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
    if (!selectedDate || !selectedTime || !selectedService) {
      Alert.alert("Missing Information", "Please select a date, time, and service type.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Add document to Firestore
      const docRef = await addDoc(collection(db, "appointments"), {
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
        createdAt: serverTimestamp(),
        status: "pending"
      });

      console.log("Appointment booked with ID: ", docRef.id);
      
      Alert.alert(
        "Appointment Confirmed!",
        `Your appointment is scheduled for ${selectedDate} at ${selectedTime} for ${selectedService}.`,
        [
          { text: "Make Payment", onPress: () => router.push('/payment') },
          { text: "OK", style: "default" }
        ]
      );

      // Reset form after successful booking
      setSelectedDate("");
      setSelectedTime("");
      setSelectedService("");

    } catch (error: any) {
      console.error("Error booking appointment: ", error);
      
      let errorMessage = "Failed to save appointment. Please try again.";
      
      // Check for specific Firebase errors
      if (error.code === 'permission-denied') {
        errorMessage = "Permission denied. Please check your Firebase configuration and security rules.";
      } else if (error.code === 'unavailable') {
        errorMessage = "Service temporarily unavailable. Please check your internet connection and try again.";
      } else if (error.code === 'unauthenticated') {
        errorMessage = "Authentication required. Please check your Firebase configuration.";
      }
      
      Alert.alert("Booking Error", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="light" />
      
      {/* Modern Header with Gradient-like Effect */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Book Your Appointment</Text>
          <Text style={styles.subtitle}>Schedule your professional consultation</Text>
          <View style={styles.headerDecoration} />
        </View>
      </View>

      {/* Service Selection Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>1. Choose Your Service</Text>
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
      </View>

      {/* Date Selection Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>2. Pick Your Date</Text>
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
      </View>

      {/* Time Selection Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>3. Select Time</Text>
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
      </View>

      {/* Appointment Summary Card */}
      {selectedDate && selectedTime && selectedService && (
        <View style={styles.summaryCard}>
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
        </View>
      )}

      {/* Booking Button */}
      <TouchableOpacity 
        style={[
          styles.bookButton,
          (!selectedDate || !selectedTime || !selectedService) && styles.bookButtonDisabled,
          isSubmitting && styles.bookButtonSubmitting
        ]}
        onPress={handleBooking}
        disabled={!selectedDate || !selectedTime || !selectedService || isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#ffffff" size="large" />
        ) : (
          <Text style={styles.bookButtonText}>Confirm Appointment</Text>
        )}
      </TouchableOpacity>

      {/* Information Card */}
      <View style={styles.infoCard}>
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
    backgroundColor: "#1e40af",
    paddingTop: 70,
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
    backgroundColor: "#3b82f6",
    borderRadius: 2,
  },
  card: {
    backgroundColor: "#ffffff",
    margin: 16,
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      web: {
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      },
      default: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }
    })
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
  serviceContainer: {
    flexDirection: "row",
  },
  serviceCard: {
    backgroundColor: "#f8fafc",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginRight: 12,
    minWidth: 140,
    alignItems: "center",
  },
  serviceCardActive: {
    backgroundColor: "#1e40af",
    borderColor: "#1e40af",
  },
  serviceCardText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#475569",
    textAlign: "center",
  },
  serviceCardTextActive: {
    color: "#ffffff",
  },
  dateContainer: {
    flexDirection: "row",
  },
  dateCard: {
    backgroundColor: "#f8fafc",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 80,
    alignItems: "center",
  },
  dateCardActive: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
  },
  dateDay: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 4,
  },
  dateNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 4,
  },
  dateMonth: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },
  dateTextActive: {
    color: "#ffffff",
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeCard: {
    backgroundColor: "#f8fafc",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 16,
    width: "48%",
    marginBottom: 12,
    alignItems: "center",
  },
  timeCardActive: {
    backgroundColor: "#dc2626",
    borderColor: "#dc2626",
  },
  timeCardText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
  },
  timeCardTextActive: {
    color: "#ffffff",
  },
  summaryCard: {
    backgroundColor: "#ffffff",
    margin: 16,
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
    ...Platform.select({
      web: {
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      },
      default: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }
    })
  },
  summaryHeader: {
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
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
    fontWeight: "600",
    color: "#64748b",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
  },
  feeNotice: {
    backgroundColor: "#fef3c7",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f59e0b",
  },
  feeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#92400e",
    textAlign: "center",
  },
  bookButton: {
    backgroundColor: "#059669",
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    ...Platform.select({
      web: {
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      },
      default: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
      }
    })
  },
  bookButtonDisabled: {
    backgroundColor: "#d1d5db",
  },
  bookButtonSubmitting: {
    backgroundColor: "#6b7280",
  },
  bookButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  infoCard: {
    backgroundColor: "#ffffff",
    margin: 16,
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      web: {
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      },
      default: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }
    })
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 16,
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
    color: "#3b82f6",
    marginRight: 12,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
    color: "#475569",
    flex: 1,
    lineHeight: 24,
  },
});

export default Appointment;
