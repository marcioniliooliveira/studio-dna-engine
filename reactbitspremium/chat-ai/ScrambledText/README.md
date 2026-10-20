# ScrambledText

> **Category**: Chat AI & AI Agent Interfaces  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Detects cursor position and applies a distortion effect to text.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `ScrambledText.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `ScrambledText.jsx` | Versão JavaScript + Tailwind |
| `ScrambledText.css` | Folha de estilos CSS puro auxiliar |
| `ScrambledTextDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install gsap@^3.13.0
```

---

## 💡 Como Usar

Veja o arquivo [`ScrambledTextDemo.jsx`](./ScrambledTextDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import ScrambledText from './ScrambledText';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <ScrambledText />
    </div>
  );
}
```
