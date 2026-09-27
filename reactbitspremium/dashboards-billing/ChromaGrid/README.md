# ChromaGrid

> **Category**: Dashboards, Billing & Metrics  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

A responsive grid of grayscale tiles. Hovering the grid reaveals their colors.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `ChromaGrid.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `ChromaGrid.jsx` | Versão JavaScript + Tailwind |
| `ChromaGrid.css` | Folha de estilos CSS puro auxiliar |
| `ChromaGridDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install gsap@^3.13.0
```

---

## 💡 Como Usar

Veja o arquivo [`ChromaGridDemo.jsx`](./ChromaGridDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import ChromaGrid from './ChromaGrid';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <ChromaGrid />
    </div>
  );
}
```
