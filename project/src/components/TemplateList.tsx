import { FileText, Trash2, Edit } from 'lucide-react';
import { Template } from '../types/template';

interface TemplateListProps {
  templates: Template[];
  onEdit: (template: Template) => void;
  onDelete: (templateId: string) => void;
  onGenerate: (templateId: string) => void;
}

export function TemplateList({ templates, onEdit, onDelete, onGenerate }: TemplateListProps) {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {templates.map((template) => (
          <li key={template.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <p className="ml-2 truncate text-sm font-medium text-indigo-600">{template.name}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onGenerate(template.id!)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Generar PDF
                  </button>
                  <button
                    onClick={() => onEdit(template)}
                    className="inline-flex items-center px-2 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(template.id!)}
                    className="inline-flex items-center px-2 py-1 border border-gray-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-gray-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{template.description}</p>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    Creado: {new Date(template.createdAt!).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}