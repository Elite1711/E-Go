/**
 * busData.ts
 * Données publiques des lignes de bus / taxi-be d'Antananarivo.
 *
 * IMPORTANT :
 * - Ce fichier regroupe les lignes publiquement documentées, pas les véhicules individuels.
 * - Les itinéraires peuvent évoluer selon les travaux, déviations et décisions de la CUA.
 * - Les champs "stops" ne sont remplis que lorsque des arrêts sont publiquement documentés.
 * - Source principale : Liste des lignes de transport en commun d'Antananarivo,
 *   mise à jour en avril 2026, complétée par des sources publiques.
 */

// ----- Adaptation pour l'application (format attendu par les écrans) -----

import * as SecureStore from "expo-secure-store";

export type BusCategory = "urbaine" | "suburbaine";

export interface BusStop {
  name: string;
  latitude?: number;
  longitude?: number;
}

export interface BusVariant {
  code?: string;
  color?: string;
  route: string;
}

export interface BusLine {
  id: string;
  code: string;
  name: string;
  category: BusCategory;
  primus?: string;
  terminus?: string;
  route: string;
  operator?: string;
  vehicle?: string;
  variants?: BusVariant[];
  stops?: BusStop[];
  notes?: string;
}

export const busLines: BusLine[] = [
  {
    id: "009",
    code: "009",
    name: "Ligne 009",
    category: "urbaine",
    primus: "Anosizato",
    terminus: "Analakely",
    route: "Anosizato → Analakely",
  },
  {
    id: "015",
    code: "015",
    name: "Ligne 015",
    category: "urbaine",
    primus: "Ambohimanambola",
    terminus: "67 Ha",
    route: "Ambohimanambola → 67 Ha",
  },
  {
    id: "017",
    code: "017",
    name: "Ligne 017",
    category: "urbaine",
    primus: "Ambohipo",
    terminus: "Mahamasina",
    route: "Ambohipo → Mahamasina",
  },
  {
    id: "104",
    code: "104",
    name: "Ligne 104",
    category: "urbaine",
    primus: "Ambohimiandra",
    terminus: "Ankadimbahoaka",
    route:
      "Ampamantanana → Androndra → Ankadimbahoaka → Soanierana → Paraky → Andrefan'Ambohijanahary → Anosy → Ambohidahy → Analakely → Tsaralalàna → Ambatomena → Ambohijatovo → Ambanidia → Ambohimiandra → Ampamantanana",
  },
  {
    id: "105",
    code: "105",
    name: "Ligne 105",
    category: "urbaine",
    primus: "Analakely",
    terminus: "Ambohimanarina / Anosisoa",
    route: "Analakely → Ambohimanarina ; variante vers Anosy → Anosisoa",
    variants: [
      {
        code: "105 Rouge",
        color: "rouge",
        route: "Analakely → Ambohimanarina",
      },
      {
        code: "105 Sans rouge",
        route: "Anosy → Anosisoa",
      },
    ],
    notes: "Plusieurs variantes sont publiquement documentées.",
  },
  {
    id: "106",
    code: "106",
    name: "Ligne 106",
    category: "urbaine",
    primus: "Alarobia",
    terminus: "Analakely",
    route: "Alarobia → Analakely",
  },
  {
    id: "109",
    code: "109",
    name: "Ligne 109",
    category: "urbaine",
    primus: "67 Ha",
    terminus: "Ambohitrarahaba",
    route: "67 Ha → Ambohitrarahaba",
    variants: [
      {
        code: "109 Bleu",
        color: "bleu",
        route:
          "Antanandrano / Anosizato Atsinanana → 67 Ha / Anosy selon le sens",
      },
      {
        code: "109 Rouge",
        color: "rouge",
        route: "Antanandrano → 67 Ha",
      },
    ],
    notes:
      "Les variantes de couleur sont couramment utilisées pour distinguer les parcours.",
  },
  {
    id: "110",
    code: "110",
    name: "Ligne 110",
    category: "urbaine",
    primus: "Anosizato",
    terminus: "Analakely",
    route: "Anosizato → Analakely",
  },
  {
    id: "112",
    code: "112",
    name: "Ligne 112",
    category: "urbaine",
    primus: "Analakely",
    terminus: "Morondava",
    route: "Analakely → Morondava",
  },
  {
    id: "113",
    code: "113",
    name: "Ligne 113",
    category: "urbaine",
    primus: "Mahazoarivo",
    terminus: "Tsaralalàna",
    route: "Mahazoarivo → Tsaralalàna",
  },
  {
    id: "114",
    code: "114",
    name: "Ligne 114",
    category: "urbaine",
    primus: "Analakely",
    terminus: "Ambohijanahary",
    route: "Analakely → Ambohijanahary",
    variants: [
      {
        color: "vert",
        route: "Analakely → Ambohijanahary",
      },
      {
        color: "bleu-rouge",
        route: "Analakely → Ambatolampy → Ambohibao (cycle)",
      },
      {
        color: "vert-rouge",
        route: "Analakely → Ambatolampy",
      },
      {
        color: "vert-jaune",
        route: "Analakely → Ambodihady",
      },
    ],
  },
  {
    id: "115",
    code: "115",
    name: "Ligne 115",
    category: "urbaine",
    primus: "Ambatomena",
    terminus: "Tsimbazaza",
    route: "Ambatomena → Tsimbazaza",
  },
  {
    id: "117",
    code: "117",
    name: "Ligne 117",
    category: "urbaine",
    primus: "Ampamantanana",
    terminus: "Ambohijatovo",
    route: "Androndra → Ambohijatovo / secteur Ampamantanana",
  },
  {
    id: "119",
    code: "119",
    name: "Ligne 119",
    category: "urbaine",
    primus: "67 Ha",
    terminus: "Ankatso",
    route: "67 Ha → Ankatso",
  },
  {
    id: "120",
    code: "120",
    name: "Ligne 120",
    category: "urbaine",
    primus: "Alarobia",
    terminus: "Ambodifilao",
    route: "Soavimasoandro / Alarobia → Ambodifilao",
  },
  {
    id: "122",
    code: "122",
    name: "Ligne 122",
    category: "urbaine",
    primus: "Antanimena",
    terminus: "Mahazoarivo",
    route: "Antanimena → Mahazoarivo",
  },
  {
    id: "126",
    code: "126",
    name: "Ligne 126",
    category: "urbaine",
    primus: "67 Ha / Anosy",
    terminus: "Manjaka / Antanetibe",
    route: "67 Ha / Anosy → Manjaka / Antanetibe",
  },
  {
    id: "128",
    code: "128",
    name: "Ligne 128",
    category: "urbaine",
    primus: "Ankatso",
    terminus: "Ampefiloha",
    route: "Ankatso → Mahamasina / Ampefiloha",
  },
  {
    id: "129",
    code: "129",
    name: "Ligne 129",
    category: "urbaine",
    primus: "Analakely",
    terminus: "Ambohipo",
    route: "Analakely → Ambohipo",
  },
  {
    id: "133",
    code: "133",
    name: "Ligne 133",
    category: "urbaine",
    primus: "Analakely",
    terminus: "Itaosy",
    route: "Analakely → Itaosy",
    notes: "Le parcours peut être temporairement dévié selon les travaux.",
  },
  {
    id: "134",
    code: "134",
    name: "Ligne 134",
    category: "urbaine",
    primus: "Ambohipotsy",
    route: "Ligne desservant Ambohipotsy",
  },
  {
    id: "135",
    code: "135",
    name: "Ligne 135",
    category: "urbaine",
    primus: "Analakely",
    terminus: "Ambomahintsy",
    route: "Analakely → Ambomahintsy",
  },
  {
    id: "137",
    code: "137",
    name: "Ligne 137",
    category: "urbaine",
    primus: "Analakely",
    terminus: "Fiadanamanga (Iavoloha)",
    route: "Analakely → Fiadanamanga (Iavoloha)",
  },
  {
    id: "138",
    code: "138",
    name: "Ligne 138",
    category: "urbaine",
    primus: "Analakely",
    terminus: "Anosipatrana",
    route: "Analakely → Anosipatrana",
  },
  {
    id: "139",
    code: "139",
    name: "Ligne 139",
    category: "urbaine",
    primus: "Antanimena",
    terminus: "Androndra",
    route: "Antanimena → Androndra",
  },
  {
    id: "140",
    code: "140",
    name: "Ligne 140",
    category: "urbaine",
    primus: "Tsaralalàna",
    terminus: "Ampitatafika",
    route: "Tsaralalàna → Fasan'ny Karana → Ampitatafika",
    notes: "Certains véhicules peuvent continuer vers le Maki.",
  },
  {
    id: "141",
    code: "141",
    name: "Ligne 141",
    category: "urbaine",
    primus: "Andraisoro",
    terminus: "Analakely",
    route: "Andraisoro → Analakely",
  },
  {
    id: "142",
    code: "142",
    name: "Ligne 142",
    category: "urbaine",
    primus: "Analakely",
    terminus: "Soanierana",
    route: "Analakely → Soanierana",
  },
  {
    id: "146",
    code: "146",
    name: "Ligne 146",
    category: "urbaine",
    primus: "67 Ha",
    terminus: "Mausolée",
    route: "67 Ha → Mausolée",
  },
  {
    id: "147",
    code: "147",
    name: "Ligne 147",
    category: "urbaine",
    primus: "67 Ha",
    terminus: "Ambatomaro",
    route: "67 Ha → Ambatomaro",
  },
  {
    id: "150",
    code: "150",
    name: "Ligne 150",
    category: "urbaine",
    primus: "Antanandrano",
    terminus: "Tsimbazaza",
    route: "Antanandrano → Tsimbazaza",
  },
  {
    id: "150B",
    code: "150B",
    name: "Ligne 150B",
    category: "urbaine",
    primus: "Mahatony",
    terminus: "Anosibe",
    route: "Mahatony → Anosibe",
  },
  {
    id: "154",
    code: "154",
    name: "Ligne 154",
    category: "urbaine",
    primus: "Amboditsiry",
    terminus: "Tanjombato Forello",
    route: "Amboditsiry → Behoririka → Analakely → Anosy → Tanjombato Forello",
    variants: [
      {
        code: "154A",
        route:
          "Amboditsiry → Antanimena → Vasakosy → Andohatapenaka → Fasan'ny Karana → Ankadimbahoaka → Tanjombato Forello",
      },
      {
        code: "154B",
        route:
          "Amboditsiry → Andravoahangy Mascar → Météo → Ambanidia → Tsimbazaza → Ankadimbahoaka → Tanjombato Forello",
      },
      {
        code: "154C",
        route:
          "Tanjombato → Ankadimbahoaka → Tsimbazaza → Ambanidia → Météo → Anjanahary → Amboditsiry → Andranobevava → Masay → Ankorondrano → Ambohimanarina → Andraharo",
      },
    ],
  },
  {
    id: "160",
    code: "160",
    name: "Ligne 160",
    category: "urbaine",
    primus: "Antanimena",
    terminus: "Ankatso",
    route: "Antanimena → Ankatso",
  },
  {
    id: "161",
    code: "161",
    name: "Ligne 161",
    category: "urbaine",
    primus: "Ambatobe",
    terminus: "Analakely",
    route: "Ambatobe → Analakely",
  },
  {
    id: "162",
    code: "162",
    name: "Ligne 162",
    category: "urbaine",
    primus: "Anosizato",
    terminus: "Galaxy Andraharo",
    route: "Anosizato → Analamahitsy / Galaxy Andraharo",
  },
  {
    id: "163",
    code: "163",
    name: "Ligne 163",
    category: "urbaine",
    primus: "Ilafy",
    terminus: "Alasora",
    route: "Ankadikely Ilafy → Alasora / Ampangabe selon le parcours",
    vehicle: "Midibus",
    operator: "Mirindra",
  },
  {
    id: "165",
    code: "165",
    name: "Ligne 165",
    category: "urbaine",
    primus: "Anosibe",
    terminus: "Androhibe / Mahatony",
    route: "Anosibe → Androhibe / Mahatony",
  },
  {
    id: "172",
    code: "172",
    name: "Ligne 172",
    category: "urbaine",
    primus: "67 Ha",
    terminus: "Fiadanamanga (Iavoloha)",
    route: "67 Ha → Fiadanamanga (Iavoloha)",
  },
  {
    id: "178",
    code: "178",
    name: "Ligne 178",
    category: "urbaine",
    primus: "67 Ha",
    terminus: "Andraisoro",
    route: "67 Ha → Andraisoro",
  },
  {
    id: "180",
    code: "180",
    name: "Ligne 180",
    category: "urbaine",
    primus: "Alarobia / Androhibe",
    terminus: "Ambolokandrina",
    route:
      "Alarobia Gare → Ankorondrano → Antanimena → Ankadifotsy → Rasalama → Bel Air → Antsakaviro → Ambanidia → Ambohipo → Ambolokandrina",
    variants: [
      {
        code: "180-01",
        route:
          "Alarobia Gare → Ankorondrano → Antanimena → Ankadifotsy → Rasalama → Bel Air → Antsakaviro → Tunnel Ambanidia → Soarano → Behoririka → Alarobia Gare",
      },
      {
        code: "180-02",
        route:
          "Alarobia Gare → Ankorondrano → Antanimena → Ankadifotsy → Rasalama → Ambanidia → Ambohipo → Ambolokandrina",
      },
    ],
  },
  {
    id: "182",
    code: "182",
    name: "Ligne 182",
    category: "urbaine",
    primus: "Bibilava / Ambohijatovo",
    terminus: "Ambolokandrina",
    route: "Bibilava → Ambohijatovo Ambony / Ampefiloha → Ambolokandrina",
    variants: [
      {
        color: "rouge",
        route: "Bibilava → Ambohijatovo Ambony",
      },
      {
        color: "bleu",
        route: "Bibilava → Ampefiloha",
      },
    ],
  },
  {
    id: "183",
    code: "183",
    name: "Ligne 183",
    category: "urbaine",
    primus: "67 Ha",
    terminus: "Androhibe",
    route:
      "67 Ha → CENAM → Ampefiloha → Anosy → Ambohidahy → Analakely → Soarano → Behoririka → Andravoahangy → Ambodivona → Manjakaray → Ambatomainty → Amboditsiry → Analamahitsy → Lycée Ambatobe / Androhibe",
  },
  {
    id: "184",
    code: "184",
    name: "Ligne 184",
    category: "urbaine",
    primus: "Ambanidia",
    terminus: "Mahamasina",
    route: "Ambanidia → Mahamasina",
  },
  {
    id: "186",
    code: "186",
    name: "Ligne 186",
    category: "urbaine",
    primus: "67 Ha / Analamahitsy",
    terminus: "Antsonjombe / Mascar",
    route: "67 Ha → Antsonjombe ; variante Analamahitsy → Mascar",
    variants: [
      {
        code: "186-67HA",
        route: "67 Ha → Antsonjombe",
      },
      {
        code: "186-ANALAMAHITSY",
        route: "Analamahitsy → Mascar",
      },
    ],
  },
  {
    id: "187",
    code: "187",
    name: "Ligne 187",
    category: "urbaine",
    primus: "67 Ha",
    terminus: "Fiadanamanga (Iavoloha)",
    route: "67 Ha → Fiadanamanga (Iavoloha)",
  },
  {
    id: "192",
    code: "192",
    name: "Ligne 192",
    category: "urbaine",
    primus: "Ilafy",
    terminus: "Ambohimangakely / Bypass",
    route: "Ilafy → Nanisana → Ampahibe → Bypass",
    vehicle: "Midibus",
    operator: "Onja",
    variants: [
      {
        color: "bleu",
        route: "Ilafy → Nanisana → Ampahibe → Bypass",
      },
      {
        color: "blanc",
        route: "Ilafy → Ankorondrano → Behoririka → Bypass",
      },
      {
        code: "Class",
        route: "Ilafy → Analakely → Bypass",
      },
    ],
  },
  {
    id: "193",
    code: "193",
    name: "Ligne 193",
    category: "urbaine",
    primus: "Antanetibe",
    terminus: "Ambanilalana",
    route: "Antanetibe → Ambanilalana",
  },
  {
    id: "194",
    code: "194",
    name: "Ligne 194",
    category: "urbaine",
    primus: "Mausolée",
    terminus: "Andranomena",
    route: "Mausolée → Andranomena",
    vehicle: "Midibus",
    operator: "Mirindra",
    variants: [
      {
        color: "vert",
        route: "Alasora → Anosizato → Andranomena",
      },
      {
        color: "rouge",
        route: "Mausolée → Andravoahangy → Andranomena",
      },
      {
        color: "bleu",
        route: "Mausolée → Analamahintsy → Andranomena",
      },
    ],
  },
  {
    id: "196",
    code: "196",
    name: "Ligne 196",
    category: "urbaine",
    primus: "Analakely",
    terminus: "Andranovory / Ravitoto",
    route: "Analakely → Andranovory / Ravitoto",
  },
  {
    id: "199",
    code: "199",
    name: "Ligne 199",
    category: "urbaine",
    primus: "Anosivavaka",
    terminus: "Tanjombato",
    route: "Anosivavaka → Tanjombato",
  },

  // Lignes suburbaines publiquement recensées.
  {
    id: "A",
    code: "A",
    name: "Ligne suburbaine A",
    category: "suburbaine",
    primus: "Antananarivo - Vassacos",
    terminus: "Mahitsy",
    route: "Antananarivo - Vassacos → Mahitsy",
    vehicle: "Midibus",
  },
  {
    id: "B",
    code: "B",
    name: "Ligne suburbaine B",
    category: "suburbaine",
    primus: "Antananarivo - 67 Ha",
    terminus: "Ambohitrimanjaka / Ampangabe",
    route: "Antananarivo - 67 Ha → Ambohitrimanjaka / Ampangabe",
    vehicle: "Midibus",
  },
  {
    id: "D",
    code: "D",
    name: "Ligne suburbaine D",
    category: "suburbaine",
    primus: "Antananarivo - Vassacos",
    terminus: "Ivato / Ambohidratrimo",
    route: "Antananarivo - Vassacos → Ivato / Ambohidratrimo",
    vehicle: "Midibus",
  },
  {
    id: "E",
    code: "E",
    name: "Ligne suburbaine E",
    category: "suburbaine",
    primus: "Antananarivo - Mahazo",
    terminus: "Anjeva - Gare",
    route: "Antananarivo - Mahazo → Anjeva - Gare",
    vehicle: "Midibus",
  },
  {
    id: "F",
    code: "F",
    name: "Ligne suburbaine F",
    category: "suburbaine",
    primus: "Antananarivo - Cnaps Ampefiloha",
    terminus: "Amboanjobe",
    route: "Antananarivo - Cnaps Ampefiloha → Amboanjobe",
    vehicle: "Midibus",
  },
  {
    id: "H",
    code: "H",
    name: "Ligne suburbaine H",
    category: "suburbaine",
    primus: "Antananarivo - Anosibe",
    terminus: "Antsahandita",
    route: "Antananarivo - Anosibe → Antsahandita",
    vehicle: "Midibus",
  },
  {
    id: "I",
    code: "I",
    name: "Ligne suburbaine I",
    category: "suburbaine",
    primus: "Antananarivo - Ambohijatovo Ambony",
    terminus: "Anjeva",
    route: "Antananarivo - Ambohijatovo Ambony → Anjeva",
    vehicle: "Midibus",
  },
  {
    id: "J",
    code: "J",
    name: "Ligne suburbaine J",
    category: "suburbaine",
    primus: "Antananarivo - Ambodivona",
    terminus: "Talata Volonondry",
    route: "Antananarivo - Ambodivona → Talata Volonondry",
    vehicle: "Midibus",
    notes:
      "Certaines sources anciennes utilisent une autre lettre pour cette liaison ; à vérifier avant déploiement.",
  },
];

