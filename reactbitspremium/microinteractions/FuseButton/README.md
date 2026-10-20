# FuseButton

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Action button whose done state carries its own undo on a burning fuse: press, the label crossfades to Undo, a hairline burns for the undo window, and Undo or Escape runs it back.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `FuseButton.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `FuseButton.jsx` | Versão JavaScript + Tailwind |
| `FuseButton.css` | Folha de estilos CSS puro auxiliar |
| `FuseButtonDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3
```

---

## 💡 Como Usar

Veja o arquivo [`FuseButtonDemo.jsx`](./FuseButtonDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import FuseButton from './FuseButton';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <FuseButton />
    </div>
  );
}
```
