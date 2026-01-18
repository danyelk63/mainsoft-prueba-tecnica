import { Router } from 'express';
import { TeacherController } from '../controllers/TeacherController';

const router = Router();
const teacherController = new TeacherController();

router.post('/', (req, res) => teacherController.create(req, res));
router.get('/', (req, res) => teacherController.getAll(req, res));
router.get('/:id', (req, res) => teacherController.getById(req, res));
router.put('/:id', (req, res) => teacherController.update(req, res));
router.delete('/:id', (req, res) => teacherController.delete(req, res));

export { router as teacherRoutes };
