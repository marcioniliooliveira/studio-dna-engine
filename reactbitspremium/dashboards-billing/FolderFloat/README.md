# FolderFloat

> **Category**: Dashboards, Billing & Metrics  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Folder that opens on hover or press: the flap tilts toward you, a paper edge rises, and its notes spring out from behind the flap into a floating cloud to pick from, then sink back when the folder closes.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `FolderFloat.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `FolderFloat.jsx` | Versão JavaScript + Tailwind |
| `FolderFloat.css` | Folha de estilos CSS puro auxiliar |
| `FolderFloatDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install matter-js@^0.20.0
```

---

## 💡 Como Usar

Veja o arquivo [`FolderFloatDemo.jsx`](./FolderFloatDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import FolderFloat from './FolderFloat';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <FolderFloat />
    </div>
  );
}
```
