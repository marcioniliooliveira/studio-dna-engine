# SwipeToast

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Single toast that rises through its bottom edge, swipes down to dismiss on a flick or a distance, and burns a thin fuse for exactly its remaining time; hover pauses it and an inline mode keeps it inside any container.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `SwipeToast.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `SwipeToast.jsx` | Versão JavaScript + Tailwind |
| `SwipeToast.css` | Folha de estilos CSS puro auxiliar |
| `SwipeToastDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12 @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3
```

---

## 💡 Como Usar

Veja o arquivo [`SwipeToastDemo.jsx`](./SwipeToastDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import SwipeToast from './SwipeToast';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <SwipeToast />
    </div>
  );
}
```
