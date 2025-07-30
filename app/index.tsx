
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Index: React.FC = () => {
  const router = useRouter();

  const services = [
    { id: 1, title: "PC Building", icon: "🖥️", description: "Custom PC builds tailored to your needs" },
    { id: 2, title: "PC Repair", icon: "🔧", description: "Expert diagnosis and repair services" },
    { id: 3, title: "Parts Installation", icon: "⚡", description: "Professional hardware installation" },
    { id: 4, title: "Upgrades", icon: "📈", description: "Boost your PC's performance" },
  ];

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Gadget Garage</Text>
        <Text style={styles.subtitle}>Professional PC Services</Text>
      </View>

      {/* Services Grid */}
      <View style={styles.servicesContainer}>
        <Text style={styles.sectionTitle}>Our Services</Text>
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <TouchableOpacity 
              key={service.id} 
              style={styles.serviceCard}
              onPress={() => router.push('/services')}
            >
              <Text style={styles.serviceIcon}>{service.icon}</Text>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.primaryButton]}
          onPress={() => router.push('/quote')}
        >
          <Text style={styles.actionButtonText}>Get Free Quote</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.secondaryButton]}
          onPress={() => router.push('/appointment')}
        >
          <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Book Appointment</Text>
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <View style={styles.aboutContainer}>
        <Text style={styles.sectionTitle}>About Gadget Garage</Text>
        <Text style={styles.aboutText}>
          Professional PC building, repair, and upgrade services. 
          We provide expert consultation, quality parts installation, 
          and reliable support for all your computer needs.
        </Text>
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
    backgroundColor: "#2c3e50",
    padding: 50,
    alignItems: "center",
    
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#ecf0f1",
  },
  servicesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    width: "48%",
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 5,
    textAlign: "center",
  },
  serviceDescription: {
    fontSize: 12,
    color: "#7f8c8d",
    textAlign: "center",
  },
  actionsContainer: {
    padding: 20,
    gap: 15,
  },
  actionButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#3498db",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#3498db",
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  secondaryButtonText: {
    color: "#3498db",
  },
  aboutContainer: {
    padding: 20,
    backgroundColor: "#ffffff",
    margin: 20,
    borderRadius: 12,
  },
  aboutText: {
    fontSize: 16,
    color: "#7f8c8d",
    lineHeight: 24,
  },
});

export default Index;
