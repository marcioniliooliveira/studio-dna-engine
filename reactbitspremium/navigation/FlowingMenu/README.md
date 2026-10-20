# FlowingMenu

> **Category**: Menus de Navegação & Sidebars  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Liquid flowing active indicator glides between menu items.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `FlowingMenu.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `FlowingMenu.jsx` | Versão JavaScript + Tailwind |
| `FlowingMenu.css` | Folha de estilos CSS puro auxiliar |
| `FlowingMenuDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install gsap@^3.13.0
```

---

## 💡 Como Usar

Veja o arquivo [`FlowingMenuDemo.jsx`](./FlowingMenuDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import FlowingMenu from './FlowingMenu';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <FlowingMenu />
    </div>
  );
}
```
