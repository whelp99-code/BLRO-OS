export function buildPresalesChecklist(productFamily: string) {
  const common = ["고객사", "대상 시스템", "CPU", "Memory", "Disk", "Network", "일정"];
  const byProduct: Record<string, string[]> = {
    HDR: ["RTO", "RPO", "운영센터/DR센터", "L2/VPN", "복구 리허설"],
    HCI: ["노드 수", "HA 기준", "스토리지 usable", "마이그레이션 방식"],
    SASE: ["사용자 수", "접속 국가", "POP 경로", "Connector 위치", "트래픽 우회 범위"],
    VDI: ["사용자 수", "VM당 vCPU", "VM당 Memory", "프로파일", "동시 접속률"],
  };
  return [...common, ...(byProduct[productFamily] ?? [])];
}
