# GlideSelect

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Select chip whose menu pops out of its own corner and whose single hover highlight glides between rows, remembering where you left it so re-entry slides from there instead of blinking in.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `GlideSelect.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `GlideSelect.jsx` | Versão JavaScript + Tailwind |
| `GlideSelect.css` | Folha de estilos CSS puro auxiliar |
| `GlideSelectDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3
```

---

## 💡 Como Usar

Veja o arquivo [`GlideSelectDemo.jsx`](./GlideSelectDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import GlideSelect from './GlideSelect';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <GlideSelect />
    </div>
  );
}
```
