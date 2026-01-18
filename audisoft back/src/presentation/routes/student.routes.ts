import { Router } from 'express';
import { StudentController } from '../controllers/StudentController';

const router = Router();
const studentController = new StudentController();

router.post('/', (req, res) => studentController.create(req, res));
router.get('/', (req, res) => studentController.getAll(req, res));
router.get('/:id', (req, res) => studentController.getById(req, res));
router.put('/:id', (req, res) => studentController.update(req, res));
router.delete('/:id', (req, res) => studentController.delete(req, res));

export { router as studentRoutes };
