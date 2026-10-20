# PromptBar

> **Category**: Chat AI & AI Agent Interfaces  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Chat composer with an @ sources menu, a / commands menu, a model picker, dictation and attachments, whose send tile charges to ink the moment there is something to send and morphs its arrow into a stop square while busy.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `PromptBar.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `PromptBar.jsx` | Versão JavaScript + Tailwind |
| `PromptBar.css` | Folha de estilos CSS puro auxiliar |
| `PromptBarDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12 @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3
```

---

## 💡 Como Usar

Veja o arquivo [`PromptBarDemo.jsx`](./PromptBarDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import PromptBar from './PromptBar';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <PromptBar />
    </div>
  );
}
```
