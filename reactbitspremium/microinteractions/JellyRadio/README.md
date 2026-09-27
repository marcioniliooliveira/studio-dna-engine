# JellyRadio

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Radio group of labelled chips where the chosen one swells wide-then-tall on two springs and barges its neighbours outward with a travelling stagger, so a selection reads as a force moving through the row.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `JellyRadio.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `JellyRadio.jsx` | Versão JavaScript + Tailwind |
| `JellyRadio.css` | Folha de estilos CSS puro auxiliar |
| `JellyRadioDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12
```

---

## 💡 Como Usar

Veja o arquivo [`JellyRadioDemo.jsx`](./JellyRadioDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import JellyRadio from './JellyRadio';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <JellyRadio />
    </div>
  );
}
```
