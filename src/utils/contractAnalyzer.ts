import { RiskLevel } from '../components/RiskIndicator';

export interface AnalysisResult {
  overallRisk: RiskLevel;
  clauses: Array<{
    id: string;
    title: string;
    content: string;
    riskLevel: RiskLevel;
    explanation: string;
    legalReference: string;
    recommendation?: string;
  }>;
}

export function analyzeContract(contractText: string): AnalysisResult {
  // Datos dummy para demostración - siempre retorna el mismo análisis de ejemplo
  // Este es un proyecto frontend de demostración
  
  const clauses = [
    {
      id: 'salary-analysis',
      title: 'Análisis de Salario y Remuneración',
      content: 'Cláusula salarial',
      riskLevel: 'bajo' as RiskLevel,
      explanation: 'El salario está claramente especificado y cumple con el salario mínimo legal vigente. Se incluye el valor del subsidio de transporte.',
      legalReference: 'Código Sustantivo del Trabajo - Artículo 145',
      recommendation: 'Verifica que el pago se realice de forma oportuna según lo establecido (quincenal o mensual).'
    },
    {
      id: 'working-hours-analysis',
      title: 'Análisis de Jornada Laboral',
      content: 'Cláusula de jornada',
      riskLevel: 'medio' as RiskLevel,
      explanation: 'La jornada laboral incluye flexibilidad horaria que podría generar horas extras no remuneradas. Se recomienda clarificar el horario exacto.',
      legalReference: 'Código Sustantivo del Trabajo - Artículos 158-167',
      recommendation: 'Asegúrate de que las horas extras se paguen con el recargo legal del 25% en días normales y 75% en domingos y festivos.'
    },
    {
      id: 'benefits-analysis',
      title: 'Análisis de Prestaciones Sociales',
      content: 'Cláusula de prestaciones',
      riskLevel: 'bajo' as RiskLevel,
      explanation: 'Las prestaciones sociales están correctamente establecidas: prima de servicios, cesantías, intereses sobre cesantías y vacaciones remuneradas.',
      legalReference: 'Código Sustantivo del Trabajo - Artículos 249-306',
      recommendation: 'Conserva los comprobantes de pago de todas tus prestaciones sociales.'
    },
    {
      id: 'social-security-analysis',
      title: 'Análisis de Seguridad Social',
      content: 'Cláusula de seguridad social',
      riskLevel: 'bajo' as RiskLevel,
      explanation: 'El contrato establece correctamente la afiliación a seguridad social integral: salud (EPS), pensión y riesgos laborales (ARL) desde el primer día.',
      legalReference: 'Ley 100 de 1993 - Sistema de Seguridad Social',
      recommendation: 'Verifica mensualmente que las cotizaciones estén siendo realizadas a través de la planilla PILA.'
    },
    {
      id: 'termination-analysis',
      title: 'Análisis de Terminación del Contrato',
      content: 'Cláusula de terminación',
      riskLevel: 'medio' as RiskLevel,
      explanation: 'Las cláusulas de terminación incluyen algunas condiciones que limitan el debido proceso. Revisa las causales de despido con justa causa.',
      legalReference: 'Código Sustantivo del Trabajo - Artículos 62-64',
      recommendation: 'En caso de despido sin justa causa tienes derecho a indemnización. Consulta con un abogado si consideras que el despido es injustificado.'
    },
    {
      id: 'stability-analysis',
      title: 'Análisis de Estabilidad Laboral',
      content: 'Tipo de contrato',
      riskLevel: 'alto' as RiskLevel,
      explanation: 'El contrato es a término fijo con renovaciones condicionadas. Esto puede generar incertidumbre sobre la continuidad laboral y limitar algunos derechos.',
      legalReference: 'Código Sustantivo del Trabajo - Artículos 45-47',
      recommendation: 'Los contratos a término fijo no pueden ser inferiores a un año, excepto en casos específicos. Si se renueva 3 veces consecutivas, debe convertirse a término indefinido.'
    }
  ];

  // Riesgo general calculado: medio (tiene riesgos bajos, medios y altos)
  const overallRisk: RiskLevel = 'medio';

  return {
    overallRisk,
    clauses
  };
}

function analyzeSalary(text: string) {
  let riskLevel: RiskLevel = 'bajo';
  let explanation = 'El salario está claramente especificado y cumple con los requisitos legales.';
  let recommendation = undefined;

  if (text.includes('mínimo') && text.includes('variable')) {
    riskLevel = 'alto';
    explanation = 'El salario variable puede generar incertidumbre sobre tus ingresos mensuales.';
    recommendation = 'Verifica que haya un salario base mínimo garantizado y que las comisiones estén claramente definidas.';
  } else if (text.includes('por debajo') || text.includes('menor') || text.includes('reducción')) {
    riskLevel = 'alto';
    explanation = 'Posible salario por debajo del mínimo legal o cláusulas de reducción salarial.';
    recommendation = 'El salario no puede ser inferior al mínimo legal vigente ($1.300.000 en 2024).';
  }

  return {
    id: 'salary-analysis',
    title: 'Análisis de Salario',
    content: 'Cláusula salarial',
    riskLevel,
    explanation,
    legalReference: 'Código Sustantivo del Trabajo - Artículo 145',
    recommendation
  };
}

