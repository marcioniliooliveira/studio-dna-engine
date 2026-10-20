# DecryptedText

> **Category**: Chat AI & AI Agent Interfaces  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Hacker-style decryption cycling random glyphs until resolving to real text.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `DecryptedText.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `DecryptedText.jsx` | Versão JavaScript + Tailwind |
| `DecryptedTextDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12
```

---

## 💡 Como Usar

Veja o arquivo [`DecryptedTextDemo.jsx`](./DecryptedTextDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import DecryptedText from './DecryptedText';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <DecryptedText />
    </div>
  );
}
```
