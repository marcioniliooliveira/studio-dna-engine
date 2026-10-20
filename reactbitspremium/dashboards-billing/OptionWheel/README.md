# OptionWheel

> **Category**: Dashboards, Billing & Metrics  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Curved option picker that spins via scroll, drag, or arrow keys, fading and tilting items away from the selection.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `OptionWheel.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `OptionWheel.jsx` | Versão JavaScript + Tailwind |
| `OptionWheel.css` | Folha de estilos CSS puro auxiliar |
| `OptionWheelDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

---

## 💡 Como Usar

Veja o arquivo [`OptionWheelDemo.jsx`](./OptionWheelDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import OptionWheel from './OptionWheel';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <OptionWheel />
    </div>
  );
}
```
