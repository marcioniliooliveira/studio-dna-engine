# SpringCheck

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Checkbox row where a single spring fills the box, draws the tick, strikes the label and dims the words in one press.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `SpringCheck.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `SpringCheck.jsx` | Versão JavaScript + Tailwind |
| `SpringCheck.css` | Folha de estilos CSS puro auxiliar |
| `SpringCheckDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12 @hugeicons/core-free-icons@^4.3.3
```

---

## 💡 Como Usar

Veja o arquivo [`SpringCheckDemo.jsx`](./SpringCheckDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import SpringCheck from './SpringCheck';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <SpringCheck />
    </div>
  );
}
```
