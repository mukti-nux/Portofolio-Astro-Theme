export interface DokumentasiItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const dokumentasiList: DokumentasiItem[] = [
  {
    id: "DokSekolahPresenSD",
    title: "Dok. Sekolah PresentSD",
    description: "Documentation of Presentation and Promotion activities to Elementary Schools",
    imageUrl: "https://github.com/mukti-nux/portof-asset/blob/main/RHO_3443.JPG?raw=true",
    link: "http://seeker-project-vcl.vercel.app/index.html?id=DokSekolahPresenSD",
  },
  {
    id: "DokSekolah17052025",
    title: "Dok. Sekolah 17052025",
    description: "Documentation of the BPK-RI Museum Magelang visit activities",
    imageUrl: "https://github.com/mukti-nux/portof-asset/blob/main/IMG_0534.jpg?raw=true",
    link: "http://seeker-project-vcl.vercel.app/index.html?id=DokSekolah17052025",
  },
  {
    id: "DokSekolah02052025",
    title: "Dok. Sekolah 02052025",
    description: "Documentation of National Education Day Ceremony activities",
    imageUrl: "https://github.com/mukti-nux/portof-asset/blob/main/IMG_0340.JPG?raw=true",
    link: "http://seeker-project-vcl.vercel.app/index.html?id=DokSekolah02052025",
  },
];

export default dokumentasiList;
