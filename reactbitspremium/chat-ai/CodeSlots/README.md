# CodeSlots

> **Category**: Chat AI & AI Agent Interfaces  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

One-time-code input where a hidden overlay input owns focus, paste and SMS autofill while each slot lands its digit on one spring: the fill swells from the centre, the digit rises and the caret glides; a wrong code drains the slots in a cascade, a right one merges them into a single accent wash.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `CodeSlots.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `CodeSlots.jsx` | Versão JavaScript + Tailwind |
| `CodeSlots.css` | Folha de estilos CSS puro auxiliar |
| `CodeSlotsDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12 @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3
```

---

## 💡 Como Usar

Veja o arquivo [`CodeSlotsDemo.jsx`](./CodeSlotsDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import CodeSlots from './CodeSlots';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <CodeSlots />
    </div>
  );
}
```
