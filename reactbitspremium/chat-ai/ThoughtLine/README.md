# ThoughtLine

> **Category**: Chat AI & AI Agent Interfaces  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Reasoning-trace header: a glyph and a label breathe beside a live clock while steps appear beneath, then the line settles on one beat into "Thought for 4.2s" through a blur crossfade and the trace folds into it.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `ThoughtLine.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `ThoughtLine.jsx` | Versão JavaScript + Tailwind |
| `ThoughtLine.css` | Folha de estilos CSS puro auxiliar |
| `ThoughtLineDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12 @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3
```

---

## 💡 Como Usar

Veja o arquivo [`ThoughtLineDemo.jsx`](./ThoughtLineDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import ThoughtLine from './ThoughtLine';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <ThoughtLine />
    </div>
  );
}
```
