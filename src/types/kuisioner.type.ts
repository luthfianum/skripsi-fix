export enum EMetodeKuisioner{
  simple= "simple",
  systematic= "systematic",
  cluster= "cluster"
}

export interface IKuisioner {
  id : string;
  idMahasiswa: string;
  title: string;
  deskripsi: string;
  metode: EMetodeKuisioner;
  responden: number;
  expiredAt: Date;
  penyebaran: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IKuisionerInput {
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

export const initialKuisionerInput : IKuisionerInput= {
  title: '',
  deskripsi: '',
  metode: EMetodeKuisioner.simple,
  responden: 0,
  penyebaran: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
}