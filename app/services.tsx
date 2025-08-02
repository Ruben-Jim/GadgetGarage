
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackButton from "../components/BackButton";

interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  icon: string;
  color: string;
}

const Services = () => {
  const router = useRouter();

  const services: Service[] = [
    {
      id: 1,
      title: "Custom PC Build",
      description: "Complete custom PC build with premium components",
      price: "$150 - $300",
      duration: "2-4 hours",
      features: ["Component selection", "Assembly", "Testing", "Optimization", "1-year warranty"],
      icon: "🖥️",
      color: "#1e40af"
    },
    {
      id: 2,
      title: "PC Repair & Diagnosis",
      description: "Professional diagnosis and repair of PC issues",
      price: "$75 - $200",
      duration: "1-3 hours",
      features: ["Full diagnosis", "Hardware testing", "Software troubleshooting", "Repair", "Performance check"],
      icon: "🔧",
      color: "#dc2626"
    },
    {
      id: 3,
      title: "Hardware Installation",
      description: "Installation of new components and upgrades",
      price: "$50 - $150",
      duration: "30min - 2 hours",
      features: ["RAM upgrade", "Storage installation", "GPU installation", "Cooling systems", "Cable management"],
      icon: "⚡",
      color: "#059669"
    },
    {
      id: 4,
      title: "System Optimization",
      description: "Software optimization and performance tuning",
      price: "$60 - $120",
      duration: "1-2 hours",
      features: ["OS optimization", "Driver updates", "Software cleanup", "Performance tuning", "Security setup"],
      icon: "📈",
      color: "#7c3aed"
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="light" />
      
      {/* Modern Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Our Services</Text>
          <Text style={styles.subtitle}>Professional PC solutions for every need</Text>
          <View style={styles.headerDecoration} />
        </View>
      </View>

      {/* Custom Back Button */}
      <View style={styles.backButtonContainer}>
        <BackButton 
      // variant = default, minimal, floating
          variant="minimal" 
          color="#059669" 
          title="Home"
        />
      </View>

      {/* Services Container */}
      <View style={styles.servicesContainer}>
        {services.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <View style={[styles.serviceIconContainer, { backgroundColor: service.color + '20' }]}>
                <Text style={styles.serviceIcon}>{service.icon}</Text>
              </View>
              <View style={styles.serviceTitleContainer}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.servicePrice}>{service.price}</Text>
              </View>
            </View>
            
            <Text style={styles.serviceDescription}>{service.description}</Text>
            
            <View style={styles.durationContainer}>
              <Text style={styles.durationLabel}>⏱️ Duration: </Text>
              <Text style={styles.durationText}>{service.duration}</Text>
            </View>

            <View style={styles.featuresContainer}>
              <Text style={styles.featuresTitle}>Includes:</Text>
              <View style={styles.featuresList}>
                {service.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Text style={styles.featureBullet}>✓</Text>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.quoteButton, { backgroundColor: service.color }]}
              onPress={() => router.push('/quote')}
            >
              <Text style={styles.quoteButtonText}>Get Quote</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Consultation Card */}
      <View style={styles.consultationCard}>
        <View style={styles.consultationHeader}>
          <Text style={styles.consultationTitle}>Need Help Choosing?</Text>
          <Text style={styles.consultationSubtitle}>Schedule a free consultation to discuss your needs</Text>
        </View>
        <TouchableOpacity 
          style={styles.appointmentButton}
          onPress={() => router.push('/appointment')}
        >
          <Text style={styles.appointmentButtonText}>Schedule Consultation</Text>
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
    backgroundColor: "#059669",
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
    backgroundColor: "#10b981",
    borderRadius: 2,
  },
  backButtonContainer: {
    position: "absolute",
    top: 50,
    left: 16,
    zIndex: 10,
  },
  servicesContainer: {
    padding: 16,
  },
  serviceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { 
      width: 0, 
      height: 2 
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  serviceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  serviceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  serviceIcon: {
    fontSize: 28,
  },
  serviceTitleContainer: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#059669",
  },
  serviceDescription: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 16,
    lineHeight: 24,
  },
  durationContainer: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  durationLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },
  durationText: {
    fontSize: 16,
    color: "#64748b",
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 12,
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureBullet: {
    fontSize: 16,
    color: "#059669",
    marginRight: 12,
    fontWeight: "bold",
  },
  featureText: {
    fontSize: 15,
    color: "#475569",
    flex: 1,
  },
  quoteButton: {
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
  quoteButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  consultationCard: {
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
  consultationHeader: {
    marginBottom: 20,
  },
  consultationTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  consultationSubtitle: {
    fontSize: 16,
    color: "#64748b",
  },
  appointmentButton: {
    backgroundColor: "#1e40af",
    padding: 18,
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
  appointmentButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default Services;
