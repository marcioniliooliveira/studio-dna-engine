# TechText

> **Category**: Chat AI & AI Agent Interfaces  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

A wordmark whose letters turn into dashed vector paths under the cursor. Grab any letter to drag it off the baseline and it springs back home.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `TechText.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `TechText.jsx` | Versão JavaScript + Tailwind |
| `TechText.css` | Folha de estilos CSS puro auxiliar |
| `TechTextDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

---

## 💡 Como Usar

Veja o arquivo [`TechTextDemo.jsx`](./TechTextDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import TechText from './TechText';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <TechText />
    </div>
  );
}
```
