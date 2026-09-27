# ScrollStack

> **Category**: Cards Sofisticados & Elegantes  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Overlapping card stack reveals on scroll with depth layering.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `ScrollStack.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `ScrollStack.jsx` | Versão JavaScript + Tailwind |
| `ScrollStack.css` | Folha de estilos CSS puro auxiliar |
| `ScrollStackDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install lenis@^1.3.13
```

---

## 💡 Como Usar

Veja o arquivo [`ScrollStackDemo.jsx`](./ScrollStackDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import ScrollStack from './ScrollStack';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <ScrollStack />
    </div>
  );
}
```
