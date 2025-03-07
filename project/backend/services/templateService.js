const Handlebars = require('handlebars');
const puppeteer = require('puppeteer');
const { getStorage } = require('../storage');

const templateService = {
  async getAllTemplates() {
    const storage = getStorage();
    return await storage.getAllTemplates();
  },

  async getTemplateById(id) {
    const storage = getStorage();
    return await storage.getTemplateById(id);
  },

  async createTemplate(template) {
    const storage = getStorage();
    return await storage.createTemplate(template);
  },

  async updateTemplate(id, template) {
    const storage = getStorage();
    return await storage.updateTemplate(id, template);
  },

  async deleteTemplate(id) {
    const storage = getStorage();
    return await storage.deleteTemplate(id);
  },

  async generatePdf(templateName, context) {
    const storage = getStorage();
    const template = await storage.getTemplateByName(templateName);
    if (!template) throw new Error(`Template '${templateName}' not found`);

    const compiledTemplate = Handlebars.compile(template.content);
    const html = compiledTemplate(context);

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    return pdfBuffer.toString('base64');
  }
};

module.exports = templateService;