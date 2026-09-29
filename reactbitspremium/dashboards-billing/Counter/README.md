# Counter

> **Category**: Dashboards, Billing & Metrics  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Flexible animated counter supporting increments + easing.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `Counter.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `Counter.jsx` | Versão JavaScript + Tailwind |
| `Counter.css` | Folha de estilos CSS puro auxiliar |
| `CounterDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12
```

---

## 💡 Como Usar

Veja o arquivo [`CounterDemo.jsx`](./CounterDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import Counter from './Counter';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <Counter />
    </div>
  );
}
```
