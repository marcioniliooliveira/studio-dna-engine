export interface ViewportOptions {
  width: number;
  height: number;
}

export interface PipelineOptions {
  url: string;
  mode?: 'all' | 'clone' | 'dna' | 'ui';
  outputDir?: string;
  headless?: boolean;
  timeout?: number;
  viewport?: ViewportOptions;
  userAgent?: string;
  proxy?: {
    server: string;
    username?: string;
    password?: string;
  };
}

export interface SiteInfo {
  siteType: 'STATIC' | 'SPA_CSR' | 'SPA_SSR' | 'STATIC_GENERATED' | 'WEBFLOW' | 'FRAMER' | 'WORDPRESS';
  cloneMode: 'FULL_CLONE' | 'STRUCTURED_CLONE' | 'DNA_ONLY';
  framework: string;
  cloneCapacity: number;
  warning: string | null;
  detection?: any;
}

export interface TypographySpec {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing?: string;
  color?: string;
}

export interface SectionSpec {
  id: string;
  tag: string;
  classes: string[];
  approxHeight: number;
  summaryText: string;
}

export interface DesignDNA {
  colors: {
    variables: Record<string, string>;
    defaults: {
      backgroundColor: string;
      color: string;
    };
  };
  typography: {
    h1?: TypographySpec;
    h2?: TypographySpec;
    h3?: TypographySpec;
    paragraph?: TypographySpec;
    button?: TypographySpec;
    [key: string]: TypographySpec | undefined;
  };
  sections: SectionSpec[];
  detectedScripts: string[];
  detectedCSS: string[];
}

export interface UIUXFeatures {
  gsap: {
    detected: boolean;
    version: string | null;
    hasScrollTrigger: boolean;
    scrollTriggerInstances: number;
    tweensCount: number;
    plugins: string[];
    timelines?: Array<{ duration: number; ease: string; props: Record<string, any> }>;
  };
  lenis: {
    detected: boolean;
    config: any;
  };
  microInteractions: {
    magneticButtons: Array<{ tag: string; text: string; selector: string }>;
    tiltCards: any[];
    spotlightElements: any[];
    textScramble: boolean;
  };
  webglCanvas: {
    canvasCount: number;
    hasThreeJs: boolean;
    shadersCount?: number;
    shaders: Array<{ type: string; source: string; timestamp?: number }>;
  };
  typography: {
    splitTextDetected: boolean;
    variableFonts: string[];
    marqueesCount: number;
  };
  cssEffects: {
    keyframes: Array<{ name: string; cssText: string }>;
    glassmorphism: boolean;
    clipPaths: string[];
    svgFilters?: Array<{ id: string; hasTurbulence: boolean; hasDisplacement: boolean }>;
  };
}

export interface PipelineResult {
  masterFolder: string;
  siteInfo: SiteInfo;
  dna?: DesignDNA;
  uiUxData?: UIUXFeatures;
}

/**
 * Detecta a tecnologia, framework e comportamento de renderização de um site
 */
export function detectSiteType(url: string, customConfig?: Partial<PipelineOptions>): Promise<SiteInfo>;

/**
 * Executa o pipeline mestre de clonagem, extração de DNA e UI/UX
 */
export function runPipeline(options: PipelineOptions): Promise<PipelineResult>;

/**
 * Extrai animações, GSAP, ScrollTrigger, Lenis, Shaders e micro-interações
 */
export function extractUiUx(targetUrl: string, targetDir?: string | null, customConfig?: Partial<PipelineOptions>): Promise<UIUXFeatures>;

/**
 * Extrai DNA de Design (paleta, tipografia, seções e scripts)
 */
export function extractDesignDna(targetUrl: string, outputFolder?: string | null, customConfig?: Partial<PipelineOptions>): Promise<DesignDNA>;

/**
 * Gera o styleguide visual design-system.html
 */
export function generateStyleguide(dnaOrPath: DesignDNA | string, outputPath?: string | null): string;

/**
 * Gera arquivo de configuração tailwind.config.js
 */
export function generateTailwindConfig(dna: DesignDNA, outputPath?: string | null): string;

/**
 * Inicia o servidor HTTP de preview local para navegar pelas cópias e Studio Dashboard
 */
export function startPreviewServer(options?: { port?: number; outputDir?: string }): any;
