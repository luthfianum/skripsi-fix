export interface ISection {
  id: string;
  kuisionerId: string;
  pertanyaanId: string;
  optionId: string;
  section: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type InputSection = Pick<
  ISection,
  "kuisionerId" | "pertanyaanId" | "optionId" | "section" | "deletedAt">;