# SlingButton

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Send button you pull back like a slingshot: the band stretches, a power arc arms it, and releasing fires the action with the flick's velocity.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `SlingButton.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `SlingButton.jsx` | Versão JavaScript + Tailwind |
| `SlingButton.css` | Folha de estilos CSS puro auxiliar |
| `SlingButtonDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12 @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3
```

---

## 💡 Como Usar

Veja o arquivo [`SlingButtonDemo.jsx`](./SlingButtonDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import SlingButton from './SlingButton';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <SlingButton />
    </div>
  );
}
```
