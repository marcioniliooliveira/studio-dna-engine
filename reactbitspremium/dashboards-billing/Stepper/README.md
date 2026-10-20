# Stepper

> **Category**: Dashboards, Billing & Metrics  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Animated multi-step progress indicator with active state transitions.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `Stepper.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `Stepper.jsx` | Versão JavaScript + Tailwind |
| `Stepper.css` | Folha de estilos CSS puro auxiliar |
| `StepperDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12
```

---

## 💡 Como Usar

Veja o arquivo [`StepperDemo.jsx`](./StepperDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import Stepper from './Stepper';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <Stepper />
    </div>
  );
}
```
