# BranchedMenu

> **Category**: Menus de Navegação & Sidebars  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Collapsible menu whose sections unfold into a trunk with a curved branch to each child, and an accent line that travels down the trunk and around the curve to whatever you pick, while a marker glides to the open section.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `BranchedMenu.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `BranchedMenu.jsx` | Versão JavaScript + Tailwind |
| `BranchedMenu.css` | Folha de estilos CSS puro auxiliar |
| `BranchedMenuDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3
```

---

## 💡 Como Usar

Veja o arquivo [`BranchedMenuDemo.jsx`](./BranchedMenuDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import BranchedMenu from './BranchedMenu';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <BranchedMenu />
    </div>
  );
}
```
