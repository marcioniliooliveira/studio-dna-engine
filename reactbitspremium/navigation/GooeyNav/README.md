# GooeyNav

> **Category**: Menus de Navegação & Sidebars  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Navigation indicator morphs with gooey blob transitions between items.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `GooeyNav.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `GooeyNav.jsx` | Versão JavaScript + Tailwind |
| `GooeyNav.css` | Folha de estilos CSS puro auxiliar |
| `GooeyNavDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

---

## 💡 Como Usar

Veja o arquivo [`GooeyNavDemo.jsx`](./GooeyNavDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import GooeyNav from './GooeyNav';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <GooeyNav />
    </div>
  );
}
```
