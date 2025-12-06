
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { ZoomIn, FadeInUp } from "react-native-reanimated";
import { AnimatedHeader, AnimatedText, AnimatedButton, AnimatedCard, AnimatedInputCard } from "../components/AnimatedComponents";

const Payment = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: "💳", color: "#1e40af" },
    { id: "venmo", name: "Venmo", icon: "📱", color: "#059669" },
    { id: "cashapp", name: "Cash App", icon: "💰", color: "#059669" },
    { id: "zelle", name: "Zelle", icon: "🏦", color: "#7c3aed" },
    { id: "paypal", name: "PayPal", icon: "🅿️", color: "#1e40af" },
    { id: "cash", name: "Cash", icon: "💵", color: "#059669" }
  ];

  const quickAmounts = ["25", "50", "100", "150", "200", "300"];

  const handlePayment = () => {
    if (!paymentMethod || !amount) {
      Alert.alert("Missing Information", "Please select a payment method and enter an amount.");
      return;
    }

    const paymentMethodName = paymentMethods.find(method => method.id === paymentMethod)?.name;
    
    Alert.alert(
      "Payment Confirmed",
      `Payment of $${amount} via ${paymentMethodName} has been processed successfully!`,
      [
        { text: "View Receipt", onPress: () => {} },
        { text: "OK", style: "default" }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="light" />
      
      {/* Modern Header */}
      <AnimatedHeader style={styles.header}>
        <View style={styles.headerContent}>
          <AnimatedText delay={200} style={styles.title}>Payment</AnimatedText>
          <AnimatedText delay={400} style={styles.subtitle}>Secure payment processing</AnimatedText>
          <Animated.View 
            entering={ZoomIn.delay(600).springify()}
            style={styles.headerDecoration} 
          />
        </View>
      </AnimatedHeader>

      {/* Amount Card */}
      <AnimatedInputCard delay={200} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Payment Amount</Text>
          <Text style={styles.cardSubtitle}>Enter the amount you'd like to pay</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.dollarSign}>$</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            placeholderTextColor="#666666"
            keyboardType="numeric"
          />
        </View>
        
        <Text style={styles.quickAmountLabel}>Quick amounts:</Text>
        <View style={styles.quickAmountsContainer}>
          {quickAmounts.map((quickAmount) => (
            <TouchableOpacity
              key={quickAmount}
              style={[
                styles.quickAmountButton,
                amount === quickAmount && styles.quickAmountButtonActive
              ]}
              onPress={() => setAmount(quickAmount)}
            >
              <Text style={[
                styles.quickAmountText,
                amount === quickAmount && styles.quickAmountTextActive
              ]}>
                ${quickAmount}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </AnimatedInputCard>

      {/* Description Card */}
      <AnimatedInputCard delay={300} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Payment Description</Text>
          <Text style={styles.cardSubtitle}>Optional details about this payment</Text>
        </View>
        <TextInput
          style={styles.descriptionInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Service description (optional)"
          placeholderTextColor="#666666"
          multiline
        />
      </AnimatedInputCard>

      {/* Payment Method Card */}
      <AnimatedInputCard delay={400} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Payment Method</Text>
          <Text style={styles.cardSubtitle}>Choose your preferred payment option</Text>
        </View>
        <View style={styles.paymentMethodsContainer}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethodButton,
                paymentMethod === method.id && styles.paymentMethodButtonActive
              ]}
              onPress={() => setPaymentMethod(method.id)}
            >
              <View style={[styles.paymentMethodIconContainer, { backgroundColor: method.color + '20' }]}>
                <Text style={styles.paymentMethodIcon}>{method.icon}</Text>
              </View>
              <Text style={[
                styles.paymentMethodText,
                paymentMethod === method.id && styles.paymentMethodTextActive
              ]}>
                {method.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </AnimatedInputCard>

      {/* Card Information Card */}
      {paymentMethod === "card" && (
        <AnimatedInputCard delay={500} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Card Information</Text>
            <Text style={styles.cardSubtitle}>Enter your card details securely</Text>
          </View>
          <View style={styles.cardForm}>
            <TextInput
              style={styles.cardInput}
              placeholder="Card Number"
              placeholderTextColor="#666666"
              keyboardType="numeric"
            />
            <View style={styles.cardRow}>
              <TextInput
                style={[styles.cardInput, styles.cardInputSmall]}
                placeholder="MM/YY"
                placeholderTextColor="#666666"
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.cardInput, styles.cardInputSmall]}
                placeholder="CVV"
                placeholderTextColor="#666666"
                keyboardType="numeric"
              />
            </View>
            <TextInput
              style={styles.cardInput}
              placeholder="Cardholder Name"
              placeholderTextColor="#666666"
            />
          </View>
        </AnimatedInputCard>
      )}

      {/* Payment Summary Card */}
      {amount && paymentMethod && (
        <AnimatedCard delay={600} style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>📋 Payment Summary</Text>
          </View>
          <View style={styles.summaryContent}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Amount:</Text>
              <Text style={styles.summaryValue}>${amount}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Method:</Text>
              <Text style={styles.summaryValue}>
                {paymentMethods.find(method => method.id === paymentMethod)?.name}
              </Text>
            </View>
            {description && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Description:</Text>
                <Text style={styles.summaryValue}>{description}</Text>
              </View>
            )}
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Processing Fee:</Text>
              <Text style={styles.summaryValue}>$0.00</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>${amount}</Text>
            </View>
          </View>
        </AnimatedCard>
      )}

      {/* Payment Button */}
      <AnimatedButton
        delay={700}
        onPress={handlePayment}
        style={[
          styles.payButton,
          (!paymentMethod || !amount) && styles.payButtonDisabled
        ]}
      >
        <Text style={styles.payButtonText}>
          Process Payment ${amount || "0.00"}
        </Text>
      </AnimatedButton>

      {/* Security Card */}
      <AnimatedCard delay={800} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>🔒 Secure Payment</Text>
          <Text style={styles.cardSubtitle}>Your data is protected with industry-standard security</Text>
        </View>
        <Text style={styles.securityText}>
          Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
        </Text>
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
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f0f0f",
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dollarSign: {
    fontSize: 28,
    fontWeight: "900",
    color: "#ffffff",
    marginRight: 8,
    textShadowColor: "rgba(255, 255, 255, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 28,
    fontWeight: "900",
    color: "#ffffff",
    paddingVertical: 16,
  },
  quickAmountLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#a0a0a0",
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  quickAmountsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },
  quickAmountButton: {
    backgroundColor: "#0f0f0f",
    borderWidth: 2,
    borderColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
    width: "30%",
    alignItems: "center",
  },
  quickAmountButtonActive: {
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
  },
  quickAmountText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#b0b0b0",
  },
  quickAmountTextActive: {
    color: "#000000",
    fontWeight: "900",
  },
  descriptionInput: {
    backgroundColor: "#0f0f0f",
    borderWidth: 2,
    borderColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    height: 100,
    textAlignVertical: "top",
    color: "#ffffff",
  },
  paymentMethodsContainer: {
    gap: 12,
  },
  paymentMethodButton: {
    backgroundColor: "#0f0f0f",
    borderWidth: 2,
    borderColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  paymentMethodButtonActive: {
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
  },
  paymentMethodIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  paymentMethodIcon: {
    fontSize: 24,
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#b0b0b0",
    flex: 1,
  },
  paymentMethodTextActive: {
    color: "#000000",
    fontWeight: "900",
  },
  cardForm: {
    gap: 16,
  },
  cardInput: {
    backgroundColor: "#0f0f0f",
    borderWidth: 2,
    borderColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#ffffff",
  },
  cardRow: {
    flexDirection: "row",
    gap: 16,
  },
  cardInputSmall: {
    flex: 1,
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
    gap: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#2a2a2a",
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#ffffff",
    textShadowColor: "rgba(255, 255, 255, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  payButton: {
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
  payButtonDisabled: {
    backgroundColor: "#2a2a2a",
  },
  payButtonText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
  },
  securityText: {
    fontSize: 16,
    color: "#b0b0b0",
    lineHeight: 24,
    letterSpacing: 0.3,
  },
});

export default Payment;
