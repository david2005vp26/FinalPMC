import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

export type RiskLevel = 'bajo' | 'medio' | 'alto';

interface RiskIndicatorProps {
  level: RiskLevel;
  title: string;
  description: string;
  details: string[];
}

export function RiskIndicator({ level, title, description, details }: RiskIndicatorProps) {
  const getRiskConfig = (level: RiskLevel) => {
    switch (level) {
      case 'bajo':
        return {
          color: 'bg-green-500',
          badgeVariant: 'default' as const,
          icon: CheckCircle,
          textColor: 'text-green-700',
          bgColor: 'bg-green-50 border-green-200'
        };
      case 'medio':
        return {
          color: 'bg-yellow-500',
          badgeVariant: 'secondary' as const,
          icon: AlertCircle,
          textColor: 'text-yellow-700',
          bgColor: 'bg-yellow-50 border-yellow-200'
        };
      case 'alto':
        return {
          color: 'bg-red-500',
          badgeVariant: 'destructive' as const,
          icon: AlertTriangle,
          textColor: 'text-red-700',
          bgColor: 'bg-red-50 border-red-200'
        };
    }
  };

  const config = getRiskConfig(level);
  const Icon = config.icon;

  return (
    <Card className={`${config.bgColor} border-2`}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={`w-4 h-4 rounded-full ${config.color}`} />
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              <Icon className={`w-5 h-5 ${config.textColor}`} />
              {title}
            </CardTitle>
            <CardDescription className={config.textColor}>
              {description}
            </CardDescription>
          </div>
          <Badge variant={config.badgeVariant} className="capitalize">
            Riesgo {level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {details.map((detail, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-current mt-2 flex-shrink-0" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}