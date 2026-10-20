# ElectricBorder

> **Category**: Tools 3D & Efeitos Visuais Statement  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Jittery electric energy border with animated arcs, glow and adjustable intensity.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `ElectricBorder.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `ElectricBorder.jsx` | Versão JavaScript + Tailwind |
| `ElectricBorder.css` | Folha de estilos CSS puro auxiliar |
| `ElectricBorderDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

---

## 💡 Como Usar

Veja o arquivo [`ElectricBorderDemo.jsx`](./ElectricBorderDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import ElectricBorder from './ElectricBorder';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <ElectricBorder />
    </div>
  );
}
```
