# StatusMark

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

A 20px status glyph for agent task lists that morphs in place from a dashed idle ring to a spinning or real-progress arc, then draws a check or a cross, with an optional label strike.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `StatusMark.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `StatusMark.jsx` | Versão JavaScript + Tailwind |
| `StatusMark.css` | Folha de estilos CSS puro auxiliar |
| `StatusMarkDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12
```

---

## 💡 Como Usar

Veja o arquivo [`StatusMarkDemo.jsx`](./StatusMarkDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import StatusMark from './StatusMark';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <StatusMark />
    </div>
  );
}
```
