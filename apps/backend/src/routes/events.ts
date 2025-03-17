import { Router } from 'express';
import { Event } from '../entities';
import AppDataSource from '../db';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const events = await AppDataSource.getRepository(Event).find();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { event_name, odds } = req.body;

    if (!event_name || !odds) {
      res.status(400).json({ error: 'Event name and odds are required' });
      return;
    }

    if (odds <= 0) {
      res.status(400).json({ error: 'Odds must be greater than zero' });
      return;
    }

    const event = AppDataSource.getRepository(Event).create({ event_name, odds });
    await AppDataSource.getRepository(Event).save(event);

    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { event_name, odds } = req.body;

    if (!event_name || !odds) {
      res.status(400).json({ error: 'Event name and odds are required' });
      return;
    }

    if (odds <= 0) {
      res.status(400).json({ error: 'Odds must be greater than zero' });
      return;
    }

    const eventRepo = AppDataSource.getRepository(Event);
    const event = await eventRepo.findOneBy({ event_id: Number(id) });

    if (!event) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }

    event.event_name = event_name;
    event.odds = odds;

    await eventRepo.save(event);

    res.json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const eventRepo = AppDataSource.getRepository(Event);
    const result = await eventRepo.delete(Number(id));

    if (result.affected === 0) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }

    res.json({ message: 'Event deleted' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

export default router;
