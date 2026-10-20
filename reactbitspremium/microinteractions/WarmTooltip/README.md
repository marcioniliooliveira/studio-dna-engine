# WarmTooltip

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Tooltip group with one shared delay: the first label waits and pops from its trigger, then siblings open instantly while the group is warm, with an optional velocity lean.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `WarmTooltip.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `WarmTooltip.jsx` | Versão JavaScript + Tailwind |
| `WarmTooltip.css` | Folha de estilos CSS puro auxiliar |
| `WarmTooltipDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install react-dom@^19.0.0 motion@^12.23.12
```

---

## 💡 Como Usar

Veja o arquivo [`WarmTooltipDemo.jsx`](./WarmTooltipDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import WarmTooltip from './WarmTooltip';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <WarmTooltip />
    </div>
  );
}
```
