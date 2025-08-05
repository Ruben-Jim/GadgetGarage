
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Payment</Text>
          <Text style={styles.subtitle}>Secure payment processing</Text>
          <View style={styles.headerDecoration} />
        </View>
      </View>

      {/* Amount Card */}
      <View style={styles.card}>
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
            placeholderTextColor="#9ca3af"
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
      </View>

      {/* Description Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Payment Description</Text>
          <Text style={styles.cardSubtitle}>Optional details about this payment</Text>
        </View>
        <TextInput
          style={styles.descriptionInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Service description (optional)"
          placeholderTextColor="#9ca3af"
          multiline
        />
      </View>

      {/* Payment Method Card */}
      <View style={styles.card}>
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
      </View>

      {/* Card Information Card */}
      {paymentMethod === "card" && (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Card Information</Text>
            <Text style={styles.cardSubtitle}>Enter your card details securely</Text>
          </View>
          <View style={styles.cardForm}>
            <TextInput
              style={styles.cardInput}
              placeholder="Card Number"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
            />
            <View style={styles.cardRow}>
              <TextInput
                style={[styles.cardInput, styles.cardInputSmall]}
                placeholder="MM/YY"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.cardInput, styles.cardInputSmall]}
                placeholder="CVV"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
            </View>
            <TextInput
              style={styles.cardInput}
              placeholder="Cardholder Name"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>
      )}

      {/* Payment Summary Card */}
      {amount && paymentMethod && (
        <View style={styles.summaryCard}>
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
        </View>
      )}

      {/* Payment Button */}
      <TouchableOpacity 
        style={[
          styles.payButton,
          (!paymentMethod || !amount) && styles.payButtonDisabled
        ]}
        onPress={handlePayment}
        disabled={!paymentMethod || !amount}
      >
        <Text style={styles.payButtonText}>
          Process Payment ${amount || "0.00"}
        </Text>
      </TouchableOpacity>

      {/* Security Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>🔒 Secure Payment</Text>
          <Text style={styles.cardSubtitle}>Your data is protected with industry-standard security</Text>
        </View>
        <Text style={styles.securityText}>
          Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
        </Text>
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
    backgroundColor: "#dc2626",
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
    backgroundColor: "#ef4444",
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
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderWidth: 2,
    borderColor: "#059669",
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dollarSign: {
    fontSize: 28,
    fontWeight: "800",
    color: "#059669",
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 28,
    fontWeight: "700",
    color: "#1e293b",
    paddingVertical: 16,
  },
  quickAmountLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 12,
  },
  quickAmountsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },
  quickAmountButton: {
    backgroundColor: "#f8fafc",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 16,
    width: "30%",
    alignItems: "center",
  },
  quickAmountButtonActive: {
    backgroundColor: "#059669",
    borderColor: "#059669",
  },
  quickAmountText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
  },
  quickAmountTextActive: {
    color: "#ffffff",
  },
  descriptionInput: {
    backgroundColor: "#f8fafc",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    height: 100,
    textAlignVertical: "top",
  },
  paymentMethodsContainer: {
    gap: 12,
  },
  paymentMethodButton: {
    backgroundColor: "#f8fafc",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  paymentMethodButtonActive: {
    backgroundColor: "#dc2626",
    borderColor: "#dc2626",
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
    fontWeight: "600",
    color: "#475569",
    flex: 1,
  },
  paymentMethodTextActive: {
    color: "#ffffff",
  },
  cardForm: {
    gap: 16,
  },
  cardInput: {
    backgroundColor: "#f8fafc",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  cardRow: {
    flexDirection: "row",
    gap: 16,
  },
  cardInputSmall: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: "#ffffff",
    margin: 16,
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#059669",
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
    gap: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#059669",
  },
  payButton: {
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
  payButtonDisabled: {
    backgroundColor: "#d1d5db",
  },
  payButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  securityText: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 24,
  },
});

export default Payment;
