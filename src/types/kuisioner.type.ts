export enum EMetodeKuisioner {
  simple = "simple",
  systematic = "systematic",
  cluster = "cluster",
}

export interface IKuisioner {
  id: string;
  idMahasiswa: string;
  title: string;
  deskripsi: string;
  metode: EMetodeKuisioner;
  responden: number;
  expiredAt?: Date;
  penyebaran: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type KuisionerInput = Pick<
  IKuisioner,
  "title" | "deskripsi" | "metode" | "responden" | "expiredAt" | "penyebaran" | "deletedAt"
>;

export const initialKuisionerInput: KuisionerInput = {
  title: "",
  deskripsi: "",
  metode: EMetodeKuisioner.simple,
  responden: 0,
  penyebaran: 0,
  expiredAt: undefined,
  deletedAt: undefined
};
