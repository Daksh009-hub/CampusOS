import { Router } from 'express';
import { createClub } from '../controllers/clubController.js';

const router = Router();

router.post('/', createClub);

export default router;