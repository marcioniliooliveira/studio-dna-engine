# Dock

> **Category**: Menus de Navegação & Sidebars  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

macOS style magnifying dock with proximity scaling of icons.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `Dock.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `Dock.jsx` | Versão JavaScript + Tailwind |
| `Dock.css` | Folha de estilos CSS puro auxiliar |
| `DockDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12
```

---

## 💡 Como Usar

Veja o arquivo [`DockDemo.jsx`](./DockDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import Dock from './Dock';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <Dock />
    </div>
  );
}
```
