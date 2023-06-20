// Array Jawaban yang akan ditampilkan dan nilai cfUser
export const answerConfig = [
  {
    label: "Tidak Yakin", //tidak
    value: 0,
  },
  {
    label: "Tidak Tahu", 
    value: 0.2,
  },
  {
    label: "Sedikit Yakin", //sedikit yakin
    value: 0.4,
  },
  {
    label: "Cukup Yakin", //cukup yakin
    value: 0.6,
  },
  {
    label: "Yakin", //yakin
    value: 0.8,
  },
  {
    label: "Sangat Yakin", //sangat yakin
    value: 1,
  },
];

// Array Pertanyaan yang akan ditampilkan beserta kode dan nilai cfPakar
export const questionConfig = [
  {
    kode: "G01",
    cf: 0.6,
    question: "Apakah Anda Sering merasa sakit kepala jika banyak tugas?",
  },

  {
    kode: "G02",
    cf: 0.2,
    question: "Apakah Anda sering merasa lelah karena tugas yang menumpuk?",
  },

  {
    kode: "G03",
    cf: 0.4,
    question: "Apakah Anda mudah lelah saat mengerjakan tugas atau skripsi?",
  },

  {
    kode: "G04",
    cf: 0.6,
    question:
      "Apakah Anda merasa tidak memiliki waktu yang cukup untuk belajar?",
  },

  {
    kode: "G05",
    cf: 0.5,
    question: "Apakah Anda malas dalam menghadapi tugas akhir?",
  },

  {
    kode: "G06",
    cf: 0.7,
    question: "Apakah Anda sering menunda tugas atau skripsi?",
  },

  {
    kode: "G07",
    cf: 0.8,
    question:
      "Apakah Anda sering membanting benda sekitar ketika banyak tugas?",
  },

  {
    kode: "G08",
    cf: 0.8,
    question: "Apakah Anda kurang sabar dalam mengerjakan tugas atau skripsi?",
  },

  {
    kode: "G09",
    cf: 0.7,
    question:
      "Apakah Anda sering merasa kesal saat dosen pembimbing tidak merespon chat?",
  },

  {
    kode: "G10",
    cf: 0.6,
    question: "Apakah Anda merasa kesulitan saat mengerjakan skripsi?",
  },

  {
    kode: "G11",
    cf: 0.6,
    question:
      "Apakah Anda merasa bingung saat akan membuat keputusan akademik?",
  },

  {
    kode: "G12",
    cf: 0.4,
    question: "Apakah Anda merasa tugas yang diberikan dosen menyulitkan?",
  },

  {
    kode: "G13",
    cf: 0.8,
    question:
      "Apakah Anda merasa beberapa dosen memberikan penjelasan yang terbelit-belit?",
  },

  {
    kode: "G14",
    cf: 0.7,
    question: "Apakah Anda merasa dosen pembimbing kurang ramah?",
  },

  {
    kode: "G15",
    cf: 0.8,
    question: "Apakah Anda kadang menangis saat memiliki tugas yang banyak?",
  },

  {
    kode: "G16",
    cf: 0.8,
    question: "Apakah Anda memiliki emosi yang tidak stabil saat banyak tugas?",
  },

  {
    kode: "G17",
    cf: 0.7,
    question: "Apakah emosi Anda terkuras pada kegiatan akademik?",
  },

  {
    kode: "G18",
    cf: 0.2,
    question: "Apakah Anda semangat mengerjakan tugas akhir?",
  },

  {
    kode: "G19",
    cf: 0.2,
    question: "Apakah Anda langsung mengerjakan tugas atau skripsi?",
  },

  {
    kode: "G20",
    cf: 0.3,
    question: "Apakah Anda sabar dalam mengerjakan tugas atau skripsi?",
  },

  {
    kode: "G21",
    cf: 0.2,
    question: "Apakah Anda fokus dalam mengerjakan tugas atau skripsi?",
  },

  {
    kode: "G22",
    cf: 0.2,
    question: "Apakah Anda yakin dengan nilai tugas akhir yang dikerjakan?",
  },

  {
    kode: "G23",
    cf: 0.2,
    question: "Apakah Anda tidak emosi saat banyak tugas?",
  },
];

