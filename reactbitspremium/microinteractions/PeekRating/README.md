# PeekRating

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Star rating you can try before you commit: sweeping the row lifts a trailing wave of stars up to the pointer while a tip hops along with the label; a click commits with a pop.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `PeekRating.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `PeekRating.jsx` | Versão JavaScript + Tailwind |
| `PeekRating.css` | Folha de estilos CSS puro auxiliar |
| `PeekRatingDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3
```

---

## 💡 Como Usar

Veja o arquivo [`PeekRatingDemo.jsx`](./PeekRatingDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import PeekRating from './PeekRating';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <PeekRating />
    </div>
  );
}
```
