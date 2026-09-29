# VoicePill

> **Category**: Chat AI & AI Agent Interfaces  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Mic button that swells into a tinted capsule of level-driven equalizer bars and an elapsed clock while held or toggled, then relaxes back into the mic on release; simulated voice by default, real microphone as an opt-in.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `VoicePill.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `VoicePill.jsx` | Versão JavaScript + Tailwind |
| `VoicePill.css` | Folha de estilos CSS puro auxiliar |
| `VoicePillDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3
```

---

## 💡 Como Usar

Veja o arquivo [`VoicePillDemo.jsx`](./VoicePillDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import VoicePill from './VoicePill';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <VoicePill />
    </div>
  );
}
```