export const stressLevel = [
  {
    kode: "S01",
    title: "Tidak Stress",
    gejala: [
      "G05",
      "G10",
      "G11",
      "G12",
      "G18",
      "G19",
      "G20",
      "G21",
      "G22",
      "G23",
    ],
    penjelasan:
      "Perlu diketahui, Stress Tingkat I termasuk ke golongan tidak stres. Anda masih mampu mengontrol emosi stres Anda dengan baik dan dapat menjalankan aktivitas seperti biasa. Terus pertahankan kebiasaan serta semangat Anda dalam menjalani kegiatan sehari-hari.",
    saran: `Dalam diagnosis Stres Tingkat I yang dinyatakan sebagai golongan tidak stres, berikut adalah beberapa solusi yang dapat dilakukan oleh para mahasiswa agar tetap memiliki emosi yang stabil dan tidak mengalami stres akademik saat menjalankan kehidupan sehari-hari :
      <ol>
      <li>
      Mempertahankan apa yang sudah dilakukan untuk merawat kesehatan fisik dan mental.
      </li>
      <li>
      Membuat dan merefleksikan daftar kegiatan atau hobi yang dapat menyemangati diri.
      </li>
      <li>
      Mengenali hal yang membuat diri bersemangat dalam melakukan kegiatan sehari-hari selama ini.
      </li>
      </ol>
      `,
  },
  {
    kode: "S02",
    title: "Stress Rendah",
    gejala: ["G01", "G02", "G03", "G05", "G06", "G09", "G11", "G12", "G17"],
    penjelasan:
      "Perlu diketahui, Stres Tingkat II termasuk ke golongan stres rendah. Anda mulai mengalami faktor-faktor yang memunculkan perasaan stres dalam diri Anda, namun Anda masih dapat mengontrol hal tersebut dengan cukup baik. Tetaplah semangat dalam menjalani aktivitas Anda dan jangan sampai terganggu dengan perasaan stres Anda.    ",
    saran: `
      Dalam diagnosis Stres Tingkat II yang merupakan golongan sedikit stres dan terjadi karena diri Anda telah menunjukkan gejala-gejala penyebab stres dalam tingkah laku sehari-hari. Berdasarkan para pakar, beberapa solusi sebagai berikut dapat dilakukan untuk mengurangi stres tersebut, seperti :
      <ol>
      <li>
      Meluangkan waktu untuk merefleksikan diri terkait kegiatan yang menguras energi diri selama 2 minggu terakhir.
      </li>
      <li>
      Membuat daftar kegiatan-kegiatan yang menguras energi.
      </li>
      <li>
      Melakukan kegiatan yang dapat membuat diri rileks dan membantu mengisi energi diri kembali.
      </li>
      <li>
      Mengidentifikasikan sumber stres dan membuat langkah-langkah kecil untuk menyelesaikan permasalahan tersebut.
      </li>
      <li>
      Mencari dukungan sosial dengan bercerita kepada orang yang dipercaya di lingkungan sekitar, seperti teman, keluarga, dan lain-lain.
      </li>
      </ol>

      `,
  },
  {
    kode: "S03",
    title: "Stress Sedang",
    gejala: ["G01", "G04", "G09", "G13", "G14", "G16"],
    penjelasan:
      "Perlu diketahui, Stres Tingkat III termasuk ke golongan stres sedang. Faktor-faktor penyebab perasaan stres mulai mempengaruhi aktivitas maupun perilaku Anda. Hal itu biasa terjadi dalam kehidupan sehari-hari, namun jangan sampai Anda tenggelam dalam perasaan stres tersebut. Mari atasi perasaan stres Anda secara perlahan, namun pasti",
    saran: `
      Dalam diagnosis Stres Tingkat III yang menjadi golongan lumayan stres karena gejala-gejala stres yang telah muncul mulai mempengaruhi dan mengganggu aktivitas sehari-hari. Ada beberapa solusi yang dapat dilakukan agar para mahasiswa tidak tenggelam terlalu dalam ketika merasakan stres di tingkat tersebut, yakni :
      <ol>
        <li>
        Meluangkan waktu untuk merefleksikan diri terkait kegiatan yang menguras energi diri selama 2 minggu terakhir.
      </li>

      <li>
      Membuat daftar kegiatan-kegiatan yang menguras energi.
      </li>
      <li>
      Melakukan kegiatan yang dapat membuat diri rileks dan membantu mengisi energi diri kembali.
    </li>
    <li>
    Mengidentifikasikan sumber stres dan membuat langkah-langkah kecil untuk menyelesaikan permasalahan tersebut.
  </li>
  <li>
  Mencari dukungan sosial dengan bercerita kepada orang yang dipercaya di lingkungan sekitar, seperti teman, keluarga, dan lain-lain.
</li>
<li>
Mempertimbangkan untuk mencari dukungan profesional, yakni mengkonsultasikan permasalahan ke psikolog atau psikiater.
</li>
      </ol>
`,
  },
  {
    kode: "S04",
    title: "Sangat Tinggi",
    penjelasan:
      "Perlu diketahui, Stres Tingkat IV termasuk ke golongan stres tinggi. Mungkin tanpa Anda sadari, Anda telah memiliki faktor-faktor penyebab perasaan stres dalam diri Anda semenjak dahulu. Hal tersebut juga mungkin mengganggu aktivitas Anda sehingga Anda kesulitan dalam berkegiatan seperti biasa. Anda tidak perlu khawatir, karena fase tersebut dapat terjadi pada siapapun. Untuk sekarang, Anda tidak boleh menyerah dan perlu mengambil langkah kecil dalam mengatasi perasaan stres Anda.    ",
    gejala: ["G06", "G07", "G08", "G14", "G15", "G17"],
    saran: `Dalam diagnosis Stres Tingkat IV yang menjadi golongan sangat stres karena telah mengalami gejala-gejala stres terlalu lama dan tenggelam terlalu dalam di perasaan stres tersebut. Pada tingkat ini, perasaan stres yang dialami sering mengganggu aktivitas sehari-hari. Berdasarkan para pakar, ada beberapa solusi yang dapat dilakukan untuk mengatasi perasaan tersebut, yaitu :
    <ol>
    <li>
    Mengakui bahwa diri sedang stres dan memerlukan waktu untuk mengelola emosi tersebut tanpa perlu terburu-buru.
    </li>
    <li>
    Meluangkan waktu untuk merefleksikan diri terkait kegiatan yang menguras energi diri selama 2 minggu terakhir.
    </li>
    <li>
    Membuat daftar kegiatan-kegiatan yang menguras energi.
    </li>
    <li>
    Melakukan kegiatan yang dapat membuat diri rileks dan membantu mengisi energi diri kembali.
    </li>
    <li>
    Mengusahakan untuk bercerita kepada pihak profesional, seperti psikolog atau psikiater.
    </li>
    <li>
    Mengidentifikasikan sumber stres dan membuat langkah-langkah kecil untuk menyelesaikan permasalahan tersebut.
    </li>
    <li>
    Merayakan keberhasilan kecil setelah menyelesaikan tiap permasalahan, seperti membeli makanan favorit karena telah berhasil untuk mengerjakan tugas perkuliahan.
    </li>
    </ol>
    `,
  },
];
