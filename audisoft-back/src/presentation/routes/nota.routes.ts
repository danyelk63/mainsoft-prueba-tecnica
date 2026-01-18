import { Router } from 'express';
import { GradeController } from '../controllers/GradeController';

const router = Router();
const gradeController = new GradeController();

router.post('/', (req, res) => gradeController.create(req, res));
router.get('/', (req, res) => gradeController.getAll(req, res));
router.get('/:id', (req, res) => gradeController.getById(req, res));
router.put('/:id', (req, res) => gradeController.update(req, res));
router.delete('/:id', (req, res) => gradeController.delete(req, res));

export { router as gradeRoutes };
