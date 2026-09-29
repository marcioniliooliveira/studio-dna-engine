# FlipCard

> **Category**: Cards Sofisticados & Elegantes  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Two-faced card that flips in 3D on a click, a drag or a flick, settling on a spring that carries your release velocity, with an optional cursor tilt, a sheen that follows the pointer and a shadow that narrows as it turns edge on.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `FlipCard.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `FlipCard.jsx` | Versão JavaScript + Tailwind |
| `FlipCard.css` | Folha de estilos CSS puro auxiliar |
| `FlipCardDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12
```

---

## 💡 Como Usar

Veja o arquivo [`FlipCardDemo.jsx`](./FlipCardDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import FlipCard from './FlipCard';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <FlipCard />
    </div>
  );
}
```
