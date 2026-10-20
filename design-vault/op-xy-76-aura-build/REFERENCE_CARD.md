# REFERENCE CARD: OP-XY 76 (Teenage Engineering Hardware Showcase)

> **Status:** Candidate (Verified 100% Extraction)  
> **Source:** `https://op-xy-76.aura.build/`  
> **Provenance:** `copias/op-xy-76-aura-build`  
> **Archetype:** Hardware Product Showcase / 3D Scroll Storytelling / Industrial Dark Minimal  
> **Stack:** Vanilla HTML5/ESM, Three.js r186, Draco WebAssembly, GSAP ScrollTrigger, Lenis Smooth Scroll, Web Audio API  

---

## 1. Visão Geral & Diferenciais Mecânicos
O site do OP–XY é uma obra-prima de engenharia frontend e 3D interativo na web:
- **Zero Imagens na Experiência Primária:** Todo o hardware é renderizado em tempo real via Three.js r186 no canvas `#cv` com iluminação volumétrica dinâmica.
- **Modelo 3D Parametrizado:** Arquivo `opxy.glb` (3.73 MB, glTF 2.0 binário com Draco) com 78 nós e 73 nós de controle dinâmico (68 teclas mecânicas individuais + 4 encoders rotativos + 1 botão de volume).
- **Física de Teclas com Mola:** Cada tecla pressionada simula amortecimento e overshoot mecânico real:
  `click = s < 0.5 ? -0.32 * Math.exp(-7 * s) * Math.sin(s * 22) : 0;`
- **Film Assembly Initial Reveal:** No carregamento, cada componente (tecla, encoder, chassi) voa do espaço 3D em rotação e arco sinusoidal até se encaixar perfeitamente no corpo de alumínio.
- **Shader de Névoa e Feixe de Luz:** Shader GLSL de fundo com ruído FBM (Fractal Brownian Motion) simulando fumaça de estúdio escuro, cortada por um feixe de luz volumétrico que gira acompanhando a câmera.
- **Áudio Sintetizado 100% Procedural:** Motor Web Audio API com 8 tipos de sintetizadores (FM, Wavetable, HardSync, etc.), 4 baterias e reverb convolver estéreo sem uso de arquivos de áudio externos.
- **Sequenciador de 16 Passos:** Grid interativo de 16×4 passos com osciloscópio de onda senoidal ao vivo (`#scope`).

---

## 2. Paleta & Design Tokens
```css
:root {
  --bg: #0c0d0e;
  --surface: #141517;
  --surface-raised: #1c1d20;
  --border: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.18);
  --fg: #e2e4e8;
  --fg-dim: #8b8f97;
  --fg-muted: #52565e;
  --rec: #ff3a2f;          /* Accent tonal único: Vermelho gravação */
  --rec-dim: rgba(255, 58, 47, 0.18);
  --status-lens: #00ffaa;
}
```

---

## 3. Estrutura de Seções (28 Blocos / 22.356px Scroll)
1. **#hero:** Apresentação monumental com título fluido `--s7` e chegada do 3D.
2. **#strip:** "sample. sequence. synthesize. perform." com revelação de palavras.
3. **#macro:** Foco nas 68 teclas mecânicas e usinagem fosca.
4. **#engines:** Exposição horizontal dos 8 motores sonoros.
5. **#scope-sec:** Osciloscópio e VU meters ativos.
6. **#seq:** Sequenciador de 16 passos com playhead interativo.
7. **#connect:** Vista lateral dos conectores I/O com callouts clicáveis.
8. **#flip:** Rotação de 180° revelando o verso com especificações a laser.
9. **#close:** CTA de pré-venda ($2,299) e links de navegação.

---

## 4. Requisitos para Transmutação
Para clonar ou transmutar este padrão para um cliente do Studio DNA Engine:
1. **Substituição da Malha 3D:**
   - Para produtos físicos (fones de ouvido, sintetizadores, periféricos, joias, relógios, garrafas): fornecer modelo `.glb` otimizado (sob Draco) e mapear nós clicáveis.
   - Para serviços / SaaS / software: desativar o Three.js e ativar o slot de fallback fotográfico/vídeo macro já catalogado em `assets/images/`.
2. **Accent Unificado:** Manter o princípio de 1 único ponto de cor vibrante (ex: `--rec`), mantendo todo o resto em cinzas cirúrgicos.
3. **Copywriting em Minúsculas:** Manter a voz ultra-minimalista técnica (lowercase sem floreios).
