# TearTicket

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Ticket whose perforated stub tears off by hand: paper bridges stretch into fibres and snap one by one from the far end, the torn edges are jagged and fit each other, the freed stub dangles and drops, and the body is stamped as used. The artwork tilts in 3D with parallax on hover.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `TearTicket.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `TearTicket.jsx` | Versão JavaScript + Tailwind |
| `TearTicket.css` | Folha de estilos CSS puro auxiliar |
| `TearTicketDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12
```

---

## 💡 Como Usar

Veja o arquivo [`TearTicketDemo.jsx`](./TearTicketDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import TearTicket from './TearTicket';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <TearTicket />
    </div>
  );
}
```
