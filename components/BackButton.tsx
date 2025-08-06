import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BackButtonProps {
  onPress?: () => void;
  title?: string;
  color?: string;
  variant?: "default" | "minimal" | "floating";
}

const BackButton: React.FC<BackButtonProps> = ({ 
  onPress, 
  title = "Back", 
  color = "#1e293b",
  variant = "default"
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  const getButtonStyle = () => {
    switch (variant) {
      case "minimal":
        return [styles.backButtonMinimal, { borderColor: color }];
      case "floating":
        return [styles.backButtonFloating, { backgroundColor: color }];
      default:
        return [styles.backButton, { borderColor: color }];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "floating":
        return [styles.textFloating, { color: "#ffffff" }];
      default:
        return [styles.text, { color }];
    }
  };

  const getIconStyle = () => {
    switch (variant) {
      case "floating":
        return [styles.iconFloating, { color: "#ffffff" }];
      default:
        return [styles.icon, { color }];
    }
  };

  return (
    <TouchableOpacity 
      style={getButtonStyle()} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Text style={getIconStyle()}>←</Text>
      </View>
      {variant !== "minimal" && (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonMinimal: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  backButtonFloating: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 8,
    // elevation: 6,
  },
  iconContainer: {
    marginRight: 0,
  },
  icon: {
    fontSize: 20,
    fontWeight: "700",
  },
  iconFloating: {
    fontSize: 23,
    fontWeight: "700",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  textFloating: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default BackButton; 