import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Bus, getFavorites } from "./data/busData";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Bus[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const favs = getFavorites();
    setFavorites(favs);
  };

  const renderItem = ({ item }: { item: Bus }) => (
    <TouchableOpacity
      style={styles.favoriteCard}
      onPress={() =>
        router.push({
          pathname: "/bus-details",
          params: { busId: item.id },
        })
      }
    >
      <View style={styles.favoriteIcon}>
        <Text style={styles.favoriteIconText}>🚌</Text>
      </View>
      <View style={styles.favoriteInfo}>
        <Text style={styles.favoriteName}>{item.number}</Text>
        <Text style={styles.favoriteCooperative}>{item.cooperative}</Text>
      </View>
      <Ionicons name="heart" size={24} color="#ff6b35" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a3a5c" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes favoris</Text>
        <Text style={styles.headerSubtitle}>
          {favorites.length} bus favori{favorites.length > 1 ? "s" : ""}
        </Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>❤️</Text>
          <Text style={styles.emptyTitle}>Aucun favori</Text>
          <Text style={styles.emptyText}>
            Ajoutez vos bus préférés pour les retrouver ici
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => router.replace("/lines")}
          >
            <Text style={styles.emptyButtonText}>Voir les bus</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/")}
        >
          <Ionicons name="home" size={24} color="#a8c8e8" />
          <Text style={styles.navText}>Accueil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/lines")}
        >
          <Ionicons name="bus" size={24} color="#a8c8e8" />
          <Text style={styles.navText}>Bus</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/favorites")}
        >
          <Ionicons name="heart" size={24} color="#ff6b35" />
          <Text style={[styles.navText, styles.navTextActive]}>Favoris</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/profile")}
        >
          <Ionicons name="person" size={24} color="#a8c8e8" />
          <Text style={styles.navText}>Profil</Text>
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
    backgroundColor: "#1a3a5c",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#a8c8e8",
    marginTop: 4,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  favoriteCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  favoriteIconText: {
    fontSize: 24,
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a3a5c",
  },
  favoriteCooperative: {
    fontSize: 14,
    color: "#7a8a9a",
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a3a5c",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#7a8a9a",
    textAlign: "center",
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: "#ff6b35",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
  },
  emptyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#e8ecf0",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 11,
    color: "#7a8a9a",
    marginTop: 4,
  },
  navTextActive: {
    color: "#ff6b35",
  },
});
