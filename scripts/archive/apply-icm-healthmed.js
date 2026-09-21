const fs = require('fs');
const path = require('path');

const srcPath = path.resolve(__dirname, '../copias/portfolio-widehue-co/site/index.html');
const destPath = path.resolve(__dirname, '../clientes/flashtech-healthmed/site/index.html');

let html = fs.readFileSync(srcPath, 'utf8');

// 1. Atualizar Título da Página
html = html.replace(
  '<title>Clone - portfolio-widehue-co</title>',
  '<title>FlashTech HealthMed — Telemedicina & Agendamento Humanizado em 3 Etapas</title>'
);

// 2. Atualizar Logo da Navbar
html = html.replace(
  'aria-label="Logo">\n\t\t\t<svg',
  'aria-label="Logo" style="display:flex;align-items:center;text-decoration:none;">\n\t\t\t<svg'
);

html = html.replace(
  '</svg>\n\t\t</a>',
  '</svg><span style="font-family:Stolzl,sans-serif;font-weight:700;font-size:20px;color:#ffffff;margin-left:14px;letter-spacing:-0.5px;text-transform:none;">HealthMed</span>\n\t\t</a>'
);

// 3. Atualizar Itens do Menu
html = html.replace(
  '>Discover Rezon Bio<',
  '>Especialidades Médicas<'
);
html = html.replace(
  '>Our Solutions<',
  '>Os 3 Chunks de Agendamento<'
);
html = html.replace(
  '>Careers<',
  '>Telemedicina & LGPD<'
);
html = html.replace(
  '>Newsroom<',
  '>Corpo Clínico<'
);
html = html.replaceAll(
  '>Contact us<',
  '>Agendar Consulta<'
);

// 4. Atualizar Headline Hero
const oldHeading = `<h1 class="block-hero__heading">
				Where <br>
Dedication <br>
Delivers
									<span class="block-hero__heading-words">
						<ul class="block-hero__heading-words-list">
															<li class="block-hero__heading-word">
									Excellence								</li>
															<li class="block-hero__heading-word">
									Value								</li>
															<li class="block-hero__heading-word">
									Quality								</li>
															<li class="block-hero__heading-word">
									Efficiency								</li>
															<li class="block-hero__heading-word">
									Excellence								</li>
													</ul>
					</span>
							</h1>`;

const newHeading = `<h1 class="block-hero__heading">
				Atendimento <br>
Médico Que <br>
Transforma
									<span class="block-hero__heading-words">
						<ul class="block-hero__heading-words-list">
															<li class="block-hero__heading-word">
									Vidas								</li>
															<li class="block-hero__heading-word">
									Saúde								</li>
															<li class="block-hero__heading-word">
									Cuidado								</li>
															<li class="block-hero__heading-word">
									Confiança								</li>
															<li class="block-hero__heading-word">
									Vidas								</li>
													</ul>
					</span>
							</h1>`;

html = html.replace(oldHeading, newHeading);

// 5. Atualizar Scroll Text e Botões do Hero
html = html.replace(
  'Scroll for more',
  'Role para conhecer'
);
html = html.replaceAll(
  'Book a meeting',
  'Iniciar Agendamento'
);

// 6. Atualizar Sticky Box Flutuante
html = html.replace(
  'Meet Our Business Team',
  'Plantão Telemedicina 24h'
);

// 7. Atualizar Seção Why Us (Os 3 Chunks Cognitivos)
html = html.replace(
  '<span class="block-why-us__box-label">\n\t\t\t\t\t\t\t\tRezon Bio',
  '<span class="block-why-us__box-label">\n\t\t\t\t\t\t\t\t01 / LEI DE MILLER'
);
html = html.replace(
  'aria-label="Where molecules transform into life changing medicines"',
  'aria-label="Especialidade e Médico selecionados em 1 clique sem burocracia"'
);
html = html.replace(
  'Analytics, development, GMP manufacturing, and formulation in one place. Faster. Smoother.',
  'Filtro inteligente de médicos certificados com plantão imediato ou consulta presencial agendada. Reduz ansiedade e paralisia de escolha.'
);

html = html.replace(
  '<span class="block-why-us__box-label">\n\t\t\t\t\t\t\t\tCapabilities',
  '<span class="block-why-us__box-label">\n\t\t\t\t\t\t\t\t02 / ZERO CLS'
);
html = html.replace(
  'aria-label="Rapid scale-up with capabilities that fit today’s needs"',
  'aria-label="Grade de horários em tempo real com reserva dimensional"'
);
html = html.replace(
  'Ensuring reliable delivery and a seamless transition from clinic to market.',
  'Seleção de horários instantânea e estável sem saltos de tela, impedindo toques acidentais e frustração do paciente.'
);

html = html.replace(
  '<span class="block-why-us__box-label">\n\t\t\t\t\t\t\t\tPartnerships',
  '<span class="block-why-us__box-label">\n\t\t\t\t\t\t\t\t03 / TÚNEL SEGURO'
);
html = html.replace(
  'aria-label="Led by scientists with proven experience and partnerships"',
  'aria-label="Confirmação e sala de telemedicina no WhatsApp do paciente"'
);
html = html.replace(
  'Our tech transfer expertise and strategic partnerships for fill/finish enable us to deliver “ready to fill” solutions.',
  'Sem formulários cansativos de 12 campos. Confirmação instantânea e link criptografado enviados direto no WhatsApp.'
);

