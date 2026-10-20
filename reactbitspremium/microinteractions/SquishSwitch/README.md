# SquishSwitch

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Drag-scrubbable switch whose thumb stretches by how fast it moves, flips at the midpoint and squashes against the track end on a flick.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `SquishSwitch.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `SquishSwitch.jsx` | Versão JavaScript + Tailwind |
| `SquishSwitch.css` | Folha de estilos CSS puro auxiliar |
| `SquishSwitchDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12
```

---

## 💡 Como Usar

Veja o arquivo [`SquishSwitchDemo.jsx`](./SquishSwitchDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import SquishSwitch from './SquishSwitch';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <SquishSwitch />
    </div>
  );
}
```
