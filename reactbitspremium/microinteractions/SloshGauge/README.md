# SloshGauge

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Tank gauge whose liquid chases the value with mass, tilts with its own speed and splashes against the top when it slams full; optionally a vertical slider.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `SloshGauge.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `SloshGauge.jsx` | Versão JavaScript + Tailwind |
| `SloshGauge.css` | Folha de estilos CSS puro auxiliar |
| `SloshGaugeDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

---

## 💡 Como Usar

Veja o arquivo [`SloshGaugeDemo.jsx`](./SloshGaugeDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import SloshGauge from './SloshGauge';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <SloshGauge />
    </div>
  );
}
```
