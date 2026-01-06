export enum RiskLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

/**
 * Represents a specific audit finding within a document.
 */
export interface AuditFinding {
  clause: string; // The exact text from the document that triggers the flag
  riskExplanation: string; // A simple, clear explanation of the associated risk
  regulatoryStatus: string; // E.g., 'Violates RBI Guideline Section 4', 'Potentially Unenforceable'
}

export interface RiskCategory {
  level: RiskLevel;
  findings: AuditFinding[]; // List of detailed findings for this category
}

export interface AnalysisResult {
  scamScore: number;
  analysis_en: string; // Detailed report in English
  analysis_hi: string; // Detailed report in Hindi (Hinglish for technical terms)
  financialRisk: RiskCategory;
  privacyRisk: RiskCategory;
  legalRisk: RiskCategory;
  hindiWarning: string[]; // Changed to string array for bullet points
}

export interface DocumentUploadError {
  message: string;
}