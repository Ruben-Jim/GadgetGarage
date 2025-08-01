
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const Payment = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: "💳" },
    { id: "venmo", name: "Venmo", icon: "📱" },
    { id: "cashapp", name: "Cash App", icon: "💰" },
    { id: "zelle", name: "Zelle", icon: "🏦" },
    { id: "paypal", name: "PayPal", icon: "🅿️" },
    { id: "cash", name: "Cash", icon: "💵" }
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
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Payment</Text>
        <Text style={styles.subtitle}>Secure payment processing</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Amount</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.dollarSign}>$</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Description</Text>
        <TextInput
          style={styles.descriptionInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Service description (optional)"
          multiline
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
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
              <Text style={styles.paymentMethodIcon}>{method.icon}</Text>
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

      {paymentMethod === "card" && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card Information</Text>
          <View style={styles.cardForm}>
            <TextInput
              style={styles.cardInput}
              placeholder="Card Number"
              keyboardType="numeric"
            />
            <View style={styles.cardRow}>
              <TextInput
                style={[styles.cardInput, styles.cardInputSmall]}
                placeholder="MM/YY"
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.cardInput, styles.cardInputSmall]}
                placeholder="CVV"
                keyboardType="numeric"
              />
            </View>
            <TextInput
              style={styles.cardInput}
              placeholder="Cardholder Name"
            />
          </View>
        </View>
      )}

      {amount && paymentMethod && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>
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
      )}

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

      <View style={styles.securityContainer}>
        <Text style={styles.securityTitle}>🔒 Secure Payment</Text>
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
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#e74c3c",
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
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#27ae60",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  dollarSign: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#27ae60",
    marginRight: 5,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    paddingVertical: 15,
  },
  quickAmountLabel: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 10,
  },
  quickAmountsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickAmountButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    width: "30%",
    marginBottom: 10,
    alignItems: "center",
  },
  quickAmountButtonActive: {
    backgroundColor: "#27ae60",
    borderColor: "#27ae60",
  },
  quickAmountText: {
    fontSize: 16,
    color: "#7f8c8d",
  },
  quickAmountTextActive: {
    color: "#ffffff",
  },
  descriptionInput: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    height: 80,
    textAlignVertical: "top",
  },
  paymentMethodsContainer: {
    gap: 10,
  },
  paymentMethodButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  paymentMethodButtonActive: {
    backgroundColor: "#e74c3c",
    borderColor: "#e74c3c",
  },
  paymentMethodIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  paymentMethodText: {
    fontSize: 16,
    color: "#2c3e50",
  },
  paymentMethodTextActive: {
    color: "#ffffff",
  },
  cardForm: {
    gap: 15,
  },
  cardInput: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  cardRow: {
    flexDirection: "row",
    gap: 15,
  },
  cardInputSmall: {
    flex: 1,
  },
  summaryContainer: {
    backgroundColor: "#ffffff",
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#7f8c8d",
  },
  summaryValue: {
    fontSize: 16,
    color: "#2c3e50",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#27ae60",
  },
  payButton: {
    backgroundColor: "#27ae60",
    margin: 20,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  payButtonDisabled: {
    backgroundColor: "#bdc3c7",
  },
  payButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  securityContainer: {
    backgroundColor: "#ffffff",
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#27ae60",
    marginBottom: 10,
  },
  securityText: {
    fontSize: 14,
    color: "#7f8c8d",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default Payment;
