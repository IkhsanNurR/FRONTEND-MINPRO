import {
  BabyChangingStation,
  MailOutlined,
  TuneOutlined,
} from "@mui/icons-material";
import gambar1 from "../../public/Bimoli.jpg";
import gambar2 from "../../public/logo.png";
import gambar3 from "../../public/logo3.png";
import mahakam from "../../public/mahakax.png";
import astra from "../../public/astra.png";
import bumn from "../../public/bumn.png";
import ibm from "../../public/ibm.png";
import mandiri from "../../public/mandiri.png";
import bsi from "../../public/bsi.png";
import sinarmas from "../../public/sinarmas.png";
import ot from "../../public/ot.png";
import codeid from "../../public/codeid.png";
import user1 from "../../public/g1.jpeg";
import user2 from "../../public/g2.jpeg";

export const Testimoni = [
  {
    gambar: user1,
    nama: "Putri",
    review:
      "Bootcamp ini benar-benar mengubah hidup saya! Saya belajar banyak keterampilan teknis dan juga soft skills yang sangat berharga. Instruktur yang berpengalaman dan lingkungan belajar yang mendukung membuat pengalaman ini luar biasa.",
  },
  {
    gambar: user2,
    nama: "Aji",
    review:
      "Bootcamp ini sangat intensif tetapi sepadan dengan usaha yang saya lakukan. Saya merasa dipersiapkan dengan baik untuk dunia kerja setelah menyelesaikan bootcamp ini. Materi yang diajarkan sangat relevan dengan industri dan saya dapat langsung mengaplikasikannya.",
  },
  {
    gambar: user1,
    nama: "Dani",
    review:
      "Saya sangat puas dengan pengalaman saya di bootcamp ini. Kurikulumnya terstruktur dengan baik dan mendalam. Saya juga mendapatkan kesempatan untuk bekerja pada proyek nyata dan berkolaborasi dengan sesama peserta bootcamp.",
  },
  {
    gambar: user2,
    nama: "Ikhsan Hamid",
    review:
      "Salah satu hal terbaik tentang bootcamp ini adalah jaringan kontak yang saya bangun. Saya bertemu dengan banyak profesional di industri yang sama dan dapat belajar dari pengalaman mereka. Hal ini sangat berharga dalam membangun karier di bidang ini.",
  },
  {
    gambar: user1,
    nama: "Ikhsan Nur Rahmaan",
    review:
      "Saya awalnya tidak memiliki latar belakang teknis yang kuat, tetapi bootcamp ini membantu saya untuk mempelajari keterampilan baru secara intensif. Instruktur yang sabar dan dukungan teman-teman sekelas membuat proses belajar menjadi lebih mudah.",
  },
  {
    gambar: user2,
    nama: "Farrel Rizky",
    review:
      "Bootcamp ini memberikan pendekatan yang sangat praktis dalam pembelajaran. Saya dapat langsung mengaplikasikan apa yang saya pelajari dalam proyek-proyek praktis. Ini membantu saya memahami konsep dengan lebih baik dan meningkatkan keterampilan saya secara signifikan.",
  },
  {
    gambar: user1,
    nama: "Ade Kurniawan",
    review:
      "Saya mengikuti bootcamp ini dengan harapan mendapatkan pekerjaan baru dan saya tidak kecewa. Setelah menyelesaikan bootcamp, saya mendapatkan tawaran pekerjaan yang sangat menarik. Ini adalah investasi terbaik yang pernah saya lakukan untuk karier saya.",
  },
  {
    gambar: user2,
    nama: "Mike",
    review:
      "Bootcamp ini memberikan lingkungan yang sangat inklusif dan mendukung. Saya merasa nyaman untuk bertanya dan berbagi pendapat dengan instruktur dan teman-teman sekelas. Semua orang saling membantu dalam proses belajar.",
  },
  {
    gambar: user1,
    nama: "Zufar",
    review:
      "Bootcamp ini memberikan lingkungan yang sangat inklusif dan mendukung. Saya merasa nyaman untuk bertanya dan berbagi pendapat dengan instruktur dan teman-teman sekelas. Semua orang saling membantu dalam proses belajar.",
  },
];

const dataDummy = [
  {
    section: "Technical",
    type: "hardskill",
    skills: [
      { name: "Fundamental", week: 12, tags: "fundamental" },
      { name: "Object Oriented Programming", week: 12, tags: "oop" },
      { name: "Database", week: 12, tags: "database" },
    ],
  },
  {
    section: "Softskill",
    type: "softskill",
    skills: [
      { name: "Communication", week: 12, tags: "communication" },
      { name: "Team Work", week: 12, tags: "teamwork" },
      { name: "Selft Learning", week: 12, tags: "selft_learning" },
    ],
  },
  {
    section: "Presentation",
    type: "softskill",
    skills: [
      { name: "Public Speaking", week: 12, tags: "public_speaking" },
      { name: "Self Confident", week: 12, tags: "self_confident" },
      { name: "Adaptation", week: 12, tags: "adaptation" },
    ],
  },
];

