# PillNav

> **Category**: Menus de Navegação & Sidebars  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Minimal pill nav with sliding active highlight + smooth easing.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `PillNav.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `PillNav.jsx` | Versão JavaScript + Tailwind |
| `PillNav.css` | Folha de estilos CSS puro auxiliar |
| `PillNavDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install react-router-dom@^6.30.1 gsap@^3.13.0
```

---

## 💡 Como Usar

Veja o arquivo [`PillNavDemo.jsx`](./PillNavDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import PillNav from './PillNav';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <PillNav />
    </div>
  );
}
```
