# DecayCard

> **Category**: Cards Sofisticados & Elegantes  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Hover parallax effect that disintegrates the content of a card.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `DecayCard.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `DecayCard.jsx` | Versão JavaScript + Tailwind |
| `DecayCard.css` | Folha de estilos CSS puro auxiliar |
| `DecayCardDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install gsap@^3.13.0
```

---

## 💡 Como Usar

Veja o arquivo [`DecayCardDemo.jsx`](./DecayCardDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import DecayCard from './DecayCard';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <DecayCard />
    </div>
  );
}
```