export const urbanBusLines = busLines.filter(
  (line) => line.category === "urbaine",
);

export const findBusLine = (code: string) =>
  busLines.find((line) => line.code.toLowerCase() === code.toLowerCase());

export default busLines;

// ----- Adaptation pour l'application (format attendu par les écrans) -----

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Stop = {
  id: string;
  name: string;
  address?: string;
  coordinates: Coordinates;
};

export type Route = {
  id: string;
  name: string;
  schedule?: string;
  color?: string;
  stops: Stop[];
};

export type Bus = {
  id: string;
  number: string;
  name: string;
  cooperative: string;
  category: BusCategory;
  routes: Route[];
  description?: string;
  isFavorite?: boolean;
};

// Build a minimal `busData` array from the existing `busLines` dataset.
// A small location map to resolve common stop names to coordinates.
const locationMap: Record<string, Coordinates> = {
  analakely: { latitude: -18.9061, longitude: 47.5258 },
  mahamasina: { latitude: -18.9078, longitude: 47.5253 },
  ambohijatovo: { latitude: -18.9027, longitude: 47.5267 },
  anosy: { latitude: -18.9109, longitude: 47.5289 },
  isoraka: { latitude: -18.9008, longitude: 47.5301 },
  "67 ha": { latitude: -18.8956, longitude: 47.5389 },
  androndra: { latitude: -18.9035, longitude: 47.5279 },
  ampefiloha: { latitude: -18.9048, longitude: 47.5342 },
  ankadifotsy: { latitude: -18.9085, longitude: 47.5371 },
  antanimena: { latitude: -18.8845, longitude: 47.5189 },
  anosizato: { latitude: -18.8882, longitude: 47.5117 },
  ampond: { latitude: -18.9, longitude: 47.52 },
  itaosy: { latitude: -18.8928, longitude: 47.4967 },
  behoririka: { latitude: -18.9142, longitude: 47.5271 },
  ambanidia: { latitude: -18.905, longitude: 47.529 },
  amboditsiry: { latitude: -18.8789, longitude: 47.5378 },
  tanjombato: { latitude: -18.8545, longitude: 47.4589 },
  antsonjombe: { latitude: -18.9, longitude: 47.52 },
  andranomena: { latitude: -18.91, longitude: 47.53 },
  analamahitsy: { latitude: -18.895, longitude: 47.52 },
  ambohipo: { latitude: -18.91, longitude: 47.52 },
};

