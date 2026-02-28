export interface DeliveryZone {
  name: string;
  charge: number;
  sectors: number[];
}

export const deliveryZones: DeliveryZone[] = [
  { name: "Zone 1", charge: 20, sectors: [13, 14, 15] },
  { name: "Zone 2", charge: 25, sectors: [10, 11, 12, 16] },
  { name: "Zone 3", charge: 30, sectors: [8, 9, 17, 18, 19, 20] },
  { name: "Zone 4", charge: 35, sectors: [6, 7, 21, 22, 23, 24, 25, 26] },
  { name: "Zone 5", charge: 40, sectors: [1, 2, 3, 4, 5, 27, 28, 29, 30, 31, 32] },
];

export interface SectorInfo {
  sector: number;
  zone: DeliveryZone;
}

export const getAllSectors = (): SectorInfo[] => {
  const sectors: SectorInfo[] = [];
  deliveryZones.forEach(zone => {
    zone.sectors.forEach(sector => {
      sectors.push({ sector, zone });
    });
  });
  return sectors.sort((a, b) => a.sector - b.sector);
};

export const getZoneBySector = (sector: number): DeliveryZone | undefined => {
  return deliveryZones.find(zone => zone.sectors.includes(sector));
};

export const generateOrderId = (): string => {
  const year = new Date().getFullYear();
  const stored = localStorage.getItem('kovish_order_counter');
  let counter = stored ? parseInt(stored, 10) + 1 : 1;
  localStorage.setItem('kovish_order_counter', counter.toString());
  return `KOV-${year}-${counter.toString().padStart(4, '0')}`;
};
