# LatticeLoader

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Inline agent-status row: a 3x3 or 4x4 lattice whose cells brighten in a phase-offset wave beside a verb and a live stopwatch, resolving into a check or a cross when the task ends.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `LatticeLoader.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `LatticeLoader.jsx` | Versão JavaScript + Tailwind |
| `LatticeLoader.css` | Folha de estilos CSS puro auxiliar |
| `LatticeLoaderDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

---

## 💡 Como Usar

Veja o arquivo [`LatticeLoaderDemo.jsx`](./LatticeLoaderDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import LatticeLoader from './LatticeLoader';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <LatticeLoader />
    </div>
  );
}
```
