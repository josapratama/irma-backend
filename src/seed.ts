import "./config/env";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/db";
import { ENV } from "./config/env";

import { Admin } from "./models/Admin";
import { Certificate } from "./models/Certificate";
import { Experience } from "./models/Experience";
import { Project } from "./models/Project";
import { RecommendationLetter } from "./models/RecommendationLetter";
import { SkillGroup } from "./models/Skill";

// ── Raw Data from static portfolio ──────────────────────────────────────────

const certificates = [
  {
    id: 1,
    title: {
      id: "Essential Skills: Digital Disruption & Transformation",
      en: "Essential Skills: Digital Disruption & Transformation",
    },
    issuer: "GNIK – Kemnaker RI",
    date: "17 Juli 2026",
    score: "Nilai 95",
    category: "Technology",
    images: ["/certificates/cert-digital-disruption.png"],
  },
  {
    id: 2,
    title: {
      id: "Essential Skills: Integrity at Work",
      en: "Essential Skills: Integrity at Work",
    },
    issuer: "GNIK – Kemnaker RI",
    date: "17 Juli 2026",
    score: "Nilai 86",
    category: "Professional",
    images: ["/certificates/cert-integrity-at-work.png"],
  },
  {
    id: 3,
    title: {
      id: "Essential Skills: Emotional Intelligence",
      en: "Essential Skills: Emotional Intelligence",
    },
    issuer: "GNIK – Kemnaker RI",
    date: "17 Juli 2026",
    score: "Nilai 95",
    category: "Soft Skills",
    images: ["/certificates/cert-emotional-intelligence.png"],
  },
  {
    id: 4,
    title: {
      id: "Essential Skills: Emotional Resilience",
      en: "Essential Skills: Emotional Resilience",
    },
    issuer: "GNIK – Kemnaker RI",
    date: "18 Juli 2026",
    score: "Nilai 90",
    category: "Soft Skills",
    images: ["/certificates/cert-emotional-resilience.png"],
  },
  {
    id: 5,
    title: {
      id: "Essential Skills: Social Influence",
      en: "Essential Skills: Social Influence",
    },
    issuer: "GNIK – Kemnaker RI",
    date: "17 Juli 2026",
    score: "Nilai 85",
    category: "Soft Skills",
    images: ["/certificates/cert-social-influence.png"],
  },
  {
    id: 6,
    title: {
      id: "Essential Skills: Adaptability",
      en: "Essential Skills: Adaptability",
    },
    issuer: "GNIK – Kemnaker RI",
    date: "17 Juli 2026",
    score: "Nilai 100",
    category: "Soft Skills",
    images: ["/certificates/cert-adaptability.png"],
  },
  {
    id: 7,
    title: {
      id: "Essential Skills: Self Efficacy",
      en: "Essential Skills: Self Efficacy",
    },
    issuer: "GNIK – Kemnaker RI",
    date: "16 Juli 2026",
    score: "Nilai 90",
    category: "Soft Skills",
    images: ["/certificates/cert-self-efficacy.png"],
  },
  {
    id: 8,
    title: {
      id: "Pengenalan Data Science dan Pemanfaatannya di Berbagai Sektor",
      en: "Introduction to Data Science and Its Applications",
    },
    issuer: "Komdigi – Digital Talent Scholarship 2026",
    date: "18 Juli 2026",
    category: "Data",
    images: [
      "/certificates/cert-data-science.png",
      "/certificates/cert-data-science-detail.png",
    ],
  },
  {
    id: 9,
    title: {
      id: "Panitia Media Partner – Webinar Beasiswa Unggulan",
      en: "Media Partner Committee – Outstanding Scholarship Webinar",
    },
    issuer: "HMK FKIP Universitas Sriwijaya",
    date: "17 Juni 2023",
    category: "Organization",
    images: ["/certificates/cert-webinar-beasiswa.png"],
  },
  {
    id: 10,
    title: {
      id: "Panitia – Aruvena Education Class (AEC)",
      en: "Committee – Aruvena Education Class (AEC)",
    },
    issuer: "Himpunan Mahasiswa Kimia UNSRI",
    date: "11 November 2023",
    category: "Organization",
    images: ["/certificates/cert-aec.png", "/certificates/cert-aec-2.png"],
  },
  {
    id: 11,
    title: {
      id: "Panitia Humas – BIRUNI (Bincang Asik Bareng Alumni)",
      en: "Public Relations Committee – BIRUNI Alumni Event",
    },
    issuer: "Himpunan Mahasiswa Kimia UNSRI",
    date: "13 Juli 2023",
    category: "Organization",
    images: ["/certificates/cert-biruni.png"],
  },
  {
    id: 12,
    title: {
      id: "Panitia – Dies Natalis HMK ke-38",
      en: "Committee – HMK 38th Anniversary",
    },
    issuer: "Himpunan Mahasiswa Kimia UNSRI",
    date: "05 Mei 2024",
    category: "Organization",
    images: ["/certificates/cert-dies-natalis.png"],
  },
  {
    id: 13,
    title: {
      id: "AI Productivity and AI API Integration for Developers",
      en: "AI Productivity and AI API Integration for Developers",
    },
    issuer: "Hacktiv8 Indonesia – Maju Bareng AI",
    date: "09 Agustus 2026",
    category: "Technology",
    images: ["/certificates/cert-hacktiv8-ai-productivity.png"],
  },
  {
    id: 14,
    title: {
      id: "Belajar Canva untuk Kerja Remote dan Dilirik Klien Internasional",
      en: "Learning Canva for Remote Work and International Client Attraction",
    },
    issuer: "SGB VA Course & Community",
    date: "16–17 Juli 2026",
    category: "Professional",
    images: ["/certificates/cert-sgb-canva.png"],
  },
  {
    id: 15,
    title: {
      id: "Intro to Data Analytics",
      en: "Intro to Data Analytics",
    },
    issuer: "RevoU – PT Revolusi Cita Edukasi",
    date: "21 Agustus 2026",
    category: "Data",
    images: ["/certificates/cert-revou-data-analytics.png"],
  },
  {
    id: 16,
    title: {
      id: "Bootcamp Sertifikasi Microsoft Office Excel, Word & Power Point Specialist",
      en: "Microsoft Office Excel, Word & Power Point Specialist Bootcamp",
    },
    issuer: "Karirnex – PT Ebiz Karisma Internasional",
    date: "10–24 Agustus 2026",
    score: "EXPERT",
    category: "Technology",
    images: [
      "/certificates/cert-karirnex-ms-office.png",
      "/certificates/cert-karirnex-ms-office-detail.png",
    ],
  },
  {
    id: 17,
    title: {
      id: "Memulai Pemrograman dengan Python",
      en: "Getting Started with Python Programming",
    },
    issuer: "Dicoding Indonesia",
    date: "2026",
    category: "Technology",
    images: [],
    pdfPath: "/certificates/cert-python-programming.pdf",
  },
];

