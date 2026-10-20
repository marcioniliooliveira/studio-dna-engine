# MagicBento

> **Category**: Cards Sofisticados & Elegantes  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Interactive bento grid tiles expand + animate with various options.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `MagicBento.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `MagicBento.jsx` | Versão JavaScript + Tailwind |
| `MagicBento.css` | Folha de estilos CSS puro auxiliar |
| `MagicBentoDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install gsap@^3.13.0
```

---

## 💡 Como Usar

Veja o arquivo [`MagicBentoDemo.jsx`](./MagicBentoDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import MagicBento from './MagicBento';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <MagicBento />
    </div>
  );
}
```
