export function useRiskLabel(risk: string) {
  const labels: Record<string, string> = { LOW: "낮음", MEDIUM: "중간", HIGH: "높음" };
  return labels[risk] ?? risk;
}
