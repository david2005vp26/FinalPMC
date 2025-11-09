import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { RiskIndicator, RiskLevel } from './RiskIndicator';
import { ScrollArea } from './ui/scroll-area';
import { BookOpen, Scale, Shield, AlertTriangle } from 'lucide-react';

interface ContractClause {
  id: string;
  title: string;
  content: string;
  riskLevel: RiskLevel;
  explanation: string;
  legalReference: string;
  recommendation?: string;
}

interface ContractAnalysisProps {
  fileName: string;
  overallRisk: RiskLevel;
  clauses: ContractClause[];
}

export function ContractAnalysis({ fileName, overallRisk, clauses }: ContractAnalysisProps) {
  const riskCounts = clauses.reduce((acc, clause) => {
    acc[clause.riskLevel] = (acc[clause.riskLevel] || 0) + 1;
    return acc;
  }, {} as Record<RiskLevel, number>);

  const getOverallRiskConfig = (level: RiskLevel) => {
    switch (level) {
      case 'bajo':
        return {
          title: 'Contrato Seguro',
          description: 'Este contrato cumple con la legislación laboral colombiana y protege adecuadamente tus derechos.',
          color: 'text-green-600',
          bgColor: 'bg-green-50'
        };
      case 'medio':
        return {
          title: 'Revisar con Cuidado',
          description: 'Este contrato tiene algunas cláusulas que requieren atención. Te recomendamos revisar los puntos señalados.',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50'
        };
      case 'alto':
        return {
          title: '¡Atención Requerida!',
          description: 'Este contrato presenta riesgos importantes para tus derechos laborales. Es muy recomendable buscar asesoría legal.',
          color: 'text-red-600',
          bgColor: 'bg-red-50'
        };
    }
  };

  const overallConfig = getOverallRiskConfig(overallRisk);

  return (
    <div className="space-y-6">
      {/* Resumen General */}
      <Card className={`border-2 ${overallConfig.bgColor}`}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Scale className={`w-6 h-6 ${overallConfig.color}`} />
            <div>
              <CardTitle className={overallConfig.color}>
                {overallConfig.title}
              </CardTitle>
              <CardDescription>
                Análisis de: {fileName}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{overallConfig.description}</p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm">Bajo riesgo: {riskCounts.bajo || 0}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-sm">Riesgo medio: {riskCounts.medio || 0}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm">Alto riesgo: {riskCounts.alto || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Análisis por Cláusulas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Análisis Detallado por Cláusulas
          </CardTitle>
          <CardDescription>
            Cada cláusula analizada según el Código Sustantivo del Trabajo colombiano
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {clauses.map((clause, index) => (
                <div key={clause.id}>
                  <RiskIndicator
                    level={clause.riskLevel}
                    title={clause.title}
                    description={clause.explanation}
                    details={[
                      `Marco legal: ${clause.legalReference}`,
                      ...(clause.recommendation ? [`Recomendación: ${clause.recommendation}`] : [])
                    ]}
                  />
                  {index < clauses.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Información Educativa */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <Shield className="w-5 h-5" />
            ¿Sabías que tienes estos derechos?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <span>Derecho a un salario mínimo legal vigente y pago oportuno</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <span>Afiliación obligatoria a seguridad social (salud, pensión, ARL)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <span>Vacaciones remuneradas de 15 días hábiles por año</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <span>Prima de servicios y cesantías</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <span>Estabilidad laboral y debido proceso en caso de terminación</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}