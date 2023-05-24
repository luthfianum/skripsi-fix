export enum EMahasiswaGender {
  L = "L",
  P = "P",
} 

export interface IMahasiswa {
  id: string,
  nama: string,
  nim: string,
  gender?: EMahasiswaGender,
  studi?: string,
  password: string,
  angkatan?: string,
  kelahiran?: string,
  provinsi?: string,
}

export interface IMahasiswaInput {
  nama: string,
  nim: string,
  gender?: EMahasiswaGender,
  studi?: string,
  password: string,
  angkatan?: string,
  kelahiran?: string,
  provinsi?: string,
}