const normalizeToken = (t: string) =>
  t
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9\s]/gi, "")
    .trim();

const parseRouteToStops = (route?: string, baseId?: string): Stop[] => {
  if (!route) return [];

  // Split on arrows, semicolons, slashes or commas
  const parts = route
    .split(/→|->|;|\/|,|·|–|—/)
    .map((p) => p.trim())
    .filter(Boolean);

  const stops: Stop[] = [];
  parts.forEach((part, idx) => {
    const token = normalizeToken(part);
    const coords = locationMap[token] || {
      latitude: -18.9061 + idx * 0.001,
      longitude: 47.5258 + idx * 0.001,
    };
    stops.push({
      id: `${baseId || "line"}-s${idx + 1}`,
      name: part,
      address: part,
      coordinates: coords,
    });
  });

  return stops;
};
export const busData: Bus[] = busLines.map((line) => {
  const baseId = String(line.id || line.code || "");

  const defaultRoute: Route = {
    id: `${baseId}-r1`,
    name: line.name || line.route || line.code,
    schedule: undefined,
    color: undefined,
    stops:
      line.stops && line.stops.length > 0
        ? (line.stops || []).map((s, i) => ({
            id: `${baseId}-s${i + 1}`,
            name: s.name || `Arrêt ${i + 1}`,
            address: s.name,
            coordinates: {
              latitude: s.latitude ?? -18.9061,
              longitude: s.longitude ?? 47.5258,
            },
          }))
        : parseRouteToStops(line.route, baseId),
  };

  // If there are explicit variants create additional routes
  const variantRoutes: Route[] = (line.variants || []).map((v, idx) => ({
    id: `${baseId}-v${idx + 1}`,
    name: v.code || `${line.code} variante ${idx + 1}`,
    schedule: undefined,
    color: v.color,
    stops: v.route ? parseRouteToStops(v.route, `${baseId}-v${idx + 1}`) : [],
  }));

  return {
    id: baseId,
    number: line.code,
    name: line.name,
    cooperative: line.operator || line.primus || "",
    category: line.category,
    routes: [defaultRoute, ...variantRoutes],
    description: line.notes,
    isFavorite: false,
  } as Bus;
});