const recommendationLetters = [
  {
    id: 1,
    title: {
      id: "Surat Rekomendasi Keahlian Microsoft Excel, Word & PowerPoint",
      en: "Microsoft Excel, Word & PowerPoint Skills Recommendation Letter",
    },
    issuer: "Karirnex – PT Ebiz Karisma Internasional",
    date: "03 September 2026",
    pages: [
      "/recommendation-letters/rekomendasi-microsoft-karirnex-1-id.png",
      "/recommendation-letters/rekomendasi-microsoft-karirnex-2-id.png",
    ],
  },
  {
    id: 2,
    title: {
      id: "Skills Recommendation Letter: Microsoft Excel, Word & PowerPoint (EN)",
      en: "Microsoft Excel, Word & PowerPoint Skills Recommendation Letter (EN)",
    },
    issuer: "Karirnex – PT Ebiz Karisma Internasional",
    date: "03 September 2026",
    pages: [
      "/recommendation-letters/rekomendasi-microsoft-karirnex-1-en.png",
      "/recommendation-letters/rekomendasi-microsoft-karirnex-2-en.png",
    ],
  },
];

const projects = [
  {
    id: 1,
    title: {
      id: "Portofolio Microsoft Excel, Word & PowerPoint",
      en: "Microsoft Excel, Word & PowerPoint Portfolio",
    },
    description: {
      id: "Kumpulan proyek kerja nyata mencakup pembuatan dashboard penjualan, laporan data, dan presentasi profesional menggunakan Microsoft Office.",
      en: "A collection of real-work projects including sales dashboard creation, data reports, and professional presentations using Microsoft Office.",
    },
    tags: ["Microsoft Excel", "Microsoft Word", "PowerPoint", "Dashboard"],
    pdfPath: "/projects/portofolio-excel-word-ppt.pdf",
    fileName: "portofolio-excel-word-ppt.pdf",
  },
  {
    id: 2,
    title: {
      id: "Portofolio Project Data Analyst",
      en: "Data Analyst Project Portfolio",
    },
    description: {
      id: "Kumpulan proyek analisis data mencakup eksplorasi data, visualisasi, dan pengolahan dataset menggunakan tools analitik.",
      en: "A collection of data analysis projects including data exploration, visualization, and dataset processing using analytics tools.",
    },
    tags: ["Data Analysis", "Visualization", "Excel", "SQL"],
    pdfPath: "/projects/portofolio-data-analyst.pdf",
    fileName: "portofolio-data-analyst.pdf",
  },
];

