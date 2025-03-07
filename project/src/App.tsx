import React, { useState } from 'react';
import { FilePlus } from 'lucide-react';
import { TemplateForm } from './components/TemplateForm';
import { TemplateList } from './components/TemplateList';
import { Template } from './types/template';

function App() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | undefined>();

  const handleSubmit = (template: Template) => {
    if (editingTemplate) {
      setTemplates(templates.map(t => 
        t.id === editingTemplate.id ? { ...template, id: t.id } : t
      ));
    } else {
      setTemplates([...templates, { ...template, id: Date.now().toString(), createdAt: new Date() }]);
    }
    setIsCreating(false);
    setEditingTemplate(undefined);
  };

  const handleEdit = (template: Template) => {
    setEditingTemplate(template);
    setIsCreating(true);
  };

  const handleDelete = (templateId: string) => {
    setTemplates(templates.filter(t => t.id !== templateId));
  };

  const handleGenerate = (templateId: string) => {
    // TODO: Implementar la generación de PDF
    console.log('Generando PDF para template:', templateId);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Generador de PDFs
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              {!isCreating ? (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsCreating(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <FilePlus className="w-4 h-4 mr-2" />
                      Nueva Plantilla
                    </button>
                  </div>
                  <TemplateList
                    templates={templates}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onGenerate={handleGenerate}
                  />
                </div>
              ) : (
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {editingTemplate ? 'Editar Plantilla' : 'Nueva Plantilla'}
                    </h3>
                    <div className="mt-5">
                      <TemplateForm
                        onSubmit={handleSubmit}
                        initialData={editingTemplate}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;