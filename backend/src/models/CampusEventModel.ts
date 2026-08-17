export interface EventOrganizerDTO {
  id: string;
  name: string;
  avatarUrl: string;
  verifiedOrganization: boolean;
  contactEmail: string;
}

export interface EventTicketingModel {
  ticketTypeId: string;
  title: string;
  price: number;
  availableQuantity: number;
  maxPerUser: number;
}

export class CampusEventDTOModel {
  public id: string;
  public title: string;
  public description: string;
  public organizer: EventOrganizerDTO;
  public category: 'Hackathon' | 'Symposium' | 'Workshop' | 'Cultural' | 'Sports';
  public date: string;
  public timeRange: string;
  public location: string;
  public totalCapacity: number;
  public tickets: EventTicketingModel[];
  public createdAt: string;

  constructor(data: Partial<CampusEventDTOModel>) {
    this.id = data.id || `evt_${Math.random().toString(36).substr(2, 9)}`;
    this.title = data.title || 'Untitled Event';
    this.description = data.description || '';
    this.organizer = data.organizer || {
      id: 'org_default',
      name: 'Campus Life Board',
      avatarUrl: '',
      verifiedOrganization: true,
      contactEmail: 'events@campus.edu',
    };
    this.category = data.category || 'Workshop';
    this.date = data.date || new Date().toISOString().split('T')[0];
    this.timeRange = data.timeRange || '10:00 AM - 04:00 PM';
    this.location = data.location || 'Campus Center';
    this.totalCapacity = data.totalCapacity || 100;
    this.tickets = data.tickets || [
      {
        ticketTypeId: 'tkt_standard',
        title: 'General Admission',
        price: 0,
        availableQuantity: this.totalCapacity,
        maxPerUser: 1,
      },
    ];
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  public toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      organizer: this.organizer,
      category: this.category,
      date: this.date,
      timeRange: this.timeRange,
      location: this.location,
      totalCapacity: this.totalCapacity,
      tickets: this.tickets,
      createdAt: this.createdAt,
    };
  }
}
