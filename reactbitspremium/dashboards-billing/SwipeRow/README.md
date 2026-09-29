# SwipeRow

> **Category**: Dashboards, Billing & Metrics  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

List row that swipes open to reveal actions, snaps by flick velocity, and deletes on a full swipe that stretches the action colour across the row.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `SwipeRow.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `SwipeRow.jsx` | Versão JavaScript + Tailwind |
| `SwipeRow.css` | Folha de estilos CSS puro auxiliar |
| `SwipeRowDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12 @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3
```

---

## 💡 Como Usar

Veja o arquivo [`SwipeRowDemo.jsx`](./SwipeRowDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import SwipeRow from './SwipeRow';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <SwipeRow />
    </div>
  );
}
```
