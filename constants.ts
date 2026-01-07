
import { Vehicle } from './types';

export const VEHICLES: Vehicle[] = [
  {
    id: '1',
    brand: 'FOTON',
    model: 'PICKUP',
    year: '2024',
    price: 'Consultar',
    location: 'Lima, Perú',
    images: [
      '/fleet/foton-fleet-1.jpeg',
      '/fleet/foton-fleet-2.jpg',
      '/fleet/foton-fleet-3.jpg'
    ],
    description: 'Camiones FOTON alineados frente a centro logístico. Soluciones de carga pesada adaptadas al mercado peruano.',
    hp: 150,
    engine: 'Diesel 3.0L',
    acceleration: 'N/A',
    topSpeed: '120 km/h',
    lat: -12.0464,
    lng: -77.0428
  },
  {
    id: '2',
    brand: 'FOTON',
    model: 'VAN',
    year: '2024',
    price: 'Consultar',
    location: 'Lima, Perú',
    images: [
      '/fleet/foton-fleet-2.jpg',
      '/fleet/foton-fleet-1.jpeg',
      '/fleet/foton-fleet-3.jpg'
    ],
    description: 'Flota de vehículos ligeros FOTON en exhibición. Eficiencia para transporte urbano y distribución de última milla.',
    hp: 110,
    engine: 'Diesel 2.5L',
    acceleration: 'N/A',
    topSpeed: '110 km/h',
    lat: -12.0464,
    lng: -77.0428
  },
  {
    id: '3',
    brand: 'FOTON',
    model: 'MINITRUCK',
    year: '2024',
    price: 'Consultar',
    location: 'Lima, Perú',
    images: [
      '/fleet/foton-fleet-3.jpg',
      '/fleet/foton-fleet-1.jpeg',
      '/fleet/foton-fleet-2.jpg'
    ],
    description: 'Camión FOTON en carretera andina. Rendimiento comprobado en rutas de alta exigencia.',
    hp: 130,
    engine: 'Diesel 2.8L',
    acceleration: 'N/A',
    topSpeed: '100 km/h',
    lat: -12.0464,
    lng: -77.0428
  }
];
