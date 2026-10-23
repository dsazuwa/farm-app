import type { User, Farm, Sector, Membership, SectorAccess } from '../types';

const timestamp = '2026-10-22T12:00:00.000Z';

export const users: User[] = [
  {
    id: 'user-patrick',
    name: 'Patrick Okafor',
    email: 'patrick@example.com',
    createdAt: timestamp,
  },
  {
    id: 'user-nelson',
    name: 'Nelson Eze',
    email: 'nelson@example.com',
    createdAt: timestamp,
  },
  {
    id: 'user-danielle',
    name: 'Danielle Osazuwa',
    email: 'danielle@example.com',
    createdAt: timestamp,
  },
  {
    id: 'user-okpara',
    name: 'Okpara Nwosu',
    email: 'okpara@example.com',
    createdAt: timestamp,
  },
  {
    id: 'user-christopher',
    name: 'Christopher Obi',
    email: 'christopher@example.com',
    createdAt: timestamp,
  },
  {
    id: 'user-chidera',
    name: 'Chidera Onyekachi',
    email: 'chidera@example.com',
    createdAt: timestamp,
  },
  {
    id: 'user-jerry',
    name: 'Jerry Adebayo',
    email: 'jerry@example.com',
    createdAt: timestamp,
  },
  {
    id: 'user-michael',
    name: 'Michael Iheanacho',
    email: 'michael@example.com',
    createdAt: timestamp,
  },
  {
    id: 'user-marcus',
    name: 'Marcus Ojo',
    email: 'marcus@example.com',
    createdAt: timestamp,
  },
  {
    id: 'user-miracle',
    name: 'Miracle Umeh',
    email: 'miracle@example.com',
    createdAt: timestamp,
  },
  {
    id: 'user-alex',
    name: 'Alex Chukwu',
    email: 'alex@example.com',
    createdAt: timestamp,
  },
];

export const farms: Farm[] = [
  {
    id: 'farm-asaba',
    name: 'Afumnaza Farm',
    location: 'Asaba, Delta',
    currency: 'NGN',
    status: 'active',
    archivedAt: null,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: 'farm-okpara',
    name: 'Okpara Layers Farm',
    location: 'Ughelli, Delta',
    currency: 'NGN',
    status: 'active',
    archivedAt: null,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: 'farm-farm-fresh',
    name: 'Farm Fresh',
    location: 'Asaba, Delta',
    currency: 'NGN',
    status: 'active',
    archivedAt: null,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
];

export const sectors: Sector[] = [
  {
    id: 'sector-asaba-layers',
    farmId: 'farm-asaba',
    type: 'layers',
    status: 'active',
    archivedAt: null,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: 'sector-asaba-broilers',
    farmId: 'farm-asaba',
    type: 'broilers',
    status: 'active',
    archivedAt: null,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: 'sector-asaba-piggery',
    farmId: 'farm-asaba',
    type: 'piggery',
    status: 'active',
    archivedAt: null,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: 'sector-asaba-fishery',
    farmId: 'farm-asaba',
    type: 'fishery',
    status: 'active',
    archivedAt: null,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: 'sector-asaba-crops',
    farmId: 'farm-asaba',
    type: 'crops',
    status: 'active',
    archivedAt: null,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: 'sector-okpara-layers',
    farmId: 'farm-okpara',
    type: 'layers',
    status: 'active',
    archivedAt: null,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: 'sector-farm-fresh-piggery',
    farmId: 'farm-farm-fresh',
    type: 'piggery',
    status: 'active',
    archivedAt: null,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
];

const allSectors: SectorAccess = {
  scope: 'all',
};

const layersOnly: SectorAccess = {
  scope: 'selected',
  sectors: [{ sectorId: 'sector-asaba-layers' }],
};

const broilersOnly: SectorAccess = {
  scope: 'selected',
  sectors: [{ sectorId: 'sector-asaba-broilers' }],
};

const piggeryOnly: SectorAccess = {
  scope: 'selected',
  sectors: [{ sectorId: 'sector-asaba-piggery' }],
};

const fisheryOnly: SectorAccess = {
  scope: 'selected',
  sectors: [{ sectorId: 'sector-asaba-fishery' }],
};

export const memberships: Membership[] = [
  {
    id: 'membership-patrick',
    userId: 'user-patrick',
    farmId: 'farm-asaba',
    role: 'owner',
    sectorAccess: allSectors,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: 'membership-nelson',
    userId: 'user-nelson',
    farmId: 'farm-asaba',
    role: 'manager',
    sectorAccess: allSectors,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: 'membership-danielle',
    userId: 'user-danielle',
    farmId: 'farm-asaba',
    role: 'manager',
    sectorAccess: allSectors,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: 'membership-okpara',
    userId: 'user-okpara',
    farmId: 'farm-asaba',
    role: 'viewer',
    sectorAccess: allSectors,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: 'membership-christopher',
    userId: 'user-christopher',
    farmId: 'farm-asaba',
    role: 'attendant',
    sectorAccess: piggeryOnly,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: 'membership-chidera',
    userId: 'user-chidera',
    farmId: 'farm-asaba',
    role: 'attendant',
    sectorAccess: {
      scope: 'selected',
      sectors: [
        { sectorId: 'sector-asaba-layers' },
        { sectorId: 'sector-asaba-crops' },
      ],
    },
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: 'membership-jerry',
    userId: 'user-jerry',
    farmId: 'farm-asaba',
    role: 'attendant',
    sectorAccess: broilersOnly,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: 'membership-michael',
    userId: 'user-michael',
    farmId: 'farm-asaba',
    role: 'attendant',
    sectorAccess: layersOnly,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: 'membership-marcus',
    userId: 'user-marcus',
    farmId: 'farm-asaba',
    role: 'attendant',
    sectorAccess: fisheryOnly,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: 'membership-miracle',
    userId: 'user-miracle',
    farmId: 'farm-asaba',
    role: 'attendant',
    sectorAccess: piggeryOnly,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: 'membership-okpara-owner',
    userId: 'user-okpara',
    farmId: 'farm-okpara',
    role: 'owner',
    sectorAccess: { scope: 'all' },
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: 'membership-danielle-okpara',
    userId: 'user-danielle',
    farmId: 'farm-okpara',
    role: 'manager',
    sectorAccess: { scope: 'all' },
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: 'membership-alex-okpara',
    userId: 'user-alex',
    farmId: 'farm-okpara',
    role: 'manager',
    sectorAccess: { scope: 'all' },
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: 'membership-danielle-farm-fresh',
    userId: 'user-danielle',
    farmId: 'farm-farm-fresh',
    role: 'owner',
    sectorAccess: { scope: 'all' },
    createdAt: timestamp,
    updatedAt: timestamp,
  },
];

export const seedData = {
  users,
  farms,
  sectors,
  memberships,
  invitations: [],
};
