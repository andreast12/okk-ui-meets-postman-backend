const mahasiswaSchema = {
  nama: {
    type: String,
    required: true,
  },
  fakultas: {
    type: String,
    required: true,
  },
  jurusan: {
    type: String,
    required: true,
  },
  angkatan: {
    type: Number,
    required: true,
  },
};

export { mahasiswaSchema };
