# HoldButton

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Hold-to-confirm button whose liquid fill rises while pressed, snaps back on an early release and swaps its label through a blur when the hold completes.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `HoldButton.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `HoldButton.jsx` | Versão JavaScript + Tailwind |
| `HoldButton.css` | Folha de estilos CSS puro auxiliar |
| `HoldButtonDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

---

## 💡 Como Usar

Veja o arquivo [`HoldButtonDemo.jsx`](./HoldButtonDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import HoldButton from './HoldButton';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <HoldButton />
    </div>
  );
}
```
