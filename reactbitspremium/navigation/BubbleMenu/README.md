# BubbleMenu

> **Category**: Menus de Navegação & Sidebars  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Floating circular expanding menu with staggered item reveal.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `BubbleMenu.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `BubbleMenu.jsx` | Versão JavaScript + Tailwind |
| `BubbleMenu.css` | Folha de estilos CSS puro auxiliar |
| `BubbleMenuDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install gsap@^3.13.0
```

---

## 💡 Como Usar

Veja o arquivo [`BubbleMenuDemo.jsx`](./BubbleMenuDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import BubbleMenu from './BubbleMenu';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <BubbleMenu />
    </div>
  );
}
```
