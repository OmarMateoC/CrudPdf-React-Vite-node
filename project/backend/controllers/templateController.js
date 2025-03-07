const templateService = require('../services/templateService');

exports.getAllTemplates = async (req, res) => {
  try {
    const templates = await templateService.getAllTemplates();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTemplateById = async (req, res) => {
  try {
    const template = await templateService.getTemplateById(req.params.id);
    if (!template) return res.status(404).json({ error: 'Template not found' });
    res.json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTemplate = async (req, res) => {
  try {
    const { name, content } = req.body;
    if (!name || !content) return res.status(400).json({ error: 'Name and content are required' });
    const template = await templateService.createTemplate({ name, content });
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTemplate = async (req, res) => {
  try {
    const { name, content } = req.body;
    const template = await templateService.updateTemplate(req.params.id, { name, content });
    if (!template) return res.status(404).json({ error: 'Template not found' });
    res.json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTemplate = async (req, res) => {
  try {
    const success = await templateService.deleteTemplate(req.params.id);
    if (!success) return res.status(404).json({ error: 'Template not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.generatePdf = async (req, res) => {
  try {
    const { templateName, context } = req.body;
    if (!templateName || !context) return res.status(400).json({ error: 'Template name and context are required' });
    const pdfBase64 = await templateService.generatePdf(templateName, context);
    res.json({ pdf: pdfBase64 });
  } catch (error) {
    res.status(error.message.includes('not found') ? 404 : 500).json({ error: error.message });
  }
};