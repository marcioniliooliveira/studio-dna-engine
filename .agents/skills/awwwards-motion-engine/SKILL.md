---
name: awwwards-motion-engine
description: Padrões matemáticos de física de movimento, curvas de easing cinematográficas, scroll inercial (Lenis), unmasking de SplitText e carrosséis 3D para criação de sites nível Awwwards.
---

# Awwwards Motion Engine — Guia & Princípios de Física de Movimento

Este documento rege a criação, engenharia reversa e orquestração de animações de elite sem degradar a performance (60 FPS contínuos e LCP sub-segundo).

---

## 🎯 1. As 5 Curvas de Easing Cinematográficas Canônicas

NUNCA use `transition: all 0.3s ease` genérico. Use a matriz de curvas de desaceleração calculada:

```css
:root {
  /* 1. Snappy Cinematic (Ideal para Hovers, Menus e Badges) */
  --ease-snappy: cubic-bezier(0.16, 1, 0.3, 1);

  /* 2. Monumental Smooth (Ideal para Cortinas de Revelação e Hero Entries) */
  --ease-smooth: cubic-bezier(0.25, 1, 0.5, 1);

  /* 3. Dramatic Incline (Ideal para Saídas Rápidas e Deslocamento Inercial) */
  --ease-dramatic: cubic-bezier(0.7, 0, 0.3, 1);

  /* 4. Elastic Magnetic (Micro-interações de Botão e Ícones) */
  --ease-elastic: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* 5. Linear Pure (Apenas para barras de progresso temporizadas) */
  --ease-linear: linear;
}
```

---

## 📜 2. Protocolo de Unmasking de SplitText (Sem Falha de SSR)

Em sites que dividem linhas tipográficas com máscaras de corte:
- O container pai deve possuir `.appear-line-mask { overflow: clip; }`.
- O elemento de texto `.appear-line` deve iniciar em `transform: translateY(105%)` e `opacity: 0`.
- Ao entrar no viewport (via `IntersectionObserver` ou `ScrollTrigger`), animar para `translateY(0)` e `opacity: 1` com duração de `0.9s` e `--ease-snappy`.

---

## 🎡 3. Projeção Cilíndrica 3D Paramétrica

Para criar carrosséis em anel 3D como o do Storey:
- **Container Pai:** `perspective: 130vw; transform-style: preserve-3d;`
- **Ângulo por Item:** $\theta = \frac{360^\circ}{N}$ (para 8 itens = $45^\circ$).
- **Raio do Anel ($R$):** $R \approx 44\text{vw}$ para desktop.
- **Transformação de Cada Card:** `transform: rotateY(i * 45deg) translateZ(44vw);`
- **Rotação Scroll-Driven:** Vincular `scrollY * 0.1` à rotação do anel para criar profundidade dinâmica.

---

## ⚡ 4. Regras Rígidas de Performance 60 FPS
1. **Apenas 2 Propriedades Animáveis:** Anime estritamente `transform` e `opacity`. Nunca anime `width`, `height`, `margin`, `top` ou `left` durante o scroll.
2. **GPU Promotion:** Aplique `will-change: transform, opacity;` apenas nos elementos com orquestração contínua.
3. **Passive Listeners:** Todos os listeners de scroll e touch devem usar `{ passive: true }`.
