export interface Template {
  id?: string;
  name: string;
  description: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GeneratePdfRequest {
  templateId: string;
  data: Record<string, any>;
}