const skillsData = [
  {
    category: "hard",
    label: { id: "Hard Skill", en: "Hard Skills" },
    order: 1,
    items: [
      { name: "Microsoft Word", level: 90 },
      { name: "Microsoft Excel", level: 85 },
      { name: "Microsoft PowerPoint", level: 88 },
      { name: "Copywriting", level: 80 },
      { name: "Graphic Design", level: 75 },
      { name: "Data Analysis", level: 72 },
    ],
  },
  {
    category: "soft",
    label: { id: "Soft Skill", en: "Soft Skills" },
    order: 2,
    items: [
      { name: "Problem Solving", level: 88 },
      { name: "Critical Thinking", level: 85 },
      { name: "Teamwork", level: 92 },
      { name: "Time Management", level: 80 },
      { name: "Strategic Planning", level: 78 },
      { name: "Communication Skills", level: 90 },
    ],
  },
  {
    category: "language",
    label: { id: "Bahasa", en: "Languages" },
    order: 3,
    items: [
      { name: "Bahasa Indonesia", level: 98 },
      { name: "English", level: 50 },
    ],
  },
];

const experiencesData = [
  {
    type: "internship",
    title: {
      id: "Mahasiswa Praktik PLP Pendidikan Kimia",
      en: "PLP Chemistry Education Student Practice",
    },
    org: "SMA Negeri 1 Indralaya Utara",
    period: "Oktober 2025 – November 2025",
    order: 1,
    points: [
      {
        id: "Melaksanakan praktik mengajar, membimbing, dan berinteraksi secara langsung dengan siswa dalam proses pembelajaran.",
        en: "Conducted teaching practice, mentoring, and directly interacted with students in the learning process.",
      },
      {
        id: "Mengembangkan kemampuan komunikasi, adaptasi, dan pengelolaan kelas.",
        en: "Developed communication, adaptation, and classroom management skills.",
      },
      {
        id: "Berjaga di ruang Tata Usaha (TU) untuk mendata siswa yang tidak masuk sekolah per kelas, siswa izin keluar sekolah apabila ada keperluan mendesak, tamu, dan pendataan pembagian MBG.",
        en: "Served at the Administrative Office (TU) to record student absences per class, students requesting early dismissal for urgent matters, visitors, and Free Nutritious Meal (MBG) distribution data.",
      },
    ],
    images: [
      {
        src: "/experiences/exp-plp-ceremony.jpeg",
        caption: {
          id: "Upacara Pelepasan Mahasiswa PLP",
          en: "PLP Student Departure Ceremony",
        },
      },
      {
        src: "/experiences/exp-plp-ceremony-2.png",
        caption: {
          id: "Dokumentasi Kegiatan PLP",
          en: "PLP Activity Documentation",
        },
      },
      {
        src: "/experiences/exp-plp-ceremony-3.png",
        caption: {
          id: "Kegiatan Praktik Mengajar PLP",
          en: "PLP Teaching Practice Activity",
        },
      },
    ],
  },
  {
    type: "organization",
    title: {
      id: "Anggota Aktif",
      en: "Active Member",
    },
    org: "Himpunan Mahasiswa Kimia (HMK)",
    period: "2022 – 2024",
    order: 2,
    points: [
      {
        id: "Aktif berpartisipasi dalam kegiatan organisasi sebagai bentuk pengembangan diri dan kontribusi akademik.",
        en: "Actively participated in organizational activities for self-development and academic contribution.",
      },
      {
        id: "Berkontribusi dalam berbagai kegiatan yang mendukung peningkatan kemampuan kerja sama tim dan komunikasi.",
        en: "Contributed to various activities supporting teamwork and communication improvement.",
      },
      {
        id: "Mengembangkan sikap tanggung jawab, disiplin, dan kemampuan beradaptasi dalam lingkungan organisasi.",
        en: "Developed responsibility, discipline, and adaptability in the organizational environment.",
      },
    ],
    events: [
      {
        name: {
          id: "Webinar Beasiswa Unggulan",
          en: "Outstanding Scholarship Webinar",
        },
        role: {
          id: "Divisi Media Partner",
          en: "Media Partner Division",
        },
        period: "Juni 2023",
        points: [
          {
            id: "Menjalin kerja sama dengan media partner untuk mendukung publikasi kegiatan.",
            en: "Established cooperation with media partners to support event publication.",
          },
          {
            id: "Membantu memperluas jangkauan informasi dan meningkatkan partisipasi peserta.",
            en: "Helped expand information reach and increase participant engagement.",
          },
        ],
      },
      {
        name: {
          id: "ARUVENA Education Class (AEC)",
          en: "ARUVENA Education Class (AEC)",
        },
        role: {
          id: "Divisi Humas",
          en: "Public Relations Division",
        },
        period: "November 2023",
        points: [
          {
            id: "Menyusun dan menyebarkan surat undangan kepada dosen dan organisasi terkait.",
            en: "Drafted and distributed invitation letters to lecturers and related organizations.",
          },
          {
            id: "Melakukan publikasi kegiatan melalui penyebaran pamflet sebelum dan saat acara berlangsung.",
            en: "Performed event publication through flyer distribution before and during the event.",
          },
        ],
      },
      {
        name: {
          id: "BIRUNI (Bincang Asik Bareng Alumni)",
          en: "BIRUNI (Alumni Discussion Event)",
        },
        role: {
          id: "Divisi Humas",
          en: "Public Relations Division",
        },
        period: "Juli 2023",
        points: [
          {
            id: "Bertanggung jawab dalam penyebaran surat undangan kepada dosen dan pihak terkait.",
            en: "Responsible for distributing invitation letters to lecturers and related parties.",
          },
          {
            id: "Menjalin komunikasi dengan peserta dan pihak eksternal untuk mendukung kelancaran acara.",
            en: "Maintained communication with participants and external parties to ensure event success.",
          },
        ],
      },
      {
        name: {
          id: "Dies Natalis HMK ke-38",
          en: "HMK 38th Anniversary",
        },
        role: {
          id: "Divisi Transportasi",
          en: "Transportation Division",
        },
        period: "Mei 2024",
        points: [
          {
            id: "Mengatur dan mengoordinasikan kebutuhan transportasi kegiatan.",
            en: "Arranged and coordinated transportation needs for the event.",
          },
          {
            id: "Memastikan kelancaran mobilisasi panitia, tamu, dan perlengkapan acara.",
            en: "Ensured smooth mobilization of committee, guests, and event equipment.",
          },
        ],
      },
    ],
    images: [
      {
        src: "/experiences/exp-hmk-members.png",
        caption: {
          id: "Foto Bersama Anggota HMK UNSRI",
          en: "Group Photo with HMK UNSRI Members",
        },
      },
      {
        src: "/experiences/exp-hmk-members-2.png",
        caption: {
          id: "Dokumentasi Kegiatan HMK UNSRI",
          en: "HMK UNSRI Activity Documentation",
        },
      },
    ],
  },
];

