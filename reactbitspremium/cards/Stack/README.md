# Stack

> **Category**: Cards Sofisticados & Elegantes  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Layered stack with swipe animations, autoplay and smooth transitions.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `Stack.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `Stack.jsx` | Versão JavaScript + Tailwind |
| `Stack.css` | Folha de estilos CSS puro auxiliar |
| `StackDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12
```

---

## 💡 Como Usar

Veja o arquivo [`StackDemo.jsx`](./StackDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import Stack from './Stack';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <Stack />
    </div>
  );
}
```