const FAVORITES_KEY = "EGO_FAVORITES_v1";
let favoriteIds = new Set<string>();

// Initialize favorites from SecureStore without blocking module usage.
(async () => {
  try {
    const raw = await SecureStore.getItemAsync(FAVORITES_KEY);
    if (raw) {
      const arr = JSON.parse(raw) as string[];
      arr.forEach((id) => favoriteIds.add(id));
      // update busData flags
      busData.forEach((b) => (b.isFavorite = favoriteIds.has(b.id)));
    }
  } catch {
    // ignore errors silently — app can continue with empty favorites
  }
})();

export const getFavorites = (): Bus[] => {
  return busData.filter((b) => favoriteIds.has(b.id));
};

export const toggleFavorite = (busId: string) => {
  if (favoriteIds.has(busId)) {
    favoriteIds.delete(busId);
  } else {
    favoriteIds.add(busId);
  }
  // Update in-memory flag immediately for UI
  const b = busData.find((x) => x.id === busId);
  if (b) b.isFavorite = favoriteIds.has(busId);

  // Persist in background
  SecureStore.setItemAsync(
    FAVORITES_KEY,
    JSON.stringify([...favoriteIds]),
  ).catch(() => {});
};

export const fetchBusLinesFromAPI = async (): Promise<Bus[]> => {
  // Simulate async fetch, return mapped `busData`.
  return new Promise((res) => setTimeout(() => res(busData), 150));
};

export { busLines as rawBusLines };

// Merge user-provided precise stops if the overrides file exists.
try {
   
  const overrides = require("./busStops.overrides.json");
  if (overrides && Array.isArray(overrides.buses)) {
    overrides.buses.forEach((ov: any) => {
      const b = busData.find((x) => x.id === ov.id || x.number === ov.number);
      if (!b) return;
      if (Array.isArray(ov.routes)) {
        ov.routes.forEach((rOv: any) => {
          const route =
            b.routes.find((r) => r.id === rOv.id || r.name === rOv.name) ||
            b.routes[0];
          if (!route) return;
          if (Array.isArray(rOv.stops) && rOv.stops.length > 0) {
            // Replace stops for this route with the provided precise stops
            route.stops = rOv.stops.map((s: any, i: number) => ({
              id: s.id || `${b.id}-s${i + 1}`,
              name: s.name || s.address || `Arrêt ${i + 1}`,
              address: s.address,
              coordinates: {
                latitude: Number(s.coordinates?.latitude) || -18.9061,
                longitude: Number(s.coordinates?.longitude) || 47.5258,
              },
            }));
          }
        });
      }
    });
  }
} catch (_) {
  // No overrides present — fine.
}
