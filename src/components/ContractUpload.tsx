import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Upload, FileText, Camera } from 'lucide-react';

interface ContractUploadProps {
  onContractUpload: (contract: string, fileName: string) => void;
}

export function ContractUpload({ onContractUpload }: ContractUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onContractUpload(content, file.name);
    };
    reader.readAsText(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <FileText className="w-6 h-6" />
          Carga tu Contrato Laboral
        </CardTitle>
        <CardDescription>
          Sube tu contrato para analizarlo según la legislación laboral colombiana
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-primary bg-accent' 
              : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <div className="space-y-2">
            <p>Arrastra y suelta tu contrato aquí</p>
            <p className="text-sm text-muted-foreground">o</p>
            <div className="flex gap-2 justify-center">
              <Button asChild variant="outline">
                <label className="cursor-pointer">
                  <FileText className="w-4 h-4 mr-2" />
                  Seleccionar archivo
                  <Input 
                    type="file" 
                    className="hidden" 
                    accept=".txt,.doc,.docx,.pdf"
                    onChange={handleInputChange}
                  />
                </label>
              </Button>
              <Button variant="outline" disabled>
                <Camera className="w-4 h-4 mr-2" />
                Tomar foto
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Formatos soportados: TXT, DOC, DOCX, PDF
          </p>
        </div>
      </CardContent>
    </Card>
  );
}