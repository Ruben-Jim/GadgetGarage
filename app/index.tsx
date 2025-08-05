
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NotificationPopup from "../components/NotificationPopup";

const Index = () => {
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(true);

  // Show notification on first visit
  useEffect(() => {
    // For web, we'll show the notification every time for now
    // In a real app, you'd use AsyncStorage or similar for persistence
    setShowNotification(true);
  }, []);

  const services = [
    { id: 1, title: "PC Building", icon: "🖥️", description: "Custom PC builds tailored to your needs", color: "#1e40af" },
    { id: 2, title: "PC Repair", icon: "🔧", description: "Expert diagnosis and repair services", color: "#dc2626" },
    { id: 3, title: "Parts Installation", icon: "⚡", description: "Professional hardware installation", color: "#059669" },
    { id: 4, title: "Upgrades", icon: "📈", description: "Boost your PC's performance", color: "#7c3aed" },
  ];

  return (
    <View style={styles.container}>
      {showNotification && (
        <NotificationPopup 
          message="💡 Tip: Swipe from the left edge to go back to previous pages"
          duration={5000}
          onClose={() => setShowNotification(false)}
        />
      )}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <StatusBar style="light" />
      
      {/* Modern Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Gadget Garage</Text>
          <Text style={styles.subtitle}>Professional PC Services</Text>
          <View style={styles.headerDecoration} />
        </View>
      </View>

      {/* Services Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Our Services</Text>
          <Text style={styles.cardSubtitle}>Expert solutions for all your PC needs</Text>
        </View>
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <TouchableOpacity 
              key={service.id} 
              style={styles.serviceCard}
              onPress={() => router.push('/services')}
            >
              <View style={[styles.serviceIconContainer, { backgroundColor: service.color + '20' }]}>
                <Text style={styles.serviceIcon}>{service.icon}</Text>
              </View>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Actions Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Get Started</Text>
          <Text style={styles.cardSubtitle}>Choose how you'd like to work with us</Text>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.primaryActionButton}
            onPress={() => router.push('/quote')}
          >
            <Text style={styles.primaryActionText}>Get Free Quote</Text>
            <Text style={styles.primaryActionSubtext}>Tell us about your project</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryActionButton}
            onPress={() => router.push('/appointment')}
          >
            <Text style={styles.secondaryActionText}>Book Appointment</Text>
            <Text style={styles.secondaryActionSubtext}>Schedule in-person visit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* About Section Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>About Gadget Garage</Text>
          <Text style={styles.cardSubtitle}>Your trusted PC experts</Text>
        </View>
        <View style={styles.aboutContent}>
          <Text style={styles.aboutText}>
            Professional PC building, repair, and upgrade services. 
            We provide expert consultation, quality parts installation, 
            and reliable support for all your computer needs.
          </Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>Expert consultation</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>Quality parts installation</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>Reliable support</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Contact Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Need Help?</Text>
          <Text style={styles.cardSubtitle}>We're here to assist you</Text>
        </View>
        <TouchableOpacity 
          style={styles.contactButton}
          onPress={() => router.push('/messages')}
        >
          <Text style={styles.contactButtonText}>💬 Message Us</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollContainer: {
    flex: 1,
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
    fontSize: 36,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#64748b",
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    width: "48%",
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e2e8f0",
  },
  serviceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  serviceIcon: {
    fontSize: 28,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 6,
    textAlign: "center",
  },
  serviceDescription: {
    fontSize: 13,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 18,
  },
  actionsContainer: {
    gap: 12,
  },
  primaryActionButton: {
    backgroundColor: "#059669",
    borderRadius: 12,
    padding: 20,
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
  primaryActionText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  primaryActionSubtext: {
    fontSize: 14,
    color: "#d1fae5",
  },
  secondaryActionButton: {
    backgroundColor: "#1e40af",
    borderRadius: 12,
    padding: 20,
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
  secondaryActionText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  secondaryActionSubtext: {
    fontSize: 14,
    color: "#dbeafe",
  },
  aboutContent: {
    gap: 16,
  },
  aboutText: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 24,
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
  contactButton: {
    backgroundColor: "#7c3aed",
    borderRadius: 12,
    padding: 18,
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
  contactButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
});

export default Index;
