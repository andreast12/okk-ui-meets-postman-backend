# OKK UI Meets Postman (Backend)

Tugas Oprec Webdev RISTEK 2024 opsi B level 3. REST API dibuat menggunakan Express dan MongoDB (Atlas).

# Panduan Setup

- Buat file `.env`, lalu set environment variables sesuai dengan format pada dokumen pengumpulan tugas
- Jalankan perintah berikut di console:

```
npm install
npm run dev
```

- Cek console untuk memastikan server telah berjalan dan MongoDB telah terkoneksi dengan benar

# API Endpoint

- Base URL: `http://localhost:5000/api`
- Failed/error response dari setiap endpoint memiliki format yang sama, yaitu:

```
{
	message: String
}
```

## Acara

### GET All Acara

- Endpoint: /acara
- Success Response:

```
{
	acara: [
		{
			_id: String,
			nama: String,
			waktuMulai: Date,
			waktuBerakhir: Date,
			tempat: String,
			sponsor: [
				{
					_id: String,
					nama: String,
					paket: Enum ("Platinum", "Gold", "Silver"),
					acara: String (_id)
				}
			],
			pembicara: [
				{
					_id: String,
					nama: String,
					acara: String (_id)
				}
			]
		}
	]
}
```

### GET Single Acara

- Endpoint: /acara/:id
- Success Response:

```
{
	acara: {
		_id: String,
		nama: String,
		waktuMulai: Date,
		waktuBerakhir: Date,
		tempat: String,
		sponsor: [
			{
				_id: String,
				nama: String,
				paket: Enum ("Platinum", "Gold", "Silver"),
				acara: String (_id)
			}
		],
		pembicara: [
			{
				_id: String,
				nama: String,
				acara: String (_id)
			}
		]
	}
}
```

### POST Acara

- Endpoint: /acara
- Body:

```
{
	nama: String,
	waktuMulai: Date,
	waktuBerakhir: Date,
	tempat: String
}
```

- Success Response:

```
{
	acara: {
		_id: String,
		nama: String,
		waktuMulai: Date,
		waktuBerakhir: Date,
		tempat: String,
		sponsor: [],
		pembicara: []
	}
}
```

### PATCH Acara

- Endpoint: /acara/:id
- Body:

```
{
	nama?: String,
	waktuMulai?: Date,
	waktuBerakhir?: Date,
	tempat?: String
}
```

- Success Response:

```
{
	acara: {
		_id: String,
		nama: String,
		waktuMulai: Date,
		waktuBerakhir: Date,
		tempat: String,
		sponsor: [String (_id)],
		pembicara: [String (_id)]
	}
}
```

### DELETE Acara

- Endpoint: /acara/:id
- Success Response:

```
{
	message: String
}
```

### GET All Sponsor

- Endpoint: /acara/sponsor
- Success Response:

```
{
	sponsor: [
		{
			_id: String,
			nama: String,
			paket: Enum ("Platinum", "Gold", "Silver"),
			acara: {
				_id: String,
				nama: String,
				waktuMulai: Date,
				waktuBerakhir: Date,
				tempat: String,
				sponsor: [String (_id)],
				pembicara: [String (_id)]
			}
		}
	]
}
```

### Get Single Sponsor

- Endpoint: /acara/sponsor/:id
- Success Response:

```
{
	sponsor: {
		_id: String,
		nama: String,
		paket: Enum ("Platinum", "Gold", "Silver"),
		acara: {
			_id: String,
			nama: String,
			waktuMulai: Date,
			waktuBerakhir: Date,
			tempat: String,
			sponsor: [String (_id)],
			pembicara: [String (_id)]
		}
	}
}
```

### POST Sponsor

- Endpoint: /acara/sponsor
- Body:

```
{
	nama: String,
	paket: Enum ("Platinum", "Gold", "Silver"),
	idAcara: String (_id)
}
```

- Success Response:

```
{
	sponsor: {
		_id: String,
		nama: String,
		paket: Enum ("Platinum", "Gold", "Silver"),
		idAcara: String (_id)
	}
}
```

### PATCH Sponsor

- Endpoint: /acara/sponsor/:id
- Body:

```
{
	nama?: String,
	paket?: Enum ("Platinum", "Gold", "Silver"),
	idAcara?: String (_id)
}
```

