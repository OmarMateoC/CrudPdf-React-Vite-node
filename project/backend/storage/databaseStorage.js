const pool = require('./db');
const Template = require('../models/Template');

class DatabaseStorage {
  async getTemplateByName(name) {
    const res = await pool.query('SELECT * FROM templates WHERE name = $1', [name]);
    if (res.rows.length === 0) return null;
    const { id, content, created_at } = res.rows[0];
    return new Template(id, name, content, created_at);
  }

  async getTemplateById(id) {
    const res = await pool.query('SELECT * FROM templates WHERE id = $1', [id]);
    if (res.rows.length === 0) return null;
    const { name, content, created_at } = res.rows[0];
    return new Template(id, name, content, created_at);
  }

  async getAllTemplates() {
    const res = await pool.query('SELECT * FROM templates');
    return res.rows.map(row => new Template(row.id, row.name, row.content, row.created_at));
  }

  async createTemplate(template) {
    const res = await pool.query(
      'INSERT INTO templates (name, content) VALUES ($1, $2) RETURNING *',
      [template.name, template.content]
    );
    const { id, name, content, created_at } = res.rows[0];
    return new Template(id, name, content, created_at);
  }

  async updateTemplate(id, template) {
    const res = await pool.query(
      'UPDATE templates SET name = $1, content = $2 WHERE id = $3 RETURNING *',
      [template.name, template.content, id]
    );
    if (res.rows.length === 0) return null;
    const { name, content, created_at } = res.rows[0];
    return new Template(id, name, content, created_at);
  }

  async deleteTemplate(id) {
    const res = await pool.query('DELETE FROM templates WHERE id = $1', [id]);
    return res.rowCount > 0;
  }
}

module.exports = DatabaseStorage;