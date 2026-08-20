import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Bus, fetchBusLinesFromAPI } from "./data/busData";

export default function LinesScreen() {
  const [filteredBuses, setFilteredBuses] = useState<Bus[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Toutes");
  const [categories, setCategories] = useState<string[]>(["Toutes"]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allBuses, setAllBuses] = useState<Bus[]>([]);

  useEffect(() => {
    loadBusData();
  }, []);

  const loadBusData = async () => {
    try {
      setLoading(true);
      const data = await fetchBusLinesFromAPI();
      setAllBuses(data);
      setFilteredBuses(data);

      // Extraire les catégories uniques
      const uniqueCategories = [
        "Toutes",
        ...new Set(data.map((bus) => bus.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error loading bus data:", error);
      Alert.alert("Erreur", "Impossible de charger les données des bus");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = allBuses;

    // Filtrer par favoris
    if (showFavoritesOnly) {
      result = result.filter((bus) => bus.isFavorite);
    }

    // Filtrer par recherche
    if (searchQuery) {
      result = result.filter(
        (bus) =>
          bus.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bus.cooperative.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      if (showFavoritesOnly) {
        result = result.filter((bus) => bus.isFavorite);
      }
    }

    // Filtrer par catégorie
    if (selectedCategory !== "Toutes") {
      result = result.filter((bus) => bus.category === selectedCategory);
      if (searchQuery) {
        result = result.filter(
          (bus) =>
            bus.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bus.cooperative.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      }
      if (showFavoritesOnly) {
        result = result.filter((bus) => bus.isFavorite);
      }
    }

    setFilteredBuses(result);
  }, [searchQuery, selectedCategory, showFavoritesOnly, allBuses]);

  const handleBusPress = (bus: Bus) => {
    router.push({
      pathname: "/bus-details",
      params: { busId: bus.id },
    });
  };

  const handleViewMap = (bus: Bus) => {
    if (bus.routes && bus.routes.length > 0) {
      router.push({
        pathname: "/bus-map",
        params: {
          busId: bus.id,
          routeId: bus.routes[0]?.id,
        },
      });
    } else {
      Alert.alert("Info", "Ce bus n'a pas encore de trajet disponible");
    }
  };

  const toggleFavoritesFilter = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
    if (!showFavoritesOnly) {
      const hasFavorites = allBuses.some((bus) => bus.isFavorite);
      if (!hasFavorites) {
        Alert.alert(
          "Aucun favori",
          "Vous n'avez pas encore de bus favoris. Ajoutez-en un depuis les détails du bus.",
          [{ text: "OK" }],
        );
        setShowFavoritesOnly(false);
      }
    }
  };

  const renderItem = ({ item }: { item: Bus }) => (
    <TouchableOpacity
      style={styles.lineCard}
      onPress={() => handleBusPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.lineIcon}>
        <Text style={styles.lineIconText}>🚌</Text>
      </View>
      <View style={styles.lineInfo}>
        <View style={styles.lineHeader}>
          <Text style={styles.lineName}>{item.number}</Text>
          {item.isFavorite && (
            <Ionicons
              name="heart"
              size={16}
              color="#ff6b35"
              style={styles.favoriteIcon}
            />
          )}
        </View>
        <Text style={styles.lineCooperative}>{item.cooperative}</Text>
        <Text style={styles.lineCategory}>{item.category}</Text>
      </View>
      <View style={styles.routeInfo}>
        <View style={styles.routeStats}>
          <Text style={styles.routeCount}>
            {item.routes?.length || 0} trajet
            {item.routes?.length > 1 ? "s" : ""}
          </Text>
          <Text style={styles.routeStops}>
            {item.routes?.reduce((acc, route) => acc + route.stops.length, 0) ||
              0}{" "}
            arrêts
          </Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.mapButton}
            onPress={() => handleViewMap(item)}
          >
            <Ionicons name="map-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <Ionicons name="chevron-forward" size={24} color="#a8c8e8" />
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6b35" />
        <Text style={styles.loadingText}>Chargement des bus...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a3a5c" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Bus Antananarivo</Text>
            <Text style={styles.headerSubtitle}>
              Analamanga • {allBuses.length} bus
            </Text>
          </View>
          <TouchableOpacity
            style={styles.favoritesFilterButton}
            onPress={toggleFavoritesFilter}
          >
            <Ionicons
              name={showFavoritesOnly ? "heart" : "heart-outline"}
              size={24}
              color={showFavoritesOnly ? "#ff6b35" : "#fff"}
            />
            <Text
              style={[
                styles.favoritesFilterText,
                showFavoritesOnly && styles.favoritesFilterTextActive,
              ]}
            >
              Favoris
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#a8c8e8"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un bus (numéro, nom, coopérative)..."
          placeholderTextColor="#a8c8e8"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          autoCapitalize="characters"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#a8c8e8" />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filters */}
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryChip,
                selectedCategory === item && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === item && styles.categoryChipTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredBuses.length} bus trouvé{filteredBuses.length > 1 ? "s" : ""}
          {showFavoritesOnly && " ⭐ Favoris uniquement"}
        </Text>
      </View>

      {/* Buses List */}
      <FlatList
        data={filteredBuses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🚫</Text>
            <Text style={styles.emptyTitle}>
              {showFavoritesOnly ? "Aucun favori" : "Aucun bus trouvé"}
            </Text>
            <Text style={styles.emptyText}>
              {showFavoritesOnly
                ? "Ajoutez des bus à vos favoris pour les retrouver ici"
                : "Aucun bus ne correspond à votre recherche"}
            </Text>
            {showFavoritesOnly && (
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => setShowFavoritesOnly(false)}
              >
                <Text style={styles.emptyButtonText}>Voir tous les bus</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/")}
        >
          <Ionicons name="home" size={24} color="#a8c8e8" />
          <Text style={styles.navText}>Accueil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/lines")}
        >
          <Ionicons name="bus" size={24} color="#ff6b35" />
          <Text style={[styles.navText, styles.navTextActive]}>Bus</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/favorites")}
        >
          <Ionicons name="heart" size={24} color="#a8c8e8" />
          <Text style={styles.navText}>Favoris</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f7fa",
  },
  loadingText: {
    marginTop: 12,
    color: "#1a3a5c",
    fontSize: 16,
  },
  header: {
    backgroundColor: "#1a3a5c",
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#a8c8e8",
    marginTop: 2,
  },
  favoritesFilterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  favoritesFilterText: {
    color: "#a8c8e8",
    fontSize: 12,
    fontWeight: "500",
  },
  favoritesFilterTextActive: {
    color: "#ff6b35",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: -10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1a3a5c",
    paddingVertical: 8,
  },
  categoriesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#e8ecf0",
    marginRight: 10,
  },
  categoryChipActive: {
    backgroundColor: "#ff6b35",
  },
  categoryChipText: {
    fontSize: 14,
    color: "#1a3a5c",
    fontWeight: "500",
  },
  categoryChipTextActive: {
    color: "#fff",
  },
  resultsContainer: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  resultsText: {
    fontSize: 13,
    color: "#7a8a9a",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  lineCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  lineIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  lineIconText: {
    fontSize: 24,
  },
  lineInfo: {
    flex: 1,
  },
  lineHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  lineName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a3a5c",
  },
  favoriteIcon: {
    marginLeft: 8,
  },
  lineCooperative: {
    fontSize: 14,
    color: "#ff6b35",
    marginTop: 2,
  },
  lineCategory: {
    fontSize: 12,
    color: "#7a8a9a",
    marginTop: 2,
  },
  routeInfo: {
    alignItems: "flex-end",
    gap: 6,
  },
  routeStats: {
    alignItems: "flex-end",
  },
  routeCount: {
    fontSize: 12,
    color: "#7a8a9a",
    fontWeight: "500",
  },
  routeStops: {
    fontSize: 11,
    color: "#a8c8e8",
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  mapButton: {
    backgroundColor: "#ff6b35",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a3a5c",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#7a8a9a",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  emptyButton: {
    backgroundColor: "#ff6b35",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  emptyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
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
