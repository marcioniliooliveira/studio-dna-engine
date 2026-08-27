/**
 * Transmutador ICM — Caso 01 • HealthTech PulseMed
 * Converte o esqueleto de alta fidelidade copias/urbi-ae/urbi-ae.html no site da PulseMed.
 * Mantém 100% da física, animações GSAP, ScrollTrigger, Lenis e estrutura DOM intactas.
 */

const fs = require('fs');
const path = require('path');

const srcPath = path.resolve(__dirname, '../copias/urbi-ae/urbi-ae.html');
const destDir = path.resolve(__dirname, '../clientes/caso-01-healthtech/site');
const destPath = path.resolve(destDir, 'index.html');

console.log('🩺 [Transmutador Caso 01] Lendo esqueleto bruto de:', srcPath);

if (!fs.existsSync(srcPath)) {
  console.error('❌ Erro: Esqueleto fonte não encontrado em:', srcPath);
  process.exit(1);
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

let html = fs.readFileSync(srcPath, 'utf8');

// 1. Título do Documento e Metadados
html = html.replace(
  /<title>.*?<\/title>/i,
  '<title>PulseMed HealthTech — Telemedicina de Alta Definição & Agendamento Médico em 3 Etapas</title>'
);

// 2. Logotipo da Navbar (Ícone Médico + PulseMed em Neon Lime #E8FF54)
const logoSvg = `
<div class="urbi-logo-header w-embed" style="color: rgb(232, 255, 84); font-family: Inter, sans-serif; font-weight: 800; font-size: 22px; letter-spacing: -0.5px; display: flex; align-items: center; gap: 8px;">
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
  <span>PulseMed</span>
</div>
`.trim();

html = html.replaceAll(
  /<div class="urbi-logo-header[^"]*w-embed"[^>]*>[\s\S]*?<\/div>/gi,
  logoSvg
);

// 3. Links da Barra de Navegação
html = html.replaceAll('>Products<', '>Corpo Clínico<');
html = html.replaceAll('>Case studies<', '>Os 3 Chunks<');
html = html.replaceAll('>Urbi Atlas<', '>Telemedicina 24h<');
html = html.replaceAll('>Customers<', '>Conformidade LGPD<');
html = html.replaceAll('>Contact us<', '>Agendar Consulta<');
html = html.replaceAll('>Discover features<', '>Conhecer Especialidades<');

// 4. Hero Section — Tag e Título Principal
html = html.replace(
  '<div class="tag-text">Geo-intelligence platform</div>',
  '<div class="tag-text">📍 Telemedicina & Agendamento em 3 Chunks</div>'
);

html = html.replace(
  'Precision Data for',
  'Atendimento Médico em'
);
html = html.replace(
  'Enhanced Navigation',
  'Alta Definição e 3 Etapas'
);

// 5. Floating Metric Cards do Hero (#text-1, #text-2, #text-3)
html = html.replace(
  '<div class="h1 info-txt">5,5M</div><div class="text-18-regular width-90">kilometers length of roads </div>',
  '<div class="h1 info-txt">0.78s</div><div class="text-18-regular width-90">LCP auditado em conexão 4G móvel</div>'
);

html = html.replace(
  '<div class="h1 info-txt">65M</div><div class="text-18-regular">monthly active users<!--$--><br><!--/$--> in 172 633 cities</div>',
  '<div class="h1 info-txt">-48%</div><div class="text-18-regular">redução de abandono<!--$--><br><!--/$--> com a Lei de Miller</div>'
);

html = html.replace(
  '<div class="h1 info-txt">7,8M</div><div class="text-18-regular width-50">companies profiles in&nbsp;19&nbsp;countries</div>',
  '<div class="h1 info-txt">99.4%</div><div class="text-18-regular width-50">índice de acolhimento dos pacientes</div>'
);

// 6. Trusted By / Credenciais Médicas
html = html.replaceAll(
  'TRUSTED BY',
  'CONFORMIDADE &amp; CERTIFICAÇÕES MÉDICAS (CFM • ICP-BRASIL • LGPD • WCAG AAA)'
);

// 7. Intro Text — Manifesto Institucional Clínico
html = html.replaceAll(
  'Urbi empowers <span class="yellow-span">governments, businesses, and</span> <span class="yellow-span">residents</span> with the most accurate and up-to-date spatial data, enabling smarter decisions and efficient solutions for every urban challenge.',
  'A PulseMed conecta <span class="yellow-span">pacientes, especialistas e</span> <span class="yellow-span">famílias</span> com a mais segura plataforma de telemedicina em alta definição, garantindo consultas humanizadas e agendamento instantâneo sem burocracia.'
);

html = html.replaceAll(
  'Urbi empowers <span class="yellow-span">governments,</span> <span class="yellow-span">businesses,</span> <span class="yellow-span">and </span><span class="yellow-span">residents</span> with the most accurate and up-to-date spatial data, enabling smarter decisions and efficient solutions for every urban challenge.',
  'A PulseMed conecta <span class="yellow-span">pacientes, especialistas e</span> <span class="yellow-span">famílias</span> com a mais segura plataforma de telemedicina em alta definição, garantindo consultas humanizadas e agendamento instantâneo sem burocracia.'
);

html = html.replaceAll(
  'Urbi is a cutting-edge geo-platform that integrates all the necessary data, algorithms, and tools to address your challenges in mapping, location data, navigation, and spatial analysis.',
  'Nossa infraestrutura médica integra teleconsulta em tempo real, prescrição digital ICP-Brasil e seleção de horários sem paralisia de escolha (Lei de Miller).'
);

// 8. Seção "How we can help?" — Os 3 Chunks de Miller
html = html.replaceAll(
  'How we can help?',
  'Como cuidamos da sua saúde em 3 etapas?'
);

html = html.replace('Indoor in venues', '01 / Escolha do Especialista');
html = html.replace('APIs and SDKs', '02 / Grade de Horários Zero CLS');
html = html.replace('Collaboration', '03 / Túnel Seguro WhatsApp');
html = html.replace('Algorithms', 'Telemedicina 24h &amp; Pronto Atendimento');
html = html.replace('Quality data', 'Prontuário Criptografado LGPD');
html = html.replace('Data Insights', 'Prescrição Digital ICP-Brasil');

// 9. Seção de Indústrias / Especialidades Médicas
html = html.replaceAll('We Support', 'Corpo Clínico');
html = html.replaceAll('All Industries', 'Especialidades Médicas');
html = html.replace('Logistic &amp; Supply', 'Clínica Geral 24h');
html = html.replace('Government', 'Cardiologia Digital');
html = html.replace('Energy groups', 'Pediatria Integrada');
html = html.replace('Health &amp; Medicine', 'Dermatologia Clínica');
html = html.replace('Businesses', 'Psiquiatria &amp; Saúde Mental');

// 10. Seção de Segurança / On-Premises
html = html.replace(
  'Keep Your Data In-House with Urbi On-Premises',
  'Privacidade Absoluta e Conformidade Estrita CFM &amp; LGPD'
);

// 11. Seção de Contato e Agendamento
html = html.replace(
  'Got a question?',
  'Pronto para iniciar seu atendimento médico?'
);

// 12. Gravar arquivo transmutado
fs.writeFileSync(destPath, html, 'utf8');

console.log('✅ [Transmutador Caso 01] Transmutação concluída com sucesso!');
console.log('📄 Destino gerado:', destPath);
console.log('📊 Tamanho do arquivo:', (fs.statSync(destPath).size / 1024 / 1024).toFixed(2), 'MB');
