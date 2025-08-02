type ProdukItem = {
  gambar: string;
  judul: string;
  nama: string;
  deskripsiSingkat: string;
  judulDetail: string;
  deskripsiLengkap: string;
  spesifikasi: {
    usedTime: string;
    chargingPort: string;
    compatible: string;
    bluetooth: string;
    control: string;
  };
};

type FilmItem = {
  gambar: string;
  judul: string;
  nama: string;
  sinopsis: string;
  sutradara: string;
  tahun: number;
  durasi: string;
  linkTrailer: string;
};

type KategoriItem = {
  tipe: 'produk' | 'film';
  items: (ProdukItem | FilmItem)[];
};

export const produkList = [
  {
    kategori: "Film",
    tipe: "film",
    items: [
      {
        gambar: "/images/product/halamanpertama.png",
        judul: "HALAMAN PERTAMA",
        nama: "Drama Remaja",
        sinopsis: "Dulu ia bersinar lewat buku dan prestasi, kini tenggelam dalam dunia maya tanpa batas. Tapi harapan tak pernah benar-benar padam. Dengan cinta seorang ibu dan secuil kesadaran dari dalam diri, ia kembali menapaki jalan literasi—jalan menuju masa depan",
        sutradara: "Hasan Mukti",
        tahun: 2025,
        durasi: "10 minute",
        linkTrailer: "https://youtube.com/..."
      }
    ]
  },
  {
    kategori: "Headset",
    tipe: "elektronik",
    items: [
      {
        gambar: "/images/product/gm2pro.jpg",
        nama: "Thinkplus GM2 Pro",
        judul: "Headset Gaming",
        deskripsiSingkat: "Headset ringan dan nyaman untuk bermain game.",
        judulDetail: "GM2 Pro Detail",
        deskripsiLengkap: "Headset ini cocok untuk semua platform, dengan kualitas suara yang mendalam dan noise cancelling.",
        spesifikasi: {
          usedTime: "10 jam",
          chargingPort: "USB-C",
          compatible: "Android, iOS, PC",
          bluetooth: "5.1",
          control: "Sentuh"
        }
      },
]}];
