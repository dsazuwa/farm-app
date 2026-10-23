export type FarmRole =
  'owner' | 'manager' | 'accountant' | 'attendant' | 'viewer';

export type SectorType =
  'layers' | 'broilers' | 'pullets' | 'crops' | 'piggery' | 'fishery';

export type ArchiveStatus = 'active' | 'archived';

export type User = {
  id: string;
  name: string;
  email: string;
  // avatarUrl: string | null;
  createdAt: string;
};

export type Farm = {
  id: string;
  name: string;
  location: string;
  currency: string;
  status: ArchiveStatus;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Sector = {
  id: string;
  farmId: string;
  type: SectorType;
  status: ArchiveStatus;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SectorAccess =
  { scope: 'all' } | { scope: 'selected'; sectors: SectorPermission[] };

export type SectorPermission = {
  sectorId: string;
};

export type Membership = {
  id: string;
  farmId: string;
  userId: string;
  role: FarmRole;
  sectorAccess: SectorAccess;
  createdAt: string;
  updatedAt: string;
};

export type InvitationStatus =
  'pending' | 'accepted' | 'declined' | 'cancelled' | 'expired';

export type Invitation = {
  id: string;
  farmId: string;
  email: string;
  role: Exclude<FarmRole, 'owner'>;
  sectorAccess: SectorAccess;
  status: InvitationStatus;
  createdAt: string;
  updatedAt: string;
};
