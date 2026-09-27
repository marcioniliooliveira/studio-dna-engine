# SlideCommit

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Slide-to-confirm handle that plants with a spinner while your action runs, unfurls into a done pill on success and springs home with a squash and shake on failure.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `SlideCommit.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `SlideCommit.jsx` | Versão JavaScript + Tailwind |
| `SlideCommit.css` | Folha de estilos CSS puro auxiliar |
| `SlideCommitDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12 @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3
```

---

## 💡 Como Usar

Veja o arquivo [`SlideCommitDemo.jsx`](./SlideCommitDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import SlideCommit from './SlideCommit';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <SlideCommit />
    </div>
  );
}
```
