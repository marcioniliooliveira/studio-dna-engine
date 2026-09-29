# LineSidebar

> **Category**: Menus de Navegação & Sidebars  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Static list navigation with a cursor-proximity effect that shifts and highlights nearby items.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `LineSidebar.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `LineSidebar.jsx` | Versão JavaScript + Tailwind |
| `LineSidebar.css` | Folha de estilos CSS puro auxiliar |
| `LineSidebarDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

---

## 💡 Como Usar

Veja o arquivo [`LineSidebarDemo.jsx`](./LineSidebarDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import LineSidebar from './LineSidebar';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <LineSidebar />
    </div>
  );
}
```
