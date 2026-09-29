# RubberSegment

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Segmented control with a rubber thumb: taps stretch it across the gap and squash it onto the target, and you can grab, drag and flick it between slots.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `RubberSegment.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `RubberSegment.jsx` | Versão JavaScript + Tailwind |
| `RubberSegment.css` | Folha de estilos CSS puro auxiliar |
| `RubberSegmentDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12
```

---

## 💡 Como Usar

Veja o arquivo [`RubberSegmentDemo.jsx`](./RubberSegmentDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import RubberSegment from './RubberSegment';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <RubberSegment />
    </div>
  );
}
```
