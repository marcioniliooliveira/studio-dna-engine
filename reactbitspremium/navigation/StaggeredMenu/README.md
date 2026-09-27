# StaggeredMenu

> **Category**: Menus de Navegação & Sidebars  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Menu with staggered item animations and smooth transitions on open/close.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `StaggeredMenu.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `StaggeredMenu.jsx` | Versão JavaScript + Tailwind |
| `StaggeredMenu.css` | Folha de estilos CSS puro auxiliar |
| `StaggeredMenuDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install gsap@^3.13.0
```

---

## 💡 Como Usar

Veja o arquivo [`StaggeredMenuDemo.jsx`](./StaggeredMenuDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import StaggeredMenu from './StaggeredMenu';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <StaggeredMenu />
    </div>
  );
}
```
