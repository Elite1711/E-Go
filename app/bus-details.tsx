import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Bus, busData, Route, toggleFavorite } from "./data/busData";

export default function BusDetailsScreen() {
  const { busId } = useLocalSearchParams();
  const [bus, setBus] = useState<Bus | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (busId) {
      const foundBus = busData.find((b) => b.id === busId);
      setBus(foundBus || null);
      setIsFavorite(foundBus?.isFavorite || false);
      if (foundBus && foundBus.routes.length > 0) {
        setSelectedRoute(foundBus.routes[0]);
      }
    }
  }, [busId]);

  const handleToggleFavorite = () => {
    if (bus) {
      toggleFavorite(bus.id);
      setIsFavorite(!isFavorite);
      Alert.alert(
        isFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
        isFavorite
          ? `${bus.number} a été retiré de vos favoris.`
          : `${bus.number} a été ajouté à vos favoris.`,
      );
    }
  };

  const handleViewMap = (routeId?: string) => {
    if (bus) {
      router.push({
        pathname: "/bus-map",
        params: {
          busId: bus.id,
          routeId: routeId || selectedRoute?.id || bus.routes[0]?.id,
        },
      });
    }
  };

  if (!bus) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>🚌</Text>
          <Text style={styles.errorText}>Bus non trouvé</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const renderRouteItem = ({ item }: { item: Route }) => (
    <TouchableOpacity
      style={[
        styles.routeCard,
        selectedRoute?.id === item.id && styles.routeCardActive,
        {
          borderColor:
            selectedRoute?.id === item.id
              ? item.color || "#ff6b35"
              : "transparent",
        },
      ]}
      onPress={() => setSelectedRoute(item)}
    >
      <View style={styles.routeHeader}>
        <View style={styles.routeHeaderLeft}>
          <View
            style={[
              styles.routeColorDot,
              { backgroundColor: item.color || "#ff6b35" },
            ]}
          />
          <Text style={styles.routeName}>{item.name}</Text>
        </View>
        <Text style={styles.routeSchedule}>{item.schedule}</Text>
      </View>
      <Text style={styles.routeStopCount}>{item.stops.length} arrêts</Text>
    </TouchableOpacity>
  );

  const renderStop = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.stopContainer}>
      <View style={styles.stopLine}>
        <View
          style={[
            styles.stopDot,
            { backgroundColor: selectedRoute?.color || "#ff6b35" },
          ]}
        />
        {index < (selectedRoute?.stops.length || 0) - 1 && (
          <View
            style={[
              styles.stopConnector,
              { backgroundColor: selectedRoute?.color || "#ff6b35" },
            ]}
          />
        )}
      </View>
      <View style={styles.stopInfo}>
        <Text style={styles.stopName}>{item.name}</Text>
        <Text style={styles.stopAddress}>
          {item.address || `Arrêt ${index + 1}`}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a3a5c" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonHeader}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{bus.number}</Text>
          <Text style={styles.headerSubtitle}>{bus.cooperative}</Text>
        </View>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={28}
            color={isFavorite ? "#ff6b35" : "#fff"}
          />
        </TouchableOpacity>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>{bus.category}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Routes List */}
        <View style={styles.routesSection}>
          <Text style={styles.sectionTitle}>Trajets disponibles</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={bus.routes}
            keyExtractor={(item) => item.id}
            renderItem={renderRouteItem}
            contentContainerStyle={styles.routesList}
          />
        </View>

        {/* Stops for selected route */}
        {selectedRoute && (
          <View style={styles.stopsSection}>
            <View style={styles.stopsHeader}>
              <Text style={styles.sectionTitle}>Arrêts</Text>
              <Text style={styles.routeSchedule}>{selectedRoute.schedule}</Text>
            </View>
            <View style={styles.stopsContainer}>
              <FlatList
                data={selectedRoute.stops}
                keyExtractor={(item, index) => `stop-${index}`}
                renderItem={renderStop}
                scrollEnabled={false}
              />
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleViewMap()}
          >
            <Ionicons name="map-outline" size={24} color="#1a3a5c" />
            <Text style={styles.actionText}>Voir sur la carte</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleToggleFavorite}
          >
            <Ionicons
              name={isFavorite ? "star" : "star-outline"}
              size={24}
              color={isFavorite ? "#ff6b35" : "#1a3a5c"}
            />
            <Text style={styles.actionText}>
              {isFavorite ? "Favori" : "Ajouter aux favoris"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 18,
    color: "#1a3a5c",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#ff6b35",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    backgroundColor: "#1a3a5c",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonHeader: {
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
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
  favoriteButton: {
    marginRight: 12,
  },
  headerBadge: {
    backgroundColor: "#ff6b35",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  headerBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  routesSection: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a3a5c",
    marginBottom: 16,
  },
  routesList: {
    paddingRight: 20,
  },
  routeCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 160,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: "transparent",
  },
  routeCardActive: {
    borderWidth: 2,
  },
  routeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  routeHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  routeColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  routeName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a3a5c",
  },
  routeSchedule: {
    fontSize: 11,
    color: "#7a8a9a",
  },
  routeStopCount: {
    fontSize: 11,
    color: "#a8c8e8",
    marginLeft: 20,
  },
  stopsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  stopsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  stopsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stopContainer: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  stopLine: {
    alignItems: "center",
    width: 24,
    marginRight: 12,
  },
  stopDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  stopConnector: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  stopInfo: {
    flex: 1,
    justifyContent: "center",
  },
  stopName: {
    fontSize: 16,
    color: "#1a3a5c",
    fontWeight: "500",
  },
  stopAddress: {
    fontSize: 12,
    color: "#7a8a9a",
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 12,
  },
  actionButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    marginLeft: 8,
    color: "#1a3a5c",
    fontWeight: "500",
  },
});
