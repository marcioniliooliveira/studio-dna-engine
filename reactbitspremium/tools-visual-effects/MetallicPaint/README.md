# MetallicPaint

> **Category**: Tools 3D & Efeitos Visuais Statement  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Liquid metallic paint shader which can be applied to SVG elements.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `MetallicPaint.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `MetallicPaint.jsx` | Versão JavaScript + Tailwind |
| `MetallicPaint.css` | Folha de estilos CSS puro auxiliar |
| `MetallicPaintDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

---

## 💡 Como Usar

Veja o arquivo [`MetallicPaintDemo.jsx`](./MetallicPaintDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import MetallicPaint from './MetallicPaint';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <MetallicPaint />
    </div>
  );
}
```
