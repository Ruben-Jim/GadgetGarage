
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";



interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
}

const Services: React.FC = () => {
  const router = useRouter();

  const services: Service[] = [
    {
      id: 1,
      title: "Custom PC Build",
      description: "Complete custom PC build with premium components",
      price: "$150 - $300",
      duration: "2-4 hours",
      features: ["Component selection", "Assembly", "Testing", "Optimization", "1-year warranty"]
    },
    {
      id: 2,
      title: "PC Repair & Diagnosis",
      description: "Professional diagnosis and repair of PC issues",
      price: "$75 - $200",
      duration: "1-3 hours",
      features: ["Full diagnosis", "Hardware testing", "Software troubleshooting", "Repair", "Performance check"]
    },
    {
      id: 3,
      title: "Hardware Installation",
      description: "Installation of new components and upgrades",
      price: "$50 - $150",
      duration: "30min - 2 hours",
      features: ["RAM upgrade", "Storage installation", "GPU installation", "Cooling systems", "Cable management"]
    },
    {
      id: 4,
      title: "System Optimization",
      description: "Software optimization and performance tuning",
      price: "$60 - $120",
      duration: "1-2 hours",
      features: ["OS optimization", "Driver updates", "Software cleanup", "Performance tuning", "Security setup"]
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.subtitle}>Professional PC solutions for every need</Text>
      </View>

      <View style={styles.servicesContainer}>
        {services.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.servicePrice}>{service.price}</Text>
            </View>
            
            <Text style={styles.serviceDescription}>{service.description}</Text>
            
            <View style={styles.durationContainer}>
              <Text style={styles.durationLabel}>Duration: </Text>
              <Text style={styles.durationText}>{service.duration}</Text>
            </View>

            <View style={styles.featuresContainer}>
              <Text style={styles.featuresTitle}>Includes:</Text>
              {service.features.map((feature, index) => (
                <Text key={index} style={styles.featureItem}>• {feature}</Text>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.quoteButton}
              onPress={() => router.push('/quote')}
            >
              <Text style={styles.quoteButtonText}>Get Quote</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.appointmentButton}
        onPress={() => router.push('/appointment')}
      >
        <Text style={styles.appointmentButtonText}>Schedule Consultation</Text>
      </TouchableOpacity>
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
    padding: 20,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#ecf0f1",
    textAlign: "center",
  },
  servicesContainer: {
    padding: 20,
  },
  serviceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    flex: 1,
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#27ae60",
  },
  serviceDescription: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 15,
    lineHeight: 22,
  },
  durationContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  durationLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  durationText: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  featureItem: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 4,
  },
  quoteButton: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  quoteButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  appointmentButton: {
    backgroundColor: "#27ae60",
    margin: 20,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  appointmentButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Services;
