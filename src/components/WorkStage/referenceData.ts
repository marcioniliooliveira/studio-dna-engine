export interface ProjectSlot {
  index: number;
  slug: string;
  shortName: string;
  title: string;
  category: string;
  year: string;
  thumbnail: string;
  aspectRatio: [number, number];
  description: string;
  link: string;
}

export const BRAND_TOKENS = {
  bgBase: '#262220',
  bgSurface: '#FAF9F6',
  bgPanel: '#EDEAE6',
  bgDark: '#000000',
  textLight: '#F3EEE8',
  textDark: '#2E2B28',
  headerBg: '#3A3632',
  headerBorderLight: '#b8b3ac',
  // Cor normalizada [R, G, B] de #FAF9F6 (bgSurface) para o uniforme u_wash
  washRgb: [250 / 255, 249 / 255, 246 / 255] as [number, number, number],
  // Cores base do piso (shader_8.frag) baseadas em pure black (#000000)
  floorC0: [0.0, 0.0, 0.0] as [number, number, number],
  floorC1: [0.0, 0.0, 0.0] as [number, number, number],
} as const;

export const RIBBON_STRIDE = 32.0;
export const CARD_PLANE_SIZE: [number, number] = [28.8, 18.0];

export const REFERENCE_PROJECTS: ProjectSlot[] = [
  {
    index: 0,
    slug: 'evo-money',
    shortName: 'EVO Money',
    title: 'Design System & Web App',
    category: 'Plataforma Web & Escala Modular',
    year: '2025',
    thumbnail: './assets/_astro/evo-money-thumbnail-16-9.B00Lym5-_qy4LO.webp',
    aspectRatio: [1440, 810],
    description: 'Arquitetura modular e sistema de design escalável com rigor tipográfico e performance determinística.',
    link: '#contact',
  },
  {
    index: 1,
    slug: 'plant-tag',
    shortName: 'Plant Tag',
    title: 'Creative Motion & Interação',
    category: 'Física Tátil & GSAP',
    year: '2024',
    thumbnail: './assets/_astro/plant-tag-thumbnail-16-9.CEaBMfaz_Z64N3z.webp',
    aspectRatio: [1440, 810],
    description: 'Interfaces interativas ricas em movimento fluido e resposta tátil sem prejudicar o tempo de resposta.',
    link: '#contact',
  },
  {
    index: 2,
    slug: 'swisshaus',
    shortName: 'Swiss Haus',
    title: 'Plataforma Web Modular',
    category: 'Next.js & Astro SSG',
    year: '2024',
    thumbnail: './assets/_astro/swisshaus-thumbnail-16-9.Dl-P9oLP_Z1jbLrY.webp',
    aspectRatio: [1440, 804],
    description: 'Construção frontend moderna, carregamento rápido em qualquer ecrã e zero dependências acumuladas à toa.',
    link: '#contact',
  },
  {
    index: 3,
    slug: 'betahaus',
    shortName: 'Betahaus',
    title: 'Sistemas & Ferramentas Internas',
    category: 'Automação & Motores Determinísticos',
    year: '2023',
    thumbnail: './assets/_astro/betahaus-thumbnail-16-9.ZH-WOOsP_GLeLu.webp',
    aspectRatio: [1440, 810],
    description: 'Automações, scripts e motores determinísticos que transformam esforço manual em processo seguro.',
    link: '#contact',
  },
];

export const JESPER_CANONICAL_ASSETS = {
  transcoder: './assets/jesper/basis_transcoder.wasm',
  fontSans400: './assets/jesper/sans-400.bin',
  fontSans500: './assets/jesper/sans-500.bin',
  awardGlb: './assets/jesper/award.glb',
  llamaGlb: './assets/jesper/llama.glb',
} as const;