export const DataCarousel = [
  {
    judul: "Bootcamp Reguler",
    isi: `Bootcamp reguler adalah program pelatihan intensif yang dirancang
     untuk membekali peserta dengan keterampilan dan pengetahuan yang diperlukan dalam bidang tertentu
      dalam waktu relatif singkat. Dalam bootcamp ini, peserta akan mengikuti serangkaian sesi pelatihan
       yang terstruktur dan terfokus, dengan tujuan memberikan pemahaman mendalam dan keterampilan praktis
        yang dapat langsung diterapkan. Selama bootcamp reguler, peserta akan berpartisipasi dalam berbagai
         kegiatan pembelajaran, seperti kuliah, presentasi, proyek, dan latihan praktis. Bootcamp ini dipandu
          oleh instruktur yang berpengalaman dan ahli di bidangnya, yang memberikan panduan, umpan balik, dan
           dukungan kepada peserta selama masa pelatihan.`,
    label: "San Francisco – Oakland Bay Bridge, United States",
    gambar: gambar2,
  },
  {
    judul: "Bootcamp Online",
    isi: `Bootcamp online adalah program pelatihan yang dapat diakses
     secara daring melalui platform pembelajaran digital. Dalam bootcamp
      online, peserta memiliki fleksibilitas untuk mengikuti pelatihan sesuai
      dengan jadwal dan waktu yang mereka pilih. Dalam bootcamp online, peserta
       akan mendapatkan akses ke berbagai materi pembelajaran, seperti video kuliah,
        modul pembelajaran, tugas, dan proyek. Materi ini dapat diakses melalui
         platform pembelajaran yang interaktif, yang memungkinkan peserta untuk belajar
          dengan kecepatan mereka sendiri dan mengulang materi sesuai kebutuhan.`,
    label: "Bird",
    gambar: gambar2,
  },
  {
    judul: "Bootcamp Corporate",
    isi: `Bootcamp corporate adalah program pelatihan khusus yang dirancang untuk
     memenuhi kebutuhan dan tujuan perusahaan dalam meningkatkan keterampilan dan
      pengetahuan karyawan mereka. Bootcamp ini disesuaikan dengan konteks dan
       lingkungan kerja perusahaan, dengan fokus pada pengembangan keterampilan yang
        relevan untuk kemajuan karir dan kesuksesan organisasi. Dalam bootcamp corporate,
         program pelatihan dikustomisasi sesuai dengan kebutuhan dan keinginan perusahaan.
          Ini dapat meliputi topik seperti pengembangan kepemimpinan, keterampilan komunikasi,
           manajemen proyek, pemecahan masalah, pengembangan produk, dan banyak lagi.
            Bootcamp ini dirancang untuk meningkatkan keterampilan karyawan dalam area
             yang spesifik dan relevan dengan tanggung jawab dan tuntutan pekerjaan mereka.`,
    label: "Bali, Indonesia",
    gambar: gambar2,
  },
];

export const Card = [
  {
    gambar: "https://www.vectorlogo.zone/logos/nodejs/nodejs-horizontal.svg",
    judul: "NodeJs Full Stack",
    tugas: "Build Rest API With NodeJs",
    durasi: "3 Bulan",
    Pembelian: "Online / Offline",
  },
  {
    gambar: "https://static.javatpoint.com/core/images/java-logo3.png",
    judul: "Java Developer",
    tugas: "Build Rest API With Java",
    durasi: "3 Bulan",
    Pembelian: "Online / Offline",
  },
  {
    gambar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/512px-.NET_Core_Logo.svg.png?20210328084203",
    judul: ".NET Core",
    tugas: "Build Rest API With .NET",
    durasi: "3 Bulan",
    Pembelian: "Online / Offline",
  },
  {
    gambar:
      "https://storage.googleapis.com/cms-storage-bucket/847ae81f5430402216fd.svg",
    judul: "Flutter",
    tugas: "Build Rest API With Flutter",
    durasi: "3 Bulan",
    Pembelian: "Online / Offline",
  },
  {
    gambar:
      "https://seeklogo.com/images/A/android-logo-9E4539A7DE-seeklogo.com.png",
    judul: "Android Developer",
    tugas: "Build Rest API With Android",
    durasi: "3 Bulan",
    Pembelian: "Online / Offline",
  },
  {
    gambar: "https://go.dev/blog/go-brand/Go-Logo/PNG/Go-Logo_Aqua.png",
    judul: "Golang ",
    tugas: "Build Rest API With Golang",
    durasi: "3 Bulan",
    Pembelian: "Online / Offline",
  },
];