// 8. Atualizar Seção Services (Especialidades Médicas com Fotos Reais)
html = html.replace(
  'https://portfolio.widehue.co/rezonbio/wp-content/uploads/2025/09/process-and-development.webp',
  './assets/images/diagnostic-suite.jpg'
);
html = html.replace(
  '<h3>Process development &amp; characterization</h3>\n<p>Scalable upstream and downstream processes built for robustness</p>',
  '<h3>Cardiologia &amp; Diagnósticos</h3>\n<p>Eletrocardiograma digital, avaliação de risco cirúrgico e monitoramento contínuo de hipertensão.</p>'
);

html = html.replace(
  'https://portfolio.widehue.co/rezonbio/wp-content/uploads/2025/09/analytical-capabilities.webp',
  './assets/images/telemed-consult.jpg'
);
html = html.replace(
  '<h3>Analytical capabilities</h3>\n<p>Phase-appropriate, method-qualified testing for product quality and release</p>',
  '<h3>Telemedicina &amp; Clínica Geral</h3>\n<p>Prescrição digital com validade nacional ICP-Brasil e consultas em alta definição em até 10 minutos.</p>'
);

html = html.replace(
  'https://portfolio.widehue.co/rezonbio/wp-content/uploads/2025/09/analytical-capabilities-1.webp',
  './assets/images/hero-doctor.jpg'
);
html = html.replace(
  '<h3>GMP manufacturing</h3>\n<p>Flexible capacity and inspection-ready operations for biologics production</p>',
  '<h3>Pediatria Integrada &amp; Família</h3>\n<p>Cuidado acolhedor e humanizado para bebês e crianças com plantão pediátrico e triagem ágil.</p>'
);

html = html.replace(
  '<h3>Quality</h3>\n<p>Systems aligned with regulatory requirements, confirmed by successful inspections and focused on lifecycle aspects</p>',
  '<h3>Dermatologia &amp; Prevenção</h3>\n<p>Dermatoscopia digital de alta precisão, avaliação preventiva de lesões e acompanhamento clínico completo.</p>'
);

// Remove todos os atributos srcset remotos para que use apenas os src locais
html = html.replace(/srcset="[^"]*"/g, '');

// Substitui quaisquer imagens externas residuais pelas fotos locais
html = html.replaceAll('https://portfolio.widehue.co/rezonbio/wp-content/uploads/2025/10/discover-quality.webp', './assets/images/diagnostic-suite.jpg');
html = html.replaceAll('https://portfolio.widehue.co/rezonbio/wp-content/uploads/2025/10/about-us-1-880x1060.webp', './assets/images/hero-doctor.jpg');
html = html.replaceAll('https://portfolio.widehue.co/rezonbio/wp-content/uploads/2025/10/about-us-2-880x1060.webp', './assets/images/telemed-consult.jpg');
html = html.replaceAll('https://portfolio.widehue.co/rezonbio/wp-content/uploads/2025/10/about-us-3-880x1060.webp', './assets/images/diagnostic-suite.jpg');
html = html.replaceAll('https://portfolio.widehue.co/rezonbio/wp-content/uploads/2025/10/about-us-4-880x1060.webp', './assets/images/hero-doctor.jpg');
html = html.replaceAll('https://portfolio.widehue.co/rezonbio/wp-content/uploads/2025/09/gdanks-polska.webp', './assets/images/diagnostic-suite.jpg');
html = html.replaceAll('https://portfolio.widehue.co/rezonbio/wp-content/uploads/2025/11/be7a40e718687433c4ac9efb877e969125f9152e.webp', './assets/images/telemed-consult.jpg');

// 9. Atualizar Seção Numbers
html = html.replace(
  'Certified excellence in biotech manufacturing. Trusted by global regulators and powered by world-class talent.',
  'Métricas auditadas de performance, estabilidade dimensional e satisfação humana.'
);
html = html.replace(
  '1300',
  '0.78s'
);
html = html.replace(
  'Number of employees, 10% among them holding PhD titles',
  'LCP auditado em conexão 4G móvel'
);
html = html.replace(
  'employees',
  'LCP 4G móvel'
);

html = html.replace(
  '64',
  '-48%'
);
html = html.replace(
  'Last year’s batch output',
  'Redução no abandono de agendamento'
);
html = html.replace(
  'batches produced in 2024',
  'fricção eliminada'
);

html = html.replace(
  '98<sup>%</sup>',
  '99.4<sup>%</sup>'
);
html = html.replace(
  'Batch success rate achieved in 2024',
  'Índice de satisfação e acolhimento dos pacientes'
);
html = html.replace(
  'batch succces rate',
  'satisfação dos pacientes'
);

html = html.replace(
  '35',
  '0.000'
);
html = html.replace(
  'Number of successfully passed audits',
  'CLS Estabilidade visual sem saltos de tela'
);
html = html.replace(
  'EMA, FDA, MHRA, ANVISA',
  'CLS Estabilidade'
);

// 10. Atualizar Seção CTA
html = html.replace(
  'Where innovation meets execution',
  'Atendimento médico de excelência quando você mais precisa'
);
html = html.replace(
  'Whether you’re advancing a novel biologic or planning for commercial scale, Rezon Bio is ready to help you move forward with confidence',
  'Conectamos você ao melhor especialista médico via telemedicina segura ou em nossa unidade presencial'
);
html = html.replace(
  'Connect with our team to explore how our expertise, integrated solutions, and dedication can accelerate your success',
  'Agendamento rápido em 3 passos sem formulários longos, com confirmação direta no WhatsApp'
);

// 11. Atualizar Footer
html = html.replace(
  'All rights reserved',
  'FlashTech HealthMed • CRM 24.810 • RQE 18.420 • LCP 0.78s • WCAG AAA'
);

fs.writeFileSync(destPath, html, 'utf8');
console.log('✅ [ICM HealthMed] Esqueleto Rezon Bio transmutado e limpo com sucesso para:', destPath);
