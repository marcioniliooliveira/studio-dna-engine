# RefineFrame

> **Category**: Chat AI & AI Agent Interfaces  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Reserved-aspect frame that walks any media through queued, generating, refining and complete without layout shift: each stage is one blur, saturate, scale and opacity tween, a soft band sweeps while it works, a chip reports the stage, and an error dims the picture behind a retry pill.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `RefineFrame.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `RefineFrame.jsx` | Versão JavaScript + Tailwind |
| `RefineFrame.css` | Folha de estilos CSS puro auxiliar |
| `RefineFrameDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3
```

---

## 💡 Como Usar

Veja o arquivo [`RefineFrameDemo.jsx`](./RefineFrameDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import RefineFrame from './RefineFrame';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <RefineFrame />
    </div>
  );
}
```
