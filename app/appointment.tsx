
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Appointment = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");

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

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedService) {
      Alert.alert("Missing Information", "Please select a date, time, and service type.");
      return;
    }

    Alert.alert(
      "Appointment Confirmed!",
      `Your appointment is scheduled for ${selectedDate} at ${selectedTime} for ${selectedService}.`,
      [
        { text: "Make Payment", onPress: () => router.push('/payment') },
        { text: "OK", style: "default" }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Book Appointment</Text>
        <Text style={styles.subtitle}>Schedule your in-person visit</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Service</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {services.map((service) => (
            <TouchableOpacity
              key={service}
              style={[
                styles.serviceButton,
                selectedService === service && styles.serviceButtonActive
              ]}
              onPress={() => setSelectedService(service)}
            >
              <Text style={[
                styles.serviceButtonText,
                selectedService === service && styles.serviceButtonTextActive
              ]}>
                {service}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {generateDates().map((dateObj) => (
            <TouchableOpacity
              key={dateObj.date}
              style={[
                styles.dateButton,
                selectedDate === dateObj.date && styles.dateButtonActive
              ]}
              onPress={() => setSelectedDate(dateObj.date)}
            >
              <Text style={[
                styles.dayText,
                selectedDate === dateObj.date && styles.dateTextActive
              ]}>
                {dateObj.day}
              </Text>
              <Text style={[
                styles.dayNumText,
                selectedDate === dateObj.date && styles.dateTextActive
              ]}>
                {dateObj.dayNum}
              </Text>
              <Text style={[
                styles.monthText,
                selectedDate === dateObj.date && styles.dateTextActive
              ]}>
                {dateObj.month}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Time</Text>
        <View style={styles.timeGrid}>
          {timeSlots.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeButton,
                selectedTime === time && styles.timeButtonActive
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text style={[
                styles.timeButtonText,
                selectedTime === time && styles.timeButtonTextActive
              ]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {selectedDate && selectedTime && selectedService && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Appointment Summary</Text>
          <Text style={styles.summaryText}>Service: {selectedService}</Text>
          <Text style={styles.summaryText}>Date: {selectedDate}</Text>
          <Text style={styles.summaryText}>Time: {selectedTime}</Text>
          <Text style={styles.noteText}>
            Note: A $25 consultation fee is required to secure your appointment
          </Text>
        </View>
      )}

      <TouchableOpacity 
        style={[
          styles.bookButton,
          (!selectedDate || !selectedTime || !selectedService) && styles.bookButtonDisabled
        ]}
        onPress={handleBooking}
        disabled={!selectedDate || !selectedTime || !selectedService}
      >
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>What to Expect</Text>
        <Text style={styles.infoText}>• Professional consultation at your location</Text>
        <Text style={styles.infoText}>• Detailed assessment of your needs</Text>
        <Text style={styles.infoText}>• Transparent pricing discussion</Text>
        <Text style={styles.infoText}>• Same-day service when possible</Text>
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
    backgroundColor: "#27ae60",
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
  },
  serviceButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 10,
    minWidth: 120,
    alignItems: "center",
  },
  serviceButtonActive: {
    backgroundColor: "#27ae60",
    borderColor: "#27ae60",
  },
  serviceButtonText: {
    fontSize: 14,
    color: "#7f8c8d",
    textAlign: "center",
  },
  serviceButtonTextActive: {
    color: "#ffffff",
  },
  dateButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 15,
    marginRight: 10,
    minWidth: 70,
    alignItems: "center",
  },
  dateButtonActive: {
    backgroundColor: "#3498db",
    borderColor: "#3498db",
  },
  dayText: {
    fontSize: 12,
    color: "#7f8c8d",
    marginBottom: 2,
  },
  dayNumText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 2,
  },
  monthText: {
    fontSize: 12,
    color: "#7f8c8d",
  },
  dateTextActive: {
    color: "#ffffff",
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    width: "48%",
    marginBottom: 10,
    alignItems: "center",
  },
  timeButtonActive: {
    backgroundColor: "#e74c3c",
    borderColor: "#e74c3c",
  },
  timeButtonText: {
    fontSize: 16,
    color: "#7f8c8d",
  },
  timeButtonTextActive: {
    color: "#ffffff",
  },
  summaryContainer: {
    backgroundColor: "#ffffff",
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#3498db",
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    color: "#2c3e50",
    marginBottom: 5,
  },
  noteText: {
    fontSize: 14,
    color: "#e74c3c",
    marginTop: 10,
    fontStyle: "italic",
  },
  bookButton: {
    backgroundColor: "#27ae60",
    margin: 20,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  bookButtonDisabled: {
    backgroundColor: "#bdc3c7",
  },
  bookButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  infoContainer: {
    backgroundColor: "#ffffff",
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 5,
  },
});

export default Appointment;