- Success Response:

```
{
	sponsor: {
		_id: String,
		nama: String,
		paket: Enum ("Platinum", "Gold", "Silver"),
		idAcara: String (_id)
	}
}
```

### DELETE Sponsor

- Endpoint: /acara/sponsor/:id
- Success Response:

```
{
	message: String
}
```

### GET All Pembicara

- Endpoint: /acara/pembicara
- Success Response:

```
{
	pembicara: [
		{
			_id: String,
			nama: String,
			acara: {
				_id: String,
				nama: String,
				waktuMulai: Date,
				waktuBerakhir: Date,
				tempat: String,
				sponsor: [String (_id)],
				pembicara: [String (_id)]
			}
		}
	]
}
```

### GET Single Pembicara

- Endpoint: /acara/pembicara/:id
- Success Response:

```
{
	pembicara: {
		_id: String,
		nama: String,
		acara: {
			_id: String,
			nama: String,
			waktuMulai: Date,
			waktuBerakhir: Date,
			tempat: String,
			sponsor: [String (_id)],
			pembicara: [String (_id)]
		}
	}
}
```

### POST Pembicara

- Endpoint: /acara/pembicara
- Body:

```
{
	nama: String,
	idAcara: String (_id)
}
```

- Success Response:

```
{
	sponsor: {
		_id: String,
		nama: String,
		idAcara: String (_id)
	}
}
```

### PATCH Pembicara

- Endpoint: /acara/pembicara/:id
- Body:

```
{
	nama?: String,
	idAcara?: String (_id)
}
```

- Success Response:

```
{
	sponsor: {
		_id: String,
		nama: String,
		idAcara: String (_id)
	}
}
```

### DELETE Pembicara

- Endpoint: /acara/pembicara/:id
- Success Response:

```
{
	message: String
}
```

## Kelompok

### GET All Kelompok

- Endpoint: /kelompok
- Success Response:

```
{
	kelompok: [
		{
			_id: String,
			nomor: Number,
			mentor: {
				nama: String,
				fakultas: String,
				jurusan: String,
				angkatan: Number
			},
			mentee: [
				{
					_id: String,
					nama: String,
					fakultas: String,
					jurusan: String,
					angkatan: Number,
					jalurMasuk: String,
					kelompok: String (_id)
				}
			],
			mentoring: [
				{
					_id: String,
					peserta: [String (mentee._id)],
					waktu: Date,
					tempat: String,
					materi: String,
					kelompok: _id
				}
			]
		}
	]
}
```

### GET Single Kelompok

- Endpoint: /kelompok/:nomor
- Success Response:

```
{
	kelompok: {
		_id: String,
		nomor: Number,
		mentor: {
			nama: String,
			fakultas: String,
			jurusan: String,
			angkatan: Number
		},
		mentee: [
			{
				_id: String,
				nama: String,
				fakultas: String,
				jurusan: String,
				angkatan: Number,
				jalurMasuk: String,
				kelompok: String (_id)
			}
		],
		mentoring: [
			{
				_id: String,
				peserta: [String (mentee._id)],
				waktu: Date,
				tempat: String,
				materi: String,
				kelompok: _id
			}
		]
	}
}
```

### POST Kelompok

- Endpoint: /kelompok
- Body:

```
{
	mentor: {
		nama: String,
		fakultas: String,
		jurusan: String,
		angkatan: Number
	}
}
```

- Success Response:

```
{
	kelompok: {
		_id: String,
		nomor: Number,
		mentor: {
			nama: String,
			fakultas: String,
			jurusan: String,
			angkatan: Number
		},
		mentee: [],
		mentoring: []
	}
}
```

### PATCH Kelompok

- Endpoint: /kelompok/:nomor
- Body:

```
{
	mentor?: {
		nama?: String,
		fakultas?: String,
		jurusan?: String,
		angkatan?: Number
	}
}
```

- Success Response:

```
{
	kelompok: {
		_id: String,
		nomor: Number,
		mentor: {
			nama: String,
			fakultas: String,
			jurusan: String,
			angkatan: Number
		},
		mentee: [String (_id)],
		mentoring: [String (_id)]
	}
}
```

### DELETE Kelompok

- Endpoint: /kelompok/:nomor
- Success Response:

```
{
	message: String
}
```

### GET All Mentee

