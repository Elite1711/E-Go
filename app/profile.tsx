import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a3a5c" />

      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={32} color="#fff" />
        </View>
        <Text style={styles.title}>Profil</Text>
        <Text style={styles.subtitle}>Votre espace E-Go</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Navigation</Text>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.replace("/lines")}
        >
          <Ionicons name="bus-outline" size={24} color="#1a3a5c" />
          <Text style={styles.menuText}>Toutes les lignes</Text>
          <Ionicons name="chevron-forward" size={20} color="#7a8a9a" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.replace("/favorites")}
        >
          <Ionicons name="heart-outline" size={24} color="#ff6b35" />
          <Text style={styles.menuText}>Mes favoris</Text>
          <Ionicons name="chevron-forward" size={20} color="#7a8a9a" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/")}
        >
          <Ionicons name="home-outline" size={24} color="#a8c8e8" />
          <Text style={styles.navText}>Accueil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/lines")}
        >
          <Ionicons name="bus-outline" size={24} color="#a8c8e8" />
          <Text style={styles.navText}>Bus</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/favorites")}
        >
          <Ionicons name="heart-outline" size={24} color="#a8c8e8" />
          <Text style={styles.navText}>Favoris</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/profile")}
        >
          <Ionicons name="person" size={24} color="#ff6b35" />
          <Text style={[styles.navText, styles.navTextActive]}>Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  header: {
    alignItems: "center",
    backgroundColor: "#1a3a5c",
    paddingVertical: 28,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: "#ff6b35",
    borderRadius: 36,
    height: 72,
    justifyContent: "center",
    marginBottom: 12,
    width: 72,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#a8c8e8",
    fontSize: 14,
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    color: "#1a3a5c",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  menuItem: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    marginBottom: 10,
    padding: 16,
  },
  menuText: {
    color: "#1a3a5c",
    flex: 1,
    fontSize: 16,
    marginLeft: 14,
  },
  bottomNav: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopColor: "#e8ecf0",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 20,
    paddingVertical: 12,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    color: "#7a8a9a",
    fontSize: 11,
    marginTop: 4,
  },
  navTextActive: {
    color: "#ff6b35",
  },
});
