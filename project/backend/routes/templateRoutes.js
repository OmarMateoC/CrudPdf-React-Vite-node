
// src/backend/routes/templateRoutes.js
// const express = require('express');
// const router = express.Router();
// const templateController = require('../controllers/templateController');


// router.get('/', templateController.getAllTemplates);
// router.get('/:id', templateController.getTemplateById);
// router.post('/', templateController.createTemplate);
// router.put('/:id', templateController.updateTemplate);
// router.delete('/:id', templateController.deleteTemplate);
// router.post('/generate', templateController.generatePdf);
// router.get('/', (req, res) => {
//  res.json({ message: 'Template routes working' });
//});


module.exports = router;

const express = require('express');
const router = express.Router();
const templateService = require('../services/templateService');

// Listar todas las plantillas
router.get('/', (req, res) => {
  const templates = templateService.getTemplates();
  res.json(templates);
});

// Guardar una nueva plantilla
router.post('/', (req, res) => {
  const { name, content } = req.body;
  if (!name || !content) {
    return res.status(400).json({ error: 'Name and content are required' });
  }
  const template = templateService.saveTemplate({ name, content });
  res.status(201).json(template);
});

// Generar PDF desde una plantilla
router.post('/generate', async (req, res) => {
  const { templateName, context } = req.body;
  if (!templateName || !context) {
    return res.status(400).json({ error: 'Template name and context are required' });
  }
  try {
    const pdfBase64 = await templateService.generatePdf(templateName, context);
    res.json({ pdf: pdfBase64 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
