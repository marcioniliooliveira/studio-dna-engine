# CountUp

> **Category**: Dashboards, Billing & Metrics  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Animated number counter supporting formatting and decimals.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `CountUp.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `CountUp.jsx` | Versão JavaScript + Tailwind |
| `CountUpDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12
```

---

## 💡 Como Usar

Veja o arquivo [`CountUpDemo.jsx`](./CountUpDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import CountUp from './CountUp';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <CountUp />
    </div>
  );
}
```