export const ApplyProgressDashboard = [
  {
    gambar: gambar1,
    judul: ".NET Core Bootcamp",
    applyDate: "12-juni-2021",
    status: "passed",
    progress: "Waiting List",
  },
  {
    gambar: gambar2,
    judul: "Java Fullstack Bootcamp",
    applyDate: "12-maret-2021",
    status: "failed",
    progress: "Filtering Test",
  },
  {
    gambar: gambar2,
    judul: "NodeJs Bootcamp",
    applyDate: "12-september-2023",
    status: "passed",
    progress: "Waiting List",
  },
];

export const items: any = [
  {
    title: "Navigation One",
    key: "sub1",
    icon: <MailOutlined />,
    children: [
      {
        title: "Option 1",
        key: "1",
        children: [
          {
            title: "Samping 1",
            key: "1-1",
          },
          {
            title: "Samping 2",
            key: "1-2",
          },
        ],
      },
      {
        title: "Option 2",
        key: "2",
      },
      {
        title: "Option 3",
        key: "3",
      },
      {
        title: "Option 4",
        key: "4",
      },
    ],
  },
  {
    title: "Navigation Two",
    key: "sub2",
    icon: <BabyChangingStation />,
    children: [
      {
        title: "Option 5",
        key: "5",
      },
      {
        title: "Option 6",
        key: "6",
      },
      {
        title: "Submenu",
        key: "sub3",
        children: [
          {
            title: "Option 7",
            key: "7",
          },
          {
            title: "Option 8",
            key: "8",
          },
        ],
      },
    ],
  },
  {
    title: "Navigation Three",
    key: "sub4",
    icon: <TuneOutlined />,
    children: [
      {
        title: "Option 9",
        key: "9",
      },
      {
        title: "Option 10",
        key: "10",
      },
      {
        title: "Option 11",
        key: "11",
      },
      {
        title: "Option 12",
        key: "12",
      },
    ],
  },
];

export const partnerShip = [
  {
    nama: "mahakam",
    gambar: mahakam,
  },
  {
    nama: "bsi",
    gambar: bsi,
  },
  {
    nama: "mandiri",
    gambar: mandiri,
  },
  {
    nama: "astra",
    gambar: astra,
  },
  {
    nama: "bumn",
    gambar: bumn,
  },
  {
    nama: "ibm",
    gambar: ibm,
  },
  {
    nama: "sinarmas",
    gambar: sinarmas,
  },
  {
    nama: "ot",
    gambar: ot,
  },
  {
    nama: "codeid",
    gambar: codeid,
  },
  {
    nama: "gambar2",
    gambar: gambar2,
  },
];

export const alumniTestimoni = [
  {
    gambar: "https://i.pravatar.cc/150?img=10",
    nama: "Dian",
    batch: "BATCH#1",
    review:
      "Saya sangat senang dengan pengalaman bootcamp ini! Instruktur hebat dan materi yang terstruktur dengan baik. Bootcamp ini mempersiapkan saya dengan keterampilan yang diperlukan di dunia nyata. Sangat direkomendasikan!",
  },
  {
    gambar: "https://i.pravatar.cc/150?img=9",
    nama: "Dewi",
    batch: "BATCH#1",
    review:
      "Pengalaman bootcamp ini luar biasa! Instruktur hebat, materi terstruktur dengan baik, dan wawasan baru yang dapat saya terapkan dalam bisnis saya. Sangat berharga!",
  },
  {
    gambar: "https://i.pravatar.cc/150?img=5",
    nama: "Putri",
    batch: "BATCH#1",
    review:
      "Bootcamp ini mengubah karir saya sebagai programmer. Materi yang disampaikan secara komprehensif, instruktur yang ahli, dan latihan proyek yang nyata membuat saya siap menghadapi tuntutan industri.",
  },
  {
    gambar: "https://i.pravatar.cc/150?img=11",
    nama: "Aji",
    batch: "BATCH#2",
    review:
      "Bootcamp ini mengubah hidup saya sebagai seorang programmer. Instruktur yang luar biasa dan materi yang terstruktur dengan baik membuat saya memiliki keterampilan yang dibutuhkan di dunia nyata.",
  },
  {
    gambar: "https://i.pravatar.cc/150?img=7",
    nama: "Dafa",
    batch: "BATCH#1",
    review:
      "Bootcamp ini benar-benar mengubah perjalanan karir saya sebagai programmer. Materi yang relevan, instruktur yang berpengalaman, dan lingkungan belajar yang mendukung telah membantu saya meningkatkan keterampilan dan kepercayaan diri saya.",
  },
  {
    gambar: "https://i.pravatar.cc/150?img=8",
    nama: "Efen",
    batch: "BATCH#1",
    review:
      "Bootcamp ini luar biasa! Saya mendapatkan pengetahuan dan keterampilan yang diperlukan untuk menjadi seorang programmer yang sukses. Instruktur yang kompeten dan suasana belajar yang mendukung membuat pengalaman saya sangat berharga.",
  },
];

export default dataDummy;