- Endpoint: /kelompok/mentee
- Success Response:

```
{
	mentee: [
		{
			_id: String,
			nama: String,
			fakultas: String,
			jurusan: String,
			angkatan: Number,
			jalurMasuk: String,
			kelompok: {
				_id: String,
				nomor: Number,
				mentor: {
					nama: String,
					fakultas: String,
					jurusan: String,
					angkatan: Number
				},
				mentee: [String (_id)],
				mentoring: [String (_id)]
			}
		}
	]
}
```

### GET Single Mentee

- Endpoint: /kelompok/mentee/:id
- Success Response:

```
{
	mentee: {
		_id: String,
		nama: String,
		fakultas: String,
		jurusan: String,
		angkatan: Number,
		jalurMasuk: String,
		kelompok: {
			_id: String,
			nomor: Number,
			mentor: {
				nama: String,
				fakultas: String,
				jurusan: String,
				angkatan: Number
			},
			mentee: [String (_id)],
			mentoring: [String (_id)]
		}
	}
}
```

### POST Mentee

- Endpoint: /kelompok/mentee
- Body:

```
{
	nama: String,
	fakultas: String,
	jurusan: String,
	angkatan: Number,
	jalurMasuk: String,
	noKelompok: Number
}
```

- Success Response:

```
{
	mentee: {
		_id: String,
		nama: String,
		fakultas: String,
		jurusan: String,
		angkatan: Number,
		jalurMasuk: String,
		kelompok: String (_id)
	}
}
```

### PATCH Mentee

- Endpoint: /kelompok/mentee/:id
- Body:

```
{
	nama?: String,
	fakultas?: String,
	jurusan?: String,
	angkatan?: Number,
	jalurMasuk?: String,
	noKelompok?: Number
}
```

- Success Response:

```
{
	mentee: {
		_id: String,
		nama: String,
		fakultas: String,
		jurusan: String,
		angkatan: Number,
		jalurMasuk: String,
		kelompok: String (_id)
	}
}
```

### DELETE Mentee

- Endpoint: /kelompok/mentee/:id
- Success Response:

```
{
	message: String
}
```

### GET All Mentoring

- Endpoint: /kelompok/mentoring
- Success Response:

```
{
	mentoring: [
		{
			_id: String
			peserta: [
				{
					_id: String,
					nama: String,
					fakultas: String,
					jurusan: String,
					angkatan: Number,
					jalurMasuk: String,
					kelompok: String (_id)
				}
			],
			waktu: Date,
			tempat: String,
			materi: String,
			kelompok: {
				_id: String,
				nomor: Number,
				mentor: {
					nama: String,
					fakultas: String,
					jurusan: String,
					angkatan: Number
				},
				mentee: [String (_id)],
				mentoring: [String (_id)]
			}
		}
	]
}
```

### GET Single Mentoring

- Endpoint: /kelompok/mentoring/:id
- Success Response:

```
{
	mentoring: {
		_id: String
		peserta: [
			{
				_id: String,
				nama: String,
				fakultas: String,
				jurusan: String,
				angkatan: Number,
				jalurMasuk: String,
				kelompok: String (_id)
			}
		],
		waktu: Date,
		tempat: String,
		materi: String,
		kelompok: {
			_id: String,
			nomor: Number,
			mentor: {
				nama: String,
				fakultas: String,
				jurusan: String,
				angkatan: Number
			},
			mentee: [String (_id)],
			mentoring: [String (_id)]
		}
	}
}
```

### POST Mentoring

- Endpoint: /kelompok/mentoring
- Body:

```
{
	peserta?: [String (mentee._id)],
	waktu: Date,
	tempat: String,
	materi: String,
	noKelompok: Number
}
```

- Success Response:

```
{
	mentoring: {
		_id: String,
		peserta: [String (mentee._id)],
		waktu: Date,
		tempat: String,
		materi: String,
		kelompok: String (_id)
	}
}
```

### PATCH Mentoring

- Endpoint: /kelompok/mentoring/:id
- Body:

```
{
	peserta?: [String (mentee._id)],
	waktu?: Date,
	tempat?: String,
	materi?: String,
	noKelompok?: Number
}
```

- Success Response:

```
{
	mentoring: {
		_id: String,
		peserta: [String (mentee._id)],
		waktu: Date,
		tempat: String,
		materi: String,
		kelompok: String (_id)
	}
}
```

