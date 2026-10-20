# Folder

> **Category**: Dashboards, Billing & Metrics  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Interactive folder opens to reveal nested content smooth motion.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `Folder.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `Folder.jsx` | Versão JavaScript + Tailwind |
| `Folder.css` | Folha de estilos CSS puro auxiliar |
| `FolderDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

---

## 💡 Como Usar

Veja o arquivo [`FolderDemo.jsx`](./FolderDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import Folder from './Folder';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <Folder />
    </div>
  );
}
```
