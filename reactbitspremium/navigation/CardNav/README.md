# CardNav

> **Category**: Menus de Navegação & Sidebars  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Expandable navigation bar with card panels revealing nested links.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `CardNav.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `CardNav.jsx` | Versão JavaScript + Tailwind |
| `CardNav.css` | Folha de estilos CSS puro auxiliar |
| `CardNavDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install gsap@^3.13.0 react-icons@^5.5.0
```

---

## 💡 Como Usar

Veja o arquivo [`CardNavDemo.jsx`](./CardNavDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import CardNav from './CardNav';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <CardNav />
    </div>
  );
}
```