### DELETE Mentoring

- Endpoint: /kelompok/mentoring/:id
- Success Response:

```
{
	message: String
}
```

## Panitia

### GET All Panitia

- Endpoint: /panitia
- Success Response:

```
{
	pengurusInti: [
		{
			_id: String,
			nama: String,
			fakultas: String,
			jurusan: String,
			angkatan: Number,
			jabatan: Enum (
				"Project Officer",
				"Vice Project Officer Internal",
				"Vice Project Officer Eksternal",
				"Sekretaris Umum",
				"Controller",
				"Treasurer",
				"Koordinator Acara",
				"Koordinator Sarana dan Prasarana",
				"Koordinator Operasional",
				"Koordinator Materi dan Mentor",
				"Koordinator Kreatif",
				"Koordinator Relasi"
			)
		}
	],
	BPH: [
		{
			_id: String,
			nama: String,
			fakultas: String,
			jurusan: String,
			angkatan: Number,
			divisi: Enum (
				"Project",
				"Sponsorship",
				"Kesekretariatan",
				"PSDM",
				"Acara Puncak",
				"Eksplorasi",
				"Transportasi dan Konsumsi",
				"Perizinan",
				"Logistik",
				"Keamanan",
				"Medis",
				"Media Informasi",
				"Kelembagaan",
				"Materi",
				"Mentor",
				"Media Partner",
				"IT dan Broadcast",
				"Dekorasi dan Wardrobe",
				"Visual Design dan Dokumentasi"
			),
			jabatan: Enum ("Penanggung Jawab", "Wakil Penanggung Jawab", "Staf")
		}
	]
}
```

### GET All Pengurus Inti

- Endpoint: /panitia/inti
- Success Response:

```
{
	pengurusInti: [
		{
			_id: String,
			nama: String,
			fakultas: String,
			jurusan: String,
			angkatan: Number,
			jabatan: Enum (
				"Project Officer",
				"Vice Project Officer Internal",
				"Vice Project Officer Eksternal",
				"Sekretaris Umum",
				"Controller",
				"Treasurer",
				"Koordinator Acara",
				"Koordinator Sarana dan Prasarana",
				"Koordinator Operasional",
				"Koordinator Materi dan Mentor",
				"Koordinator Kreatif",
				"Koordinator Relasi"
			)
		}
	]
}
```

### GET Single Pengurus Inti

- Endpoint: /panitia/inti/:id
- Success Response:

```
{
	pengurusInti: {
		_id: String,
		nama: String,
		fakultas: String,
		jurusan: String,
		angkatan: Number,
		jabatan: Enum (
			"Project Officer",
			"Vice Project Officer Internal",
			"Vice Project Officer Eksternal",
			"Sekretaris Umum",
			"Controller",
			"Treasurer",
			"Koordinator Acara",
			"Koordinator Sarana dan Prasarana",
			"Koordinator Operasional",
			"Koordinator Materi dan Mentor",
			"Koordinator Kreatif",
			"Koordinator Relasi"
		)
	}
}
```

### POST Pengurus Inti

- Endpoint: /panitia/inti
- Body:

```
{
	nama: String,
	fakultas: String,
	jurusan: String,
	angkatan: Number,
	jabatan: Enum (
		"Project Officer",
		"Vice Project Officer Internal",
		"Vice Project Officer Eksternal",
		"Sekretaris Umum",
		"Controller",
		"Treasurer",
		"Koordinator Acara",
		"Koordinator Sarana dan Prasarana",
		"Koordinator Operasional",
		"Koordinator Materi dan Mentor",
		"Koordinator Kreatif",
		"Koordinator Relasi"
	)
}
```

- Success Response

```
{
	pengurusInti: {
		_id: String,
		nama: String,
		fakultas: String,
		jurusan: String,
		angkatan: Number,
		jabatan: Enum (
			"Project Officer",
			"Vice Project Officer Internal",
			"Vice Project Officer Eksternal",
			"Sekretaris Umum",
			"Controller",
			"Treasurer",
			"Koordinator Acara",
			"Koordinator Sarana dan Prasarana",
			"Koordinator Operasional",
			"Koordinator Materi dan Mentor",
			"Koordinator Kreatif",
			"Koordinator Relasi"
		)
	}
}
```

