const fs = require('fs').promises;
const path = require('path');
const Template = require('../models/Template');
require('dotenv').config();

class FileSystemStorage {
  constructor() {
    this.storagePath = process.env.FILESYSTEM_PATH || './templates';
    fs.mkdir(this.storagePath, { recursive: true });
  }

  async getTemplateByName(name) {
    const filePath = path.join(this.storagePath, `${name}.json`);
    try {
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  async getTemplateById(id) {
    const files = await fs.readdir(this.storagePath);
    for (const file of files) {
      const data = await fs.readFile(path.join(this.storagePath, file), 'utf8');
      const template = JSON.parse(data);
      if (template.id === parseInt(id)) return template;
    }
    return null;
  }

  async getAllTemplates() {
    const files = await fs.readdir(this.storagePath);
    const templates = [];
    for (const file of files) {
      const data = await fs.readFile(path.join(this.storagePath, file), 'utf8');
      templates.push(JSON.parse(data));
    }
    return templates;
  }

  async createTemplate(template) {
    const templates = await this.getAllTemplates();
    template.id = templates.length + 1;
    const filePath = path.join(this.storagePath, `${template.name}.json`);
    await fs.writeFile(filePath, JSON.stringify(template));
    return template;
  }

  async updateTemplate(id, template) {
    const existing = await this.getTemplateById(id);
    if (!existing) return null;
    await fs.unlink(path.join(this.storagePath, `${existing.name}.json`));
    template.id = parseInt(id);
    const filePath = path.join(this.storagePath, `${template.name}.json`);
    await fs.writeFile(filePath, JSON.stringify(template));
    return template;
  }

  async deleteTemplate(id) {
    const template = await this.getTemplateById(id);
    if (!template) return false;
    await fs.unlink(path.join(this.storagePath, `${template.name}.json`));
    return true;
  }
}

module.exports = FileSystemStorage;