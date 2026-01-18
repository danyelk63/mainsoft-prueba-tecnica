import { Router } from 'express';
import { GradeController } from '../controllers/GradeController';

const router = Router();
const gradeController = new GradeController();

router.post('/', (req, res) => gradeController.create(req, res));
router.get('/filter', (req, res) => gradeController.getByStudentOrTeacher(req, res));
router.get('/', (req, res) => gradeController.getAll(req, res));
router.get('/:id', (req, res) => {
  // Verificar que no sea 'filter' para evitar conflictos con la ruta /filter
  if (req.params.id === 'filter') {
    return res.status(404).json({ error: 'Route not found' });
  }
  return gradeController.getById(req, res);
});
router.put('/:id', (req, res) => gradeController.update(req, res));
router.delete('/:id', (req, res) => gradeController.delete(req, res));

export { router as gradeRoutes };
