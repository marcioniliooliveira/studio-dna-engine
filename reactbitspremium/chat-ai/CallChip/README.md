# CallChip

> **Category**: Chat AI & AI Agent Interfaces  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Inline tool-call chip whose fill wipes across while a live ms counter ticks, completing with a green wash on success or stopping short and shaking red with a retry glyph on error.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `CallChip.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `CallChip.jsx` | Versão JavaScript + Tailwind |
| `CallChip.css` | Folha de estilos CSS puro auxiliar |
| `CallChipDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3
```

---

## 💡 Como Usar

Veja o arquivo [`CallChipDemo.jsx`](./CallChipDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import CallChip from './CallChip';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <CallChip />
    </div>
  );
}
```
