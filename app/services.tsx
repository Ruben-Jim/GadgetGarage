
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { ZoomIn, FadeInDown } from "react-native-reanimated";
import BackButton from "../components/BackButton";
import { 
  AnimatedCard, 
  AnimatedButton, 
  AnimatedHeader,
  AnimatedText,
  AnimatedListItem
} from "../components/AnimatedComponents";

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
      price: "$100 - $200",
      duration: "2-4 hours",
      features: ["Component selection", "Assembly", "Testing", "Optimization", "1-year warranty"],
      icon: "🖥️",
      color: "#059669"
    },
    {
      id: 2,
      title: "PC Repair & Diagnosis",
      description: "Professional diagnosis and repair of PC issues",
      price: "$50 - $100",
      duration: "1-3 hours",
      features: ["Full diagnosis", "Hardware testing", "Software troubleshooting", "Repair", "Performance check"],
      icon: "🔧",
      color: "#059669"
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
      price: "$50 - $75",
      duration: "1-2 hours",
      features: ["OS optimization", "Driver updates", "Software cleanup", "Performance tuning", "Security setup"],
      icon: "📈",
      color: "#059669"
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="light" />
      
      {/* Modern Header */}
      <AnimatedHeader style={styles.header}>
        <View style={styles.headerContent}>
          <AnimatedText delay={200} style={styles.title}>Our Services</AnimatedText>
          <AnimatedText delay={400} style={styles.subtitle}>Professional PC solutions for every need</AnimatedText>
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

      {/* Services Container */}
      <View style={styles.servicesContainer}>
        {services.map((service, index) => (
          <AnimatedCard key={service.id} delay={index * 100} style={styles.serviceCard}>
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
                {service.features.map((feature, featureIndex) => (
                  <AnimatedListItem key={featureIndex} index={featureIndex} style={styles.featureItem}>
                    <Text style={styles.featureBullet}>✓</Text>
                    <Text style={styles.featureText}>{feature}</Text>
                  </AnimatedListItem>
                ))}
              </View>
            </View>

            <AnimatedButton
              delay={index * 100 + 200}
              onPress={() => router.push('/quote')}
              style={[styles.quoteButton, { backgroundColor: service.color }]}
            >
              <Text style={styles.quoteButtonText}>Get Quote</Text>
            </AnimatedButton>
          </AnimatedCard>
        ))}
      </View>

      {/* Consultation Card */}
      <AnimatedCard delay={500} style={styles.consultationCard}>
        <View style={styles.consultationHeader}>
          <Text style={styles.consultationTitle}>Need Help Choosing?</Text>
          <Text style={styles.consultationSubtitle}>Schedule a free consultation to discuss your needs</Text>
        </View>
        <AnimatedButton
          delay={700}
          onPress={() => router.push('/appointment')}
          style={styles.appointmentButton}
        >
          <Text style={styles.appointmentButtonText}>Schedule Consultation</Text>
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
  servicesContainer: {
    padding: 16,
  },
  serviceCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    shadowColor: "#ffffff",
    shadowOffset: { 
      width: 0, 
      height: 6 
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
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
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 4,
    letterSpacing: 0.5,
    textShadowColor: "rgba(255, 255, 255, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  servicePrice: {
    fontSize: 20,
    fontWeight: "900",
    color: "#ffffff",
    textShadowColor: "rgba(255, 255, 255, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  serviceDescription: {
    fontSize: 16,
    color: "#a0a0a0",
    marginBottom: 16,
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  durationContainer: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  durationLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.3,
  },
  durationText: {
    fontSize: 16,
    color: "#a0a0a0",
    letterSpacing: 0.3,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 12,
    letterSpacing: 0.5,
    textShadowColor: "rgba(255, 255, 255, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
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
  quoteButton: {
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
  quoteButtonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  consultationCard: {
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
  consultationHeader: {
    marginBottom: 20,
  },
  consultationTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 4,
    letterSpacing: 0.5,
    textShadowColor: "rgba(255, 255, 255, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  consultationSubtitle: {
    fontSize: 16,
    color: "#a0a0a0",
    letterSpacing: 0.3,
  },
  appointmentButton: {
    backgroundColor: "#ffffff",
    padding: 20,
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
  appointmentButtonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
});

export default Services;
