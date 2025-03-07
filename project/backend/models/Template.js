class Template {
    constructor(id, name, content, createdAt = new Date()) {
      this.id = id;
      this.name = name;
      this.content = content;
      this.createdAt = createdAt;
    }
  }
  
  module.exports = Template;