### PATCH Pengurus Inti

- Endpoint: /panitia/inti/:id
- Body:

```
{
	nama?: String,
	fakultas?: String,
	jurusan?: String,
	angkatan?: Number,
	jabatan?: Enum (
		"Project Officer",
		"Vice Project Officer Internal",
		"Vice Project Officer Eksternal",
		"Sekretaris Umum",
		"Controller",
		"Treasurer",
		"Koordinator Acara",
		"Koordinator Sarana dan Prasarana",
		"Koordinator Operasional",
		"Koordinator Materi dan Mentor",
		"Koordinator Kreatif",
		"Koordinator Relasi"
	)
}
```

- Success Response

```
{
	pengurusInti: {
		_id: String,
		nama: String,
		fakultas: String,
		jurusan: String,
		angkatan: Number,
		jabatan: Enum (
			"Project Officer",
			"Vice Project Officer Internal",
			"Vice Project Officer Eksternal",
			"Sekretaris Umum",
			"Controller",
			"Treasurer",
			"Koordinator Acara",
			"Koordinator Sarana dan Prasarana",
			"Koordinator Operasional",
			"Koordinator Materi dan Mentor",
			"Koordinator Kreatif",
			"Koordinator Relasi"
		)
	}
}
```

### DELETE Pengurus Inti

- Endpoint: /panitia/inti/:id
- Success Response:

```
{
	message: String
}
```

### GET All BPH

- Endpoint: /panitia/bph
- Success Response:

```
{
	BPH: [
		{
			_id: String,
			nama: String,
			fakultas: String,
			jurusan: String,
			angkatan: Number,
			divisi: Enum (
				"Project",
				"Sponsorship",
				"Kesekretariatan",
				"PSDM",
				"Acara Puncak",
				"Eksplorasi",
				"Transportasi dan Konsumsi",
				"Perizinan",
				"Logistik",
				"Keamanan",
				"Medis",
				"Media Informasi",
				"Kelembagaan",
				"Materi",
				"Mentor",
				"Media Partner",
				"IT dan Broadcast",
				"Dekorasi dan Wardrobe",
				"Visual Design dan Dokumentasi"
			),
			jabatan: Enum ("Penanggung Jawab", "Wakil Penanggung Jawab", "Staf")
		}
	]
}
```

### GET Single BPH

- Endpoint: /panitia/bph/:id
- Success Response:

```
{
	BPH: {
		_id: String,
		nama: String,
		fakultas: String,
		jurusan: String,
		angkatan: Number,
		divisi: Enum (
			"Project",
			"Sponsorship",
			"Kesekretariatan",
			"PSDM",
			"Acara Puncak",
			"Eksplorasi",
			"Transportasi dan Konsumsi",
			"Perizinan",
			"Logistik",
			"Keamanan",
			"Medis",
			"Media Informasi",
			"Kelembagaan",
			"Materi",
			"Mentor",
			"Media Partner",
			"IT dan Broadcast",
			"Dekorasi dan Wardrobe",
			"Visual Design dan Dokumentasi"
		),
		jabatan: Enum ("Penanggung Jawab", "Wakil Penanggung Jawab", "Staf")
	}
}
```

### POST BPH

- Endpoint: /panitia/bph
- Body:

```
{
	nama: String,
	fakultas: String,
	jurusan: String,
	angkatan: Number,
	divisi: Enum (
		"Project",
		"Sponsorship",
		"Kesekretariatan",
		"PSDM",
		"Acara Puncak",
		"Eksplorasi",
		"Transportasi dan Konsumsi",
		"Perizinan",
		"Logistik",
		"Keamanan",
		"Medis",
		"Media Informasi",
		"Kelembagaan",
		"Materi",
		"Mentor",
		"Media Partner",
		"IT dan Broadcast",
		"Dekorasi dan Wardrobe",
		"Visual Design dan Dokumentasi"
	),
	jabatan: Enum ("Penanggung Jawab", "Wakil Penanggung Jawab", "Staf")
}
```

- Success Response:

