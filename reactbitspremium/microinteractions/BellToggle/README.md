# BellToggle

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Pill toggle that answers a press at three tempos: the bell rings on damped keyframes, the label blur-crossfades, and the pill unfurls to the longer label through a clip-path on a critically damped spring. The pressed state is the receipt.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `BellToggle.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `BellToggle.jsx` | Versão JavaScript + Tailwind |
| `BellToggle.css` | Folha de estilos CSS puro auxiliar |
| `BellToggleDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12 @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3
```

---

## 💡 Como Usar

Veja o arquivo [`BellToggleDemo.jsx`](./BellToggleDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import BellToggle from './BellToggle';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <BellToggle />
    </div>
  );
}
```
