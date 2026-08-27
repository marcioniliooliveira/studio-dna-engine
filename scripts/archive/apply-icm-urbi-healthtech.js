const fs = require('fs');
const path = require('path');

const srcPath = path.resolve(__dirname, '../copias/urbi-ae/urbi-ae.html');
const destPath = path.resolve(__dirname, '../clientes/caso-01-healthtech/site/index.html');

console.log('🔄 [ICM Urbi -> HealthTech] Lendo esqueleto fiel de:', srcPath);
let html = fs.readFileSync(srcPath, 'utf8');

// 1. Título e Metadados
html = html.replace(
  '<title>Clone - urbi-ae</title>',
  '<title>PulseMed HealthTech — Telemedicina de Alta Definição &amp; Agendamento em 3 Etapas</title>'
);

// 2. Logo da Navbar
html = html.replaceAll(
  /<div class="urbi-logo-header[^"]*w-embed"[^>]*>[\s\S]*?<\/div>/gi,
  '<div class="urbi-logo-header w-embed" style="color: rgb(232, 255, 84); font-family: Inter, sans-serif; font-weight: 800; font-size: 20px; letter-spacing: -0.5px; display: flex; align-items: center; gap: 8px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg><span>PulseMed</span></div>'
);

// 3. Links de Navegação
html = html.replaceAll('>Products<', '>Especialidades<');
html = html.replaceAll('>Case studies<', '>Os 3 Chunks<');
html = html.replaceAll('>Urbi Atlas<', '>Telemedicina 24h<');
html = html.replaceAll('>Customers<', '>Conformidade LGPD<');
html = html.replaceAll('>Contact us<', '>Agendar Consulta<');
html = html.replaceAll('>Discover features<', '>Conhecer Corpo Clínico<');

// 4. Hero Tag e Headline
html = html.replace(
  '<div class="tag-text">Geo-intelligence platform</div>',
  '<div class="tag-text">📍 Telemedicina &amp; Agendamento em 3 Chunks</div>'
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

// 7. Intro Text (Apresentação Institucional Médica)
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

// 8. Seção "How we can help?"
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

// 9. Seção de Indústrias / Especialidades
html = html.replaceAll('We Support', 'Corpo Clínico');
html = html.replaceAll('All Industries', 'Especialidades Médicas');
html = html.replace('Logistic &amp; Supply', 'Clínica Geral 24h');
html = html.replace('Government', 'Cardiologia Digital');
html = html.replace('Energy groups', 'Pediatria Integrada');
html = html.replace('Health &amp; Medicine', 'Dermatologia Clínica');
html = html.replace('Businesses', 'Psiquiatria &amp; Saúde Mental');

// 10. Seção de Segurança / Privacidade On-Premises
html = html.replace(
  'Keep Your Data In-House with Urbi On-Premises',
  'Privacidade Absoluta e Conformidade Estrita CFM &amp; LGPD'
);

// 11. Seção de Contato e CTA
html = html.replace(
  'Got a question?',
  'Pronto para iniciar seu atendimento médico?'
);

// 12. Salvar arquivo
fs.writeFileSync(destPath, html, 'utf8');
console.log('✅ [ICM Urbi -> HealthTech] Esqueleto de 10MB transmutado com sucesso para:', destPath);
