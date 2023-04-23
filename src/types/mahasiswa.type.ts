export enum EmahasiswaGender {
  L = "L",
  P = "P",
} 

export interface Imahasiswa {
  id: string,
  nama: string,
  nim: string,
  gender: EmahasiswaGender,
  studi: string,
  password: string,
  angkatan: string,
  kelahiran: string,
  provinsi: string,
}

export interface ImahasiswaInput {
  nama: string,
  nim: string,
  gender: EmahasiswaGender,
  studi: string,
  password: string,
  angkatan: string,
  kelahiran: string,
  provinsi: string,
}