function analyzeWorkingHours(text: string) {
  let riskLevel: RiskLevel = 'bajo';
  let explanation = 'La jornada laboral está dentro de los límites legales establecidos.';
  let recommendation = undefined;

  if (text.includes('disponibilidad total') || text.includes('24 horas') || text.includes('sin límite')) {
    riskLevel = 'alto';
    explanation = 'Jornada laboral excesiva que puede violar los límites legales de 8 horas diarias.';
    recommendation = 'La jornada ordinaria no puede exceder 8 horas diarias o 48 semanales. Las horas extras requieren autorización y pago adicional.';
  } else if (text.includes('flexibilidad extrema') || text.includes('turnos rotativos')) {
    riskLevel = 'medio';
    explanation = 'Jornada flexible que podría afectar el equilibrio trabajo-vida personal.';
    recommendation = 'Asegúrate de que los turnos rotativos respeten los descansos mínimos legales.';
  }

  return {
    id: 'working-hours-analysis',
    title: 'Análisis de Jornada Laboral',
    content: 'Cláusula de jornada',
    riskLevel,
    explanation,
    legalReference: 'Código Sustantivo del Trabajo - Artículos 158-167',
    recommendation
  };
}

function analyzeTermination(text: string) {
  let riskLevel: RiskLevel = 'bajo';
  let explanation = 'Las condiciones de terminación del contrato están claramente establecidas.';
  let recommendation = undefined;

  if (text.includes('sin indemnización') || text.includes('renuncia a derechos')) {
    riskLevel = 'alto';
    explanation = 'Cláusulas que pueden hacerte renunciar a derechos fundamentales como la indemnización.';
    recommendation = 'No puedes renunciar anticipadamente a derechos laborales. El despido sin justa causa genera derecho a indemnización.';
  } else if (text.includes('terminación inmediata') || text.includes('sin previo aviso')) {
    riskLevel = 'medio';
    explanation = 'Posible falta de garantías del debido proceso en caso de terminación.';
    recommendation = 'El empleador debe seguir el debido proceso y dar oportunidad de descargos antes del despido con justa causa.';
  }

  return {
    id: 'termination-analysis',
    title: 'Análisis de Terminación del Contrato',
    content: 'Cláusula de terminación',
    riskLevel,
    explanation,
    legalReference: 'Código Sustantivo del Trabajo - Artículos 62-64',
    recommendation
  };
}

function analyzeBenefits(text: string) {
  let riskLevel: RiskLevel = 'bajo';
  let explanation = 'Las prestaciones sociales están correctamente establecidas según la ley.';
  let recommendation = undefined;

  if (text.includes('no aplica') || text.includes('exento de') || text.includes('sin prestaciones')) {
    riskLevel = 'alto';
    explanation = 'Posible exclusión ilegal de prestaciones sociales obligatorias.';
    recommendation = 'Prima de servicios, cesantías y vacaciones son derechos irrenunciables para todos los trabajadores.';
  } else if (!text.includes('prima') && !text.includes('cesantías') && !text.includes('vacaciones')) {
    riskLevel = 'medio';
    explanation = 'El contrato no especifica claramente las prestaciones sociales obligatorias.';
    recommendation = 'Asegúrate de que el contrato incluya prima de servicios, cesantías y vacaciones remuneradas.';
  }

  return {
    id: 'benefits-analysis',
    title: 'Análisis de Prestaciones Sociales',
    content: 'Cláusula de prestaciones',
    riskLevel,
    explanation,
    legalReference: 'Código Sustantivo del Trabajo - Artículos 249-306',
    recommendation
  };
}

function analyzeSocialSecurity(text: string) {
  let riskLevel: RiskLevel = 'bajo';
  let explanation = 'La afiliación a seguridad social está correctamente establecida.';
  let recommendation = undefined;

  if (text.includes('por cuenta del trabajador') || text.includes('trabajador debe afiliar')) {
    riskLevel = 'alto';
    explanation = 'Transferencia ilegal de la obligación de afiliación a seguridad social al trabajador.';
    recommendation = 'La afiliación a seguridad social es obligación del empleador desde el primer día de trabajo.';
  } else if (!text.includes('seguridad social') && !text.includes('eps') && !text.includes('arl')) {
    riskLevel = 'medio';
    explanation = 'El contrato no menciona explícitamente la afiliación a seguridad social.';
    recommendation = 'Verifica que el empleador se comprometa a afiliarte a EPS, fondo de pensiones y ARL.';
  }

  return {
    id: 'social-security-analysis',
    title: 'Análisis de Seguridad Social',
    content: 'Cláusula de seguridad social',
    riskLevel,
    explanation,
    legalReference: 'Ley 100 de 1993 - Sistema de Seguridad Social',
    recommendation
  };
}

function calculateOverallRisk(riskScores: RiskLevel[]): RiskLevel {
  const riskValues = { 'bajo': 1, 'medio': 2, 'alto': 3 };
  const average = riskScores.reduce((sum, risk) => sum + riskValues[risk], 0) / riskScores.length;
  
  if (average <= 1.3) return 'bajo';
  if (average <= 2.3) return 'medio';
  return 'alto';
}