```
{
	BPH: {
		_id: String
		nama: String,
		fakultas: String,
		jurusan: String,
		angkatan: Number,
		divisi: Enum (
			"Project",
			"Sponsorship",
			"Kesekretariatan",
			"PSDM",
			"Acara Puncak",
			"Eksplorasi",
			"Transportasi dan Konsumsi",
			"Perizinan",
			"Logistik",
			"Keamanan",
			"Medis",
			"Media Informasi",
			"Kelembagaan",
			"Materi",
			"Mentor",
			"Media Partner",
			"IT dan Broadcast",
			"Dekorasi dan Wardrobe",
			"Visual Design dan Dokumentasi"
		),
		jabatan: Enum ("Penanggung Jawab", "Wakil Penanggung Jawab", "Staf")
	}
}
```

### PATCH BPH

- Endpoint: /panitia/bph/:id
- Body:

```
{
	nama?: String,
	fakultas?: String,
	jurusan?: String,
	angkatan?: Number,
	divisi?: Enum (
		"Project",
		"Sponsorship",
		"Kesekretariatan",
		"PSDM",
		"Acara Puncak",
		"Eksplorasi",
		"Transportasi dan Konsumsi",
		"Perizinan",
		"Logistik",
		"Keamanan",
		"Medis",
		"Media Informasi",
		"Kelembagaan",
		"Materi",
		"Mentor",
		"Media Partner",
		"IT dan Broadcast",
		"Dekorasi dan Wardrobe",
		"Visual Design dan Dokumentasi"
	),
	jabatan?: Enum ("Penanggung Jawab", "Wakil Penanggung Jawab", "Staf")
}
```

- Success Response:

```
{
	BPH: {
		_id: String,
		nama: String,
		fakultas: String,
		jurusan: String,
		angkatan: Number,
		divisi: Enum (
			"Project",
			"Sponsorship",
			"Kesekretariatan",
			"PSDM",
			"Acara Puncak",
			"Eksplorasi",
			"Transportasi dan Konsumsi",
			"Perizinan",
			"Logistik",
			"Keamanan",
			"Medis",
			"Media Informasi",
			"Kelembagaan",
			"Materi",
			"Mentor",
			"Media Partner",
			"IT dan Broadcast",
			"Dekorasi dan Wardrobe",
			"Visual Design dan Dokumentasi"
		),
		jabatan: Enum ("Penanggung Jawab", "Wakil Penanggung Jawab", "Staf")
	}
}
```

### DELETE BPH

- Endpoint: /panitia/bph/:id
- Success Response:

```
{
	message: String
}
```

### GET All Rapat BPH

- Endpoint: /panitia/bph/rapat
- Success Response:

```
{
	rapat: [
		{
			_id: String,
			peserta: [
				{
					_id: String,
					nama: String,
					fakultas: String,
					jurusan: String,
					angkatan: Number,
					divisi: Enum (
						"Project",
						"Sponsorship",
						"Kesekretariatan",
						"PSDM",
						"Acara Puncak",
						"Eksplorasi",
						"Transportasi dan Konsumsi",
						"Perizinan",
						"Logistik",
						"Keamanan",
						"Medis",
						"Media Informasi",
						"Kelembagaan",
						"Materi",
						"Mentor",
						"Media Partner",
						"IT dan Broadcast",
						"Dekorasi dan Wardrobe",
						"Visual Design dan Dokumentasi"
					),
					jabatan: Enum ("Penanggung Jawab", "Wakil Penanggung Jawab", "Staf")
				}
			],
			divisi: Enum (
				"Project",
				"Sponsorship",
				"Kesekretariatan",
				"PSDM",
				"Acara Puncak",
				"Eksplorasi",
				"Transportasi dan Konsumsi",
				"Perizinan",
				"Logistik",
				"Keamanan",
				"Medis",
				"Media Informasi",
				"Kelembagaan",
				"Materi",
				"Mentor",
				"Media Partner",
				"IT dan Broadcast",
				"Dekorasi dan Wardrobe",
				"Visual Design dan Dokumentasi"
			),
			waktu: Date,
			tempat: String,
			hasil: String
		}
	]
}
```

### GET Single Rapat BPH

- Endpoint: /panitia/bph/rapat/:id
- Success Response:

