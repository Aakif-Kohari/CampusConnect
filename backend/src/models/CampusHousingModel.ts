export interface PosterMetadataDTO {
  posterId: string;
  posterName: string;
  studentEmail: string;
  isIdentityVerified: boolean;
}

export class CampusHousingModel {
  public id: string;
  public propertyTitle: string;
  public streetAddress: string;
  public leaseDuration: string;
  public monthlyRentUSD: number;
  public securityDepositUSD: number;
  public roomLayout: 'Private Studio' | 'Private Room (Shared Bath)' | 'Entire Apartment';
  public utilitiesIncluded: boolean;
  public furnished: boolean;
  public poster: PosterMetadataDTO;
  public status: 'AVAILABLE' | 'PENDING_LEASE' | 'LEASED';
  public createdAt: string;

  constructor(data: Partial<CampusHousingModel>) {
    this.id = data.id || `sub_${Math.random().toString(36).substr(2, 9)}`;
    this.propertyTitle = data.propertyTitle || 'Campus Sublet Property';
    this.streetAddress = data.streetAddress || 'University Ave';
    this.leaseDuration = data.leaseDuration || 'Summer Semester';
    this.monthlyRentUSD = data.monthlyRentUSD || 800;
    this.securityDepositUSD = data.securityDepositUSD || 400;
    this.roomLayout = data.roomLayout || 'Private Studio';
    this.utilitiesIncluded = data.utilitiesIncluded ?? true;
    this.furnished = data.furnished ?? true;
    this.poster = data.poster || {
      posterId: 'usr_post_1',
      posterName: 'Student Host',
      studentEmail: 'host@campus.edu',
      isIdentityVerified: true,
    };
    this.status = data.status || 'AVAILABLE';
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  public toJSON() {
    return {
      id: this.id,
      propertyTitle: this.propertyTitle,
      streetAddress: this.streetAddress,
      leaseDuration: this.leaseDuration,
      monthlyRentUSD: this.monthlyRentUSD,
      securityDepositUSD: this.securityDepositUSD,
      roomLayout: this.roomLayout,
      utilitiesIncluded: this.utilitiesIncluded,
      furnished: this.furnished,
      poster: this.poster,
      status: this.status,
      createdAt: this.createdAt,
    };
  }
}
