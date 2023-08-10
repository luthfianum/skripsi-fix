export default interface IJawaban {
  id: string;
  mahasiswaId: string;
  kuisionerId: string;
  pertanyaanId: string;
  jawaban: string;
  id_penyebaran: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export type IJawabanInput = Pick<
  IJawaban,
  "mahasiswaId" | "kuisionerId" | "pertanyaanId" | "jawaban" | "id_penyebaran"
>;