```
{
	rapat: {
		_id: String,
		peserta: [
			{
				_id: String,
				nama: String,
				fakultas: String,
				jurusan: String,
				angkatan: Number,
				divisi: Enum (
					"Project",
					"Sponsorship",
					"Kesekretariatan",
					"PSDM",
					"Acara Puncak",
					"Eksplorasi",
					"Transportasi dan Konsumsi",
					"Perizinan",
					"Logistik",
					"Keamanan",
					"Medis",
					"Media Informasi",
					"Kelembagaan",
					"Materi",
					"Mentor",
					"Media Partner",
					"IT dan Broadcast",
					"Dekorasi dan Wardrobe",
					"Visual Design dan Dokumentasi"
				),
				jabatan: Enum ("Penanggung Jawab", "Wakil Penanggung Jawab", "Staf")
			}
		],
		divisi: Enum (
			"Project",
			"Sponsorship",
			"Kesekretariatan",
			"PSDM",
			"Acara Puncak",
			"Eksplorasi",
			"Transportasi dan Konsumsi",
			"Perizinan",
			"Logistik",
			"Keamanan",
			"Medis",
			"Media Informasi",
			"Kelembagaan",
			"Materi",
			"Mentor",
			"Media Partner",
			"IT dan Broadcast",
			"Dekorasi dan Wardrobe",
			"Visual Design dan Dokumentasi"
		),
		waktu: Date,
		tempat: String,
		hasil: String
	}
}
```

### POST Rapat BPH

- Endpoint: /panitia/bph/rapat
- Body:

```
{
	peserta?: [String (BPH._id)],
	divisi: Enum (
		"Project",
		"Sponsorship",
		"Kesekretariatan",
		"PSDM",
		"Acara Puncak",
		"Eksplorasi",
		"Transportasi dan Konsumsi",
		"Perizinan",
		"Logistik",
		"Keamanan",
		"Medis",
		"Media Informasi",
		"Kelembagaan",
		"Materi",
		"Mentor",
		"Media Partner",
		"IT dan Broadcast",
		"Dekorasi dan Wardrobe",
		"Visual Design dan Dokumentasi"
	),
	waktu: Date,
	tempat: String,
	hasil: String
}
```

- Success Response:

```
{
	rapat: {
		_id: String,
		peserta: [String (BPH._id)],
		divisi: Enum (
			"Project",
			"Sponsorship",
			"Kesekretariatan",
			"PSDM",
			"Acara Puncak",
			"Eksplorasi",
			"Transportasi dan Konsumsi",
			"Perizinan",
			"Logistik",
			"Keamanan",
			"Medis",
			"Media Informasi",
			"Kelembagaan",
			"Materi",
			"Mentor",
			"Media Partner",
			"IT dan Broadcast",
			"Dekorasi dan Wardrobe",
			"Visual Design dan Dokumentasi"
		),
		waktu: Date,
		tempat: String,
		hasil: String
	}
}
```

### PATCH Rapat BPH

- Endpoint: /panitia/bph/rapat/:id
- Body:

```
{
	peserta?: [String (BPH._id)],
	divisi?: Enum (
		"Project",
		"Sponsorship",
		"Kesekretariatan",
		"PSDM",
		"Acara Puncak",
		"Eksplorasi",
		"Transportasi dan Konsumsi",
		"Perizinan",
		"Logistik",
		"Keamanan",
		"Medis",
		"Media Informasi",
		"Kelembagaan",
		"Materi",
		"Mentor",
		"Media Partner",
		"IT dan Broadcast",
		"Dekorasi dan Wardrobe",
		"Visual Design dan Dokumentasi"
	),
	waktu?: Date,
	tempat?: String,
	hasil?: String
}
```

- Success Response:

```
{
	rapat: {
		_id: String,
		peserta: [String (BPH._id)],
		divisi: Enum (
			"Project",
			"Sponsorship",
			"Kesekretariatan",
			"PSDM",
			"Acara Puncak",
			"Eksplorasi",
			"Transportasi dan Konsumsi",
			"Perizinan",
			"Logistik",
			"Keamanan",
			"Medis",
			"Media Informasi",
			"Kelembagaan",
			"Materi",
			"Mentor",
			"Media Partner",
			"IT dan Broadcast",
			"Dekorasi dan Wardrobe",
			"Visual Design dan Dokumentasi"
		),
		waktu: Date,
		tempat: String,
		hasil: String
	}
}
```

### DELETE Rapat BPH

- Endpoint: /panitia/bph/rapat/:id
- Success Response:

```
{
	message: String
}
```
