export interface IPertanyaan {
  id: string;
  kuisionerId: string;
  pertanyaan: string;
  tipe: string;
  section: string;
  master: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export type InputPertanyaan = Pick<
  IPertanyaan,
  "kuisionerId" | "pertanyaan" | "tipe" | "section" | "master" | "deletedAt"
>;
