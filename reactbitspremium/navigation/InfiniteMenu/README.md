# InfiniteMenu

> **Category**: Menus de Navegação & Sidebars  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Horizontally looping menu effect that scrolls endlessly with seamless wrap.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `InfiniteMenu.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `InfiniteMenu.jsx` | Versão JavaScript + Tailwind |
| `InfiniteMenu.css` | Folha de estilos CSS puro auxiliar |
| `InfiniteMenuDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install gl-matrix@^3.4.3
```

---

## 💡 Como Usar

Veja o arquivo [`InfiniteMenuDemo.jsx`](./InfiniteMenuDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import InfiniteMenu from './InfiniteMenu';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <InfiniteMenu />
    </div>
  );
}
```