async function seed() {
  console.log("🌱 Menghubungkan ke MongoDB...");
  await connectDB();

  console.log("🧹 Membersihkan data lama...");
  await Promise.all([
    Certificate.deleteMany({}),
    RecommendationLetter.deleteMany({}),
    Project.deleteMany({}),
    SkillGroup.deleteMany({}),
    Experience.deleteMany({}),
  ]);

  console.log("📥 Menyemai Sertifikat...");
  // Format certificates: map id to order and strip numerical id
  const certDocs = certificates.map((c: any, index: number) => ({
    title: c.title,
    issuer: c.issuer,
    date: c.date,
    score: c.score,
    category: c.category,
    images: c.images || [],
    pdfPath: c.pdfPath,
    order: index + 1,
    isVisible: true,
  }));
  await Certificate.insertMany(certDocs);
  console.log(`✅ ${certDocs.length} Sertifikat berhasil disimpan`);

  console.log("📥 Menyemai Surat Rekomendasi...");
  const recoDocs = recommendationLetters.map((r: any, index: number) => ({
    title: r.title,
    issuer: r.issuer,
    date: r.date,
    pages: r.pages,
    order: index + 1,
    isVisible: true,
  }));
  await RecommendationLetter.insertMany(recoDocs);
  console.log(`✅ ${recoDocs.length} Surat Rekomendasi berhasil disimpan`);

  console.log("📥 Menyemai Proyek Portofolio...");
  const projDocs = projects.map((p: any, index: number) => ({
    title: p.title,
    description: p.description,
    tags: p.tags,
    pdfPath: p.pdfPath,
    fileName: p.fileName,
    order: index + 1,
    isVisible: true,
  }));
  await Project.insertMany(projDocs);
  console.log(`✅ ${projDocs.length} Proyek berhasil disimpan`);

  console.log("📥 Menyemai Keahlian & Kompetensi...");
  await SkillGroup.insertMany(skillsData);
  console.log(`✅ ${skillsData.length} Kategori Keahlian berhasil disimpan`);

  console.log("📥 Menyemai Pengalaman & Organisasi...");
  await Experience.insertMany(experiencesData);
  console.log(`✅ ${experiencesData.length} Pengalaman berhasil disimpan`);

  // Buat default admin jika belum ada
  const adminsToEnsure = [
    {
      email: (process.env.ADMIN_EMAIL || "admin@irmairyani.com").toLowerCase(),
      password: process.env.ADMIN_PASSWORD || "Admin123!",
    },
    {
      email: "admin@josapratama.com",
      password: "IrmaAdmin2026!",
    },
  ];

  for (const adm of adminsToEnsure) {
    const existing = await Admin.findOne({ email: adm.email });
    if (!existing) {
      const passwordHash = await bcrypt.hash(adm.password, 12);
      await Admin.create({ email: adm.email, passwordHash });
      console.log(`👤 Admin dibuat: ${adm.email} (Password: ${adm.password})`);
    } else {
      console.log(`👤 Admin ${adm.email} sudah terdaftar`);
    }
  }

  console.log("\n🎉 SEMUA DATA SEEDER BERHASIL DISIMPAN!");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding gagal:", err);
  mongoose.disconnect();
  process.exit(1);
});
