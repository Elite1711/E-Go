import { router } from "expo-router";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const handlePress = () => {
    router.push("/lines");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a3a5c" />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>E-Go</Text>
          </View>
          <Text style={styles.appName}>E-Go</Text>
          <Text style={styles.tagline}>Transport à Antananarivo</Text>
        </View>

        <View style={styles.busIllustration}>
          <Text style={styles.busIcon}>🚌</Text>
          <Text style={styles.busText}>Lignes de bus</Text>
          <Text style={styles.busSubtext}>Analamanga</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Découvrez toutes les lignes de bus d&apos;Antananarivo
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Commencer</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>© 2026 E-Go</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a3a5c",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#ff6b35",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 2,
  },
  appName: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 3,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 16,
    color: "#a8c8e8",
    letterSpacing: 1,
  },
  busIllustration: {
    alignItems: "center",
    marginVertical: 30,
    padding: 30,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 20,
    width: "100%",
  },
  busIcon: {
    fontSize: 60,
    marginBottom: 10,
  },
  busText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  busSubtext: {
    fontSize: 14,
    color: "#a8c8e8",
    marginTop: 4,
  },
  descriptionContainer: {
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  description: {
    fontSize: 16,
    color: "#c8dce8",
    textAlign: "center",
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#ff6b35",
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: "#ff6b35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    width: "100%",
    maxWidth: 280,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    color: "#5a7a9a",
    fontSize: 12,
    letterSpacing: 0.5,
  },
});
