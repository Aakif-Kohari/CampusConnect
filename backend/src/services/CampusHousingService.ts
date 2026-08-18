import { Router, Request, Response } from 'express';

export interface SubletDTO {
  id: string;
  propertyTitle: string;
  location: string;
  monthlyRentUSD: number;
  depositUSD: number;
  roomType: string;
  posterName: string;
  isUtilitiesIncluded: boolean;
  status: string;
}

export class CampusHousingService {
  private sublets: SubletDTO[] = [
    {
      id: 'sub-601',
      propertyTitle: 'Modern Luxury Studio - 2 Mins Walk to Science Quad',
      location: '402 University Ave, Apartment 3B',
      monthlyRentUSD: 950,
      depositUSD: 500,
      roomType: 'Private Studio',
      posterName: 'Chloe Bennett',
      isUtilitiesIncluded: true,
      status: 'AVAILABLE',
    },
    {
      id: 'sub-602',
      propertyTitle: 'Spacious Master Bedroom in 4BDR Campus Townhouse',
      location: '118 College Ave, Townhouse #4',
      monthlyRentUSD: 720,
      depositUSD: 350,
      roomType: 'Private Room (Shared Bath)',
      posterName: 'Liam O\'Connor',
      isUtilitiesIncluded: false,
      status: 'AVAILABLE',
    },
  ];

  public getSublets(roomType?: string): SubletDTO[] {
    if (!roomType || roomType === 'All') return this.sublets;
    return this.sublets.filter(s => s.roomType === roomType);
  }

  public createSubletListing(payload: Omit<SubletDTO, 'id' | 'status'>): SubletDTO {
    const newListing: SubletDTO = {
      ...payload,
      id: `sub-${Date.now()}`,
      status: 'AVAILABLE',
    };
    this.sublets.push(newListing);
    return newListing;
  }
}

const housingService = new CampusHousingService();
const housingRouter = Router();

housingRouter.get('/housing/sublets', (req: Request, res: Response) => {
  const { roomType } = req.query;
  const items = housingService.getSublets(roomType as string);
  res.json({ success: true, data: items });
});

housingRouter.post('/housing/sublets', (req: Request, res: Response) => {
  const newItem = housingService.createSubletListing(req.body);
  res.json({ success: true, data: newItem });
});

export default housingRouter;
