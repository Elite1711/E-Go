import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { Bus, busData, Route } from "./data/busData";

const { width, height } = Dimensions.get("window");

export default function BusMapScreen() {
  const { busId, routeId } = useLocalSearchParams();
  const mapRef = useRef<MapView>(null);
  const [bus, setBus] = useState<Bus | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [region, setRegion] = useState({
    latitude: -18.9061,
    longitude: 47.5258,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    if (busId) {
      const foundBus = busData.find((b) => b.id === busId);
      setBus(foundBus || null);

      if (foundBus) {
        // Trouver la route sélectionnée ou prendre la première
        let route = foundBus.routes[0];
        if (routeId) {
          const foundRoute = foundBus.routes.find((r) => r.id === routeId);
          if (foundRoute) route = foundRoute;
        }
        setSelectedRoute(route);

        // Centrer la carte sur la première coordonnée de la route
        if (route && route.stops.length > 0) {
          const coords = route.stops.map((stop) => stop.coordinates);
          const avgLat =
            coords.reduce((sum, c) => sum + c.latitude, 0) / coords.length;
          const avgLng =
            coords.reduce((sum, c) => sum + c.longitude, 0) / coords.length;
          setRegion({
            latitude: avgLat,
            longitude: avgLng,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          });
        }
      }
    }
  }, [busId, routeId]);

  const fitRouteToMap = (route: Route) => {
    if (route && route.stops.length > 0) {
      const coords = route.stops.map((stop) => stop.coordinates);
      const minLat = Math.min(...coords.map((c) => c.latitude));
      const maxLat = Math.max(...coords.map((c) => c.latitude));
      const minLng = Math.min(...coords.map((c) => c.longitude));
      const maxLng = Math.max(...coords.map((c) => c.longitude));

      const centerLat = (minLat + maxLat) / 2;
      const centerLng = (minLng + maxLng) / 2;
      const deltaLat = (maxLat - minLat) * 1.5;
      const deltaLng = (maxLng - minLng) * 1.5;

      setRegion({
        latitude: centerLat,
        longitude: centerLng,
        latitudeDelta: Math.max(deltaLat, 0.02),
        longitudeDelta: Math.max(deltaLng, 0.02),
      });
    }
  };

  const handleRouteChange = (route: Route) => {
    setSelectedRoute(route);
    fitRouteToMap(route);
  };

  if (!bus || !selectedRoute) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>🗺️</Text>
          <Text style={styles.errorText}>Trajet non trouvé</Text>
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonHeader}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#1a3a5c" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{bus.number}</Text>
          <Text style={styles.headerSubtitle}>{selectedRoute.name}</Text>
        </View>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>{bus.category}</Text>
        </View>
      </View>

      {/* Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
      >
        {/* Route polyline */}
        {selectedRoute && (
          <Polyline
            coordinates={selectedRoute.stops.map((stop) => stop.coordinates)}
            strokeColor={selectedRoute.color || "#FF6B35"}
            strokeWidth={4}
            lineDashPattern={[0]}
            geodesic={true}
          />
        )}

        {/* Stop markers */}
        {selectedRoute?.stops.map((stop, index) => (
          <Marker
            key={stop.id}
            coordinate={stop.coordinates}
            title={stop.name}
            description={stop.address || `Arrêt ${index + 1}`}
          >
            <View style={styles.markerContainer}>
              <View
                style={[
                  styles.markerDot,
                  { backgroundColor: selectedRoute.color || "#FF6B35" },
                ]}
              >
                <Text style={styles.markerNumber}>{index + 1}</Text>
              </View>
            </View>
          </Marker>
        ))}

        {/* Bus marker (first stop) */}
        {selectedRoute.stops.length > 0 && (
          <Marker
            coordinate={selectedRoute.stops[0].coordinates}
            title={`${bus.number} - Départ`}
          >
            <View style={styles.busMarker}>
              <Text style={styles.busMarkerText}>🚌</Text>
            </View>
          </Marker>
        )}
      </MapView>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => fitRouteToMap(selectedRoute)}
        >
          <Ionicons name="locate" size={24} color="#1a3a5c" />
        </TouchableOpacity>
      </View>

      {/* Route selector */}
      <View style={styles.routeSelectorContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {bus.routes.map((route) => (
            <TouchableOpacity
              key={route.id}
              style={[
                styles.routeSelectorItem,
                selectedRoute.id === route.id && styles.routeSelectorItemActive,
                { borderColor: route.color || "#FF6B35" },
              ]}
              onPress={() => handleRouteChange(route)}
            >
              <View style={styles.routeSelectorHeader}>
                <View
                  style={[
                    styles.routeColorDot,
                    { backgroundColor: route.color || "#FF6B35" },
                  ]}
                />
                <Text
                  style={[
                    styles.routeSelectorName,
                    selectedRoute.id === route.id &&
                      styles.routeSelectorNameActive,
                  ]}
                >
                  {route.name}
                </Text>
              </View>
              <Text style={styles.routeSelectorSchedule}>{route.schedule}</Text>
              <Text style={styles.routeSelectorStops}>
                {route.stops.length} arrêts
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Stop list */}
      <View style={styles.stopListContainer}>
        <Text style={styles.stopListTitle}>Arrêts du trajet</Text>
        <ScrollView
          style={styles.stopList}
          showsVerticalScrollIndicator={false}
        >
          {selectedRoute.stops.map((stop, index) => (
            <View key={stop.id} style={styles.stopListItem}>
              <View style={styles.stopListNumberContainer}>
                <View
                  style={[
                    styles.stopListDot,
                    { backgroundColor: selectedRoute.color || "#FF6B35" },
                  ]}
                >
                  <Text style={styles.stopListNumber}>{index + 1}</Text>
                </View>
                {index < selectedRoute.stops.length - 1 && (
                  <View
                    style={[
                      styles.stopListLine,
                      { backgroundColor: selectedRoute.color || "#FF6B35" },
                    ]}
                  />
                )}
              </View>
              <View style={styles.stopListInfo}>
                <Text style={styles.stopListName}>{stop.name}</Text>
                <Text style={styles.stopListAddress}>
                  {stop.address || `Arrêt ${index + 1}`}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e8ecf0",
  },
  backButtonHeader: {
    padding: 4,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a3a5c",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#7a8a9a",
  },
  headerBadge: {
    backgroundColor: "#ff6b35",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  headerBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  map: {
    width: width,
    height: height * 0.45,
  },
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  markerDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  markerNumber: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  busMarker: {
    backgroundColor: "#ff6b35",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  busMarkerText: {
    fontSize: 20,
  },
  controlsContainer: {
    position: "absolute",
    top: height * 0.45 - 60,
    right: 16,
  },
  controlButton: {
    backgroundColor: "#fff",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  routeSelectorContainer: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e8ecf0",
  },
  routeSelectorItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#f5f7fa",
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: "transparent",
    minWidth: 120,
  },
  routeSelectorItemActive: {
    backgroundColor: "#fff",
    borderWidth: 2,
  },
  routeSelectorHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  routeColorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  routeSelectorName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1a3a5c",
  },
  routeSelectorNameActive: {
    color: "#ff6b35",
  },
  routeSelectorSchedule: {
    fontSize: 11,
    color: "#7a8a9a",
    marginTop: 4,
    marginLeft: 18,
  },
  routeSelectorStops: {
    fontSize: 10,
    color: "#a8c8e8",
    marginTop: 2,
    marginLeft: 18,
  },
  stopListContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  stopListTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a3a5c",
    marginBottom: 12,
  },
  stopList: {
    flex: 1,
  },
  stopListItem: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  stopListNumberContainer: {
    alignItems: "center",
    width: 30,
    marginRight: 12,
  },
  stopListDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  stopListNumber: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  stopListLine: {
    width: 2,
    flex: 1,
    marginVertical: 2,
  },
  stopListInfo: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 8,
  },
  stopListName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1a3a5c",
  },
  stopListAddress: {
    fontSize: 12,
    color: "#7a8a9a",
    marginTop: 2,
  },
});
