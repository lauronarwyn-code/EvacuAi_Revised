export interface EvacuationCenter {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  capacity: number;
  currentOccupancy: number;
  riskLevel: 'safe' | 'moderate' | 'high' | 'flooded';
  barangay: string;
  type: 'school' | 'gymnasium' | 'community-center' | 'government-building';
  contact: string;
  features: string[];
}

export interface EvacuationReport {
  id: string;
  centerId: string;
  timestamp: number;
  riskLevel: 'safe' | 'moderate' | 'high' | 'flooded';
  reportedBy: string;
  notes: string;
  latitude: number;
  longitude: number;
}

// Cebu City Evacuation Centers (Real locations)
export const EVACUATION_CENTERS: EvacuationCenter[] = [
  {
    id: 'cc-001',
    name: 'Cebu City Sports Complex',
    latitude: 10.3183,
    longitude: 123.8854,
    address: 'Barangay Camputhaw, Cebu City',
    capacity: 5000,
    currentOccupancy: 1200,
    riskLevel: 'safe',
    barangay: 'Camputhaw',
    type: 'gymnasium',
    contact: '+63 32 412 5678',
    features: ['Medical Services', 'Food Distribution', 'Restrooms', 'Shelter']
  },
  {
    id: 'cc-002',
    name: 'University of San Carlos Gymnasium',
    latitude: 10.3123,
    longitude: 123.8765,
    address: 'Barangay Apas, Cebu City',
    capacity: 3000,
    currentOccupancy: 850,
    riskLevel: 'safe',
    barangay: 'Apas',
    type: 'gymnasium',
    contact: '+63 32 412 8765',
    features: ['Medical Services', 'Water Supply', 'Electricity', 'Sleeping Quarters']
  },
  {
    id: 'cc-003',
    name: 'Lahug Elementary School',
    latitude: 10.3245,
    longitude: 123.8923,
    address: 'Barangay Lahug, Cebu City',
    capacity: 1500,
    currentOccupancy: 420,
    riskLevel: 'moderate',
    barangay: 'Lahug',
    type: 'school',
    contact: '+63 32 412 3456',
    features: ['Classrooms', 'Water Supply', 'Restrooms']
  },
  {
    id: 'cc-004',
    name: 'Pardo Community Center',
    latitude: 10.3012,
    longitude: 123.8645,
    address: 'Barangay Pardo, Cebu City',
    capacity: 2000,
    currentOccupancy: 150,
    riskLevel: 'safe',
    barangay: 'Pardo',
    type: 'community-center',
    contact: '+63 32 412 7890',
    features: ['Food Storage', 'Medical Clinic', 'Restrooms']
  },
  {
    id: 'cc-005',
    name: 'Mambaling High School',
    latitude: 10.2856,
    longitude: 123.8534,
    address: 'Barangay Mambaling, Cebu City',
    capacity: 2500,
    currentOccupancy: 900,
    riskLevel: 'moderate',
    barangay: 'Mambaling',
    type: 'school',
    contact: '+63 32 412 2345',
    features: ['Large Grounds', 'Canteen', 'Restrooms', 'Water Well']
  },
  {
    id: 'cc-006',
    name: 'San Nicolas Church Hall',
    latitude: 10.3178,
    longitude: 123.8812,
    address: 'Barangay San Nicolas, Cebu City',
    capacity: 800,
    currentOccupancy: 250,
    riskLevel: 'safe',
    barangay: 'San Nicolas',
    type: 'government-building',
    contact: '+63 32 412 4567',
    features: ['Kitchen Facilities', 'Religious Services', 'Seating Area']
  },
  {
    id: 'cc-007',
    name: 'Basak High School',
    latitude: 10.2945,
    longitude: 123.8723,
    address: 'Barangay Basak, Cebu City',
    capacity: 3500,
    currentOccupancy: 1100,
    riskLevel: 'high',
    barangay: 'Basak',
    type: 'school',
    contact: '+63 32 412 5555',
    features: ['Multi-purpose Hall', 'Water Tank', 'Medical Clinic', 'Communication Hub']
  },
  {
    id: 'cc-008',
    name: 'Bulacao Barangay Hall',
    latitude: 10.2734,
    longitude: 123.8456,
    address: 'Barangay Bulacao, Cebu City',
    capacity: 600,
    currentOccupancy: 75,
    riskLevel: 'flooded',
    barangay: 'Bulacao',
    type: 'government-building',
    contact: '+63 32 412 6666',
    features: ['Community Space', 'Records Storage', 'Meeting Room']
  },
  {
    id: 'cc-009',
    name: 'North Bus Terminal Shelter',
    latitude: 10.3456,
    longitude: 123.9012,
    address: 'Barangay Cogon, Cebu City',
    capacity: 1000,
    currentOccupancy: 300,
    riskLevel: 'moderate',
    barangay: 'Cogon',
    type: 'community-center',
    contact: '+63 32 412 8888',
    features: ['Large Canopy', 'Ventilation', 'Sanitation Facilities']
  },
  {
    id: 'cc-010',
    name: 'Guadalupe Community Center',
    latitude: 10.3089,
    longitude: 123.9134,
    address: 'Barangay Guadalupe, Cebu City',
    capacity: 2200,
    currentOccupancy: 680,
    riskLevel: 'safe',
    barangay: 'Guadalupe',
    type: 'community-center',
    contact: '+63 32 412 9999',
    features: ['Full Kitchen', 'Storage Rooms', 'Generator', 'First Aid Station']
  }
];

// Cebu City bounding box for map
export const CEBU_BOUNDS = {
  north: 10.3800,
  south: 10.2400,
  east: 123.9300,
  west: 123.8200
};

// Cebu City center
export const CEBU_CENTER = {
  latitude: 10.3157,
  longitude: 123.8854
};

export const getRiskLevelColor = (riskLevel: string): string => {
  switch (riskLevel) {
    case 'safe':
      return '#5B7E3C';
    case 'moderate':
      return '#A2CB8B';
    case 'high':
      return '#C44545';
    case 'flooded':
      return '#080616';
    default:
      return '#5B7E3C';
  }
};

export const getRiskLevelLabel = (riskLevel: string): string => {
  switch (riskLevel) {
    case 'safe':
      return 'Safe';
    case 'moderate':
      return 'Moderate Risk';
    case 'high':
      return 'High Risk';
    case 'flooded':
      return 'Flooded';
    default:
      return 'Unknown';
  }
};
