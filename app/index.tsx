
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import {
  AnimatedButton,
  AnimatedCard,
  AnimatedListItem,
  AnimatedServiceCard
} from "../components/AnimatedComponents";
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
      
      {/* Header Image */}
      <Animated.View
        entering={FadeIn.duration(800).springify()}
        style={styles.headerImageContainer}
      >
        <Image
          source={require("../assets/images/header-img.jpg")}
          style={styles.headerImage}
          contentFit="cover"
        />
        <View style={styles.headerOverlay}>
        </View>
      </Animated.View>

      {/* Services Section */}
      <AnimatedCard delay={200} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Our Services</Text>
          <Text style={styles.cardSubtitle}>Expert solutions for all your PC needs</Text>
        </View>
        <View style={styles.servicesGrid}>
          {services.map((service, index) => (
            <AnimatedServiceCard
              key={service.id}
              index={index}
              onPress={() => router.push('/services')}
              style={styles.serviceCard}
            >
              <View style={[styles.serviceIconContainer, { backgroundColor: service.color + '20' }]}>
                <Text style={styles.serviceIcon}>{service.icon}</Text>
              </View>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
            </AnimatedServiceCard>
          ))}
        </View>
      </AnimatedCard>

      {/* Quick Actions Card */}
      <AnimatedCard delay={400} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Get Started</Text>
          <Text style={styles.cardSubtitle}>Choose how you'd like to work with us</Text>
        </View>
        <View style={styles.actionsContainer}>
          <AnimatedButton
            delay={600}
            onPress={() => router.push('/quote')}
            style={styles.primaryActionButton}
          >
            <Text style={styles.primaryActionText}>Get Free Quote</Text>
            <Text style={styles.primaryActionSubtext}>Tell us about your project</Text>
          </AnimatedButton>
        </View>
      </AnimatedCard>

      {/* About Section Card */}
      <AnimatedCard delay={600} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>About Gadget Garage</Text>
          <Text style={styles.cardSubtitle}>Your trusted PC experts</Text>
        </View>
        <View style={styles.aboutContent}>
          <Animated.Text 
            entering={FadeIn.delay(800).duration(600)}
            style={styles.aboutText}
          >
            Professional PC building, repair, and upgrade services. 
            We provide expert consultation, quality parts installation, 
            and reliable support for all your computer needs.
          </Animated.Text>
          <View style={styles.featuresList}>
            {['Expert consultation', 'Quality parts installation', 'Reliable support'].map((feature, index) => (
              <AnimatedListItem
                key={index}
                index={index}
                style={styles.featureItem}
              >
                <Text style={styles.featureBullet}>✓</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </AnimatedListItem>
            ))}
          </View>
        </View>
      </AnimatedCard>

      {/* Contact Card */}
      <AnimatedCard delay={800} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Need Help?</Text>
          <Text style={styles.cardSubtitle}>We're here to assist you</Text>
        </View>
        <AnimatedButton
          delay={1000}
          onPress={() => router.push('/messages')}
          style={styles.contactButton}
        >
          <Text style={styles.contactButtonText}>💬 Message Us</Text>
        </AnimatedButton>
      </AnimatedCard>
      
      {/* Discreet Admin Access */}
      <TouchableOpacity 
        style={styles.adminAccess}
        onPress={() => router.push('/admin')}
      >
        <Text style={styles.adminAccessText}>⚙️</Text>
      </TouchableOpacity>

      
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  scrollContainer: {
    flex: 1,
  },
  headerImageContainer: {
    width: "100%",
    height: 300,
    position: "relative",
    overflow: "hidden",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 70,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
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
    fontSize: 26,
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
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  serviceCard: {
    backgroundColor: "#0f0f0f",
    borderRadius: 16,
    padding: 20,
    width: "48%",
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 180,
  },
  serviceIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    alignSelf: "center",
  },
  serviceIcon: {
    fontSize: 32,
    textAlign: "center",
    lineHeight: 32,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: 0.5,
    flex: 1,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#a0a0a0",
    textAlign: "center",
    lineHeight: 20,
    flex: 1,
  },
  actionsContainer: {
    gap: 12,
  },
  primaryActionButton: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 22,
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
  primaryActionText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000000",
    marginBottom: 4,
    letterSpacing: 1,
  },
  primaryActionSubtext: {
    fontSize: 14,
    color: "#333333",
    letterSpacing: 0.5,
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
    color: "#b0b0b0",
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureBullet: {
    fontSize: 18,
    color: "#ffffff",
    marginRight: 12,
    fontWeight: "bold",
    textShadowColor: "rgba(255, 255, 255, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  featureText: {
    fontSize: 15,
    color: "#b0b0b0",
    flex: 1,
    letterSpacing: 0.3,
  },
  contactButton: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
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
  contactButtonText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000000",
    letterSpacing: 0.5,
  },
  adminAccess: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  adminAccessText: {
    fontSize: 18,
    color: '#ffffff',
  },
});

export default Index;
