export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";
export type ProjectStatus = "NEW_LEAD" | "QUALIFICATION" | "TECH_REVIEW" | "PROPOSAL" | "POC" | "NEGOTIATION" | "WON" | "LOST" | "HOLD";
export type ProductFamily = "HCI" | "HDR" | "SCP" | "SKE" | "SASE" | "NGAF" | "IAG" | "EPP" | "NETWORK" | "BACKUP" | "VDI" | "OTHER";
export type PersonaKey = "CEO" | "SALES" | "PRESALES" | "ENGINEER" | "PM" | "FINANCE" | "CUSTOMER" | "PARTNER";

export interface CustomerSummary {
  id: string;
  name: string;
  segment: string;
  status: string;
  opportunityLevel: "LOW" | "MEDIUM" | "HIGH";
  nextAction: string;
}

export interface ProjectSummary {
  id: string;
  name: string;
  customerName: string;
  productFamily: ProductFamily;
  status: ProjectStatus;
  expectedRevenue: number;
  risk: RiskLevel;
  nextAction: string;
}
