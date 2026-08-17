import { Router, Request, Response } from 'express';

export interface CampusEventDTO {
  id: string;
  title: string;
  organizer: string;
  category: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registeredCount: number;
  price: string;
  isRSVPed: boolean;
}

export class CampusEventService {
  private events: CampusEventDTO[] = [
    {
      id: 'evt-101',
      title: 'Annual Campus AI & Machine Learning Hackathon 2026',
      organizer: 'Computer Science Society',
      category: 'Hackathon',
      date: '2026-09-15',
      time: '09:00 AM - 09:00 PM',
      location: 'Innovation Hub, Main Auditorium',
      capacity: 250,
      registeredCount: 198,
      price: 'Free',
      isRSVPed: false,
    },
    {
      id: 'evt-102',
      title: 'Quantum Computing Frontiers & Biophysics Symposium',
      organizer: 'Department of Physics & Bioengineering',
      category: 'Symposium',
      date: '2026-09-20',
      time: '01:30 PM - 06:00 PM',
      location: 'Science Complex, Lecture Hall B',
      capacity: 120,
      registeredCount: 112,
      price: 'Free',
      isRSVPed: false,
    },
  ];

  public getEvents(category?: string): CampusEventDTO[] {
    if (!category || category === 'All') return this.events;
    return this.events.filter(e => e.category === category);
  }

  public rsvpEvent(eventId: string, userId: string): CampusEventDTO | null {
    const event = this.events.find(e => e.id === eventId);
    if (!event) return null;

    if (event.registeredCount < event.capacity) {
      event.registeredCount += 1;
      event.isRSVPed = true;
    }
    return event;
  }

  public cancelRSVP(eventId: string, userId: string): CampusEventDTO | null {
    const event = this.events.find(e => e.id === eventId);
    if (!event) return null;

    if (event.registeredCount > 0) {
      event.registeredCount -= 1;
      event.isRSVPed = false;
    }
    return event;
  }
}

const eventService = new CampusEventService();
const eventRouter = Router();

eventRouter.get('/events', (req: Request, res: Response) => {
  const { category } = req.query;
  const items = eventService.getEvents(category as string);
  res.json({ success: true, data: items });
});

eventRouter.post('/events/:id/rsvp', (req: Request, res: Response) => {
  const updated = eventService.rsvpEvent(req.params.id, 'usr-demo');
  if (!updated) return res.status(404).json({ success: false, error: 'Event not found' });
  res.json({ success: true, data: updated });
});

eventRouter.post('/events/:id/cancel-rsvp', (req: Request, res: Response) => {
  const updated = eventService.cancelRSVP(req.params.id, 'usr-demo');
  if (!updated) return res.status(404).json({ success: false, error: 'Event not found' });
  res.json({ success: true, data: updated });
});

export default eventRouter;
