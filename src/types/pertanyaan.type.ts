export enum TipePertanyaan {
  ShortText = "ShortText",
  Paragraph = "Paragraph",
  Radio = "Radio",
  Checkbox = "Checkbox",
}

export interface IPertanyaan {
  id: string;
  kuisionerId: string;
  pertanyaan: string;
  tipe: TipePertanyaan;
  section?: string;
  master: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export type InputPertanyaan = Pick<
  IPertanyaan,
  "kuisionerId" | "pertanyaan" | "tipe" | "section" | "master" | "deletedAt"
>;
