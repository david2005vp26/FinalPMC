import { useState } from 'react';
import { ContractUpload } from './components/ContractUpload';
import { ContractAnalysis } from './components/ContractAnalysis';
import { ChatInterface } from './components/ChatInterface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Button } from './components/ui/button';
import { analyzeContract, AnalysisResult } from './utils/contractAnalyzer';
import { Scale, MessageCircle, Upload, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentContract, setCurrentContract] = useState<string | null>(null);
  const [contractFileName, setContractFileName] = useState<string>('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<string>('upload');

  const handleContractUpload = (contractText: string, fileName: string) => {
    setCurrentContract(contractText);
    setContractFileName(fileName);
    
    // Analizar el contrato
    const analysisResult = analyzeContract(contractText);
    setAnalysis(analysisResult);
    
    // Cambiar a la pestaña de análisis
    setActiveTab('analysis');
  };

  const handleNewAnalysis = () => {
    setCurrentContract(null);
    setContractFileName('');
    setAnalysis(null);
    setActiveTab('upload');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Scale className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-lg font-semibold">ContratBot Colombia</h1>
                <p className="text-sm text-muted-foreground">
                  Tu asistente legal para contratos laborales
                </p>
              </div>
            </div>
            {analysis && (
              <Button 
                variant="outline" 
                onClick={handleNewAnalysis}
                className="ml-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Nuevo Análisis
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!currentContract ? (
          // Pantalla de carga
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold">
                Analiza tu Contrato Laboral en Segundos
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nuestro asistente especializado en legislación laboral colombiana 
                te ayudará a entender tu contrato y proteger tus derechos. 
                Sin conocimientos legales previos necesarios.
              </p>
            </div>

            <ContractUpload onContractUpload={handleContractUpload} />

            {/* Características */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="w-5 h-5 text-primary" />
                    Análisis Legal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Revisamos cada cláusula según el Código Sustantivo del Trabajo colombiano
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    Lenguaje Simple
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Explicaciones claras y pedagógicas sin tecnicismos legales complicados
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full" />
                    Semáforo de Riesgos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Sistema visual de alertas para identificar rápidamente problemas potenciales
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Pantalla de análisis y chat
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="analysis" className="flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  Análisis del Contrato
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Consultas Legales
                </TabsTrigger>
              </TabsList>

              <TabsContent value="analysis" className="mt-6">
                {analysis && (
                  <ContractAnalysis
                    fileName={contractFileName}
                    overallRisk={analysis.overallRisk}
                    clauses={analysis.clauses}
                  />
                )}
              </TabsContent>

              <TabsContent value="chat" className="mt-6">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-6 text-center">
                    <h3 className="text-lg font-semibold mb-2">
                      Consulta con tu Asistente Legal
                    </h3>
                    <p className="text-muted-foreground">
                      Pregúntame cualquier duda sobre tu contrato o derechos laborales en Colombia
                    </p>
                  </div>
                  
                  <ChatInterface
                    initialMessages={[
                      {
                        id: '1',
                        content: `¡Hola! He analizado tu contrato "${contractFileName}" y estoy listo para resolver todas tus dudas. Puedes preguntarme sobre salarios, prestaciones, jornada laboral, derechos y cualquier aspecto de la legislación laboral colombiana. ¿En qué puedo ayudarte?`,
                        sender: 'bot',
                        timestamp: new Date()
                      }
                    ]}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            ContratBot Colombia - Democratizando el acceso a la asesoría legal laboral
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Esta herramienta es de carácter informativo. Para casos complejos, consulte con un abogado especializado.
          </p>
        </div>
      </footer>
    </div>
  );
}