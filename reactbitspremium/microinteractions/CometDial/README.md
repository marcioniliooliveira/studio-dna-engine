# CometDial

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Tick-ring dial you flick by angle: the reading launches on a spring and a velocity-driven comet streaks behind the lit head, trailing the direction of travel and vanishing at rest.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `CometDial.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `CometDial.jsx` | Versão JavaScript + Tailwind |
| `CometDial.css` | Folha de estilos CSS puro auxiliar |
| `CometDialDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12
```

---

## 💡 Como Usar

Veja o arquivo [`CometDialDemo.jsx`](./CometDialDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import CometDial from './CometDial';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <CometDial />
    </div>
  );
}
```
