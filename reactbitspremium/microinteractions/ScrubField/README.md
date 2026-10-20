# ScrubField

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Number chip you drag to scrub: the value follows the hand, pushes past the range on a rubber band, and a click without moving opens it for typing.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `ScrubField.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `ScrubField.jsx` | Versão JavaScript + Tailwind |
| `ScrubField.css` | Folha de estilos CSS puro auxiliar |
| `ScrubFieldDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12
```

---

## 💡 Como Usar

Veja o arquivo [`ScrubFieldDemo.jsx`](./ScrubFieldDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import ScrubField from './ScrubField';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <ScrubField />
    </div>
  );
}
```
