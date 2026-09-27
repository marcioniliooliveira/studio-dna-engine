# PaperCrumple

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

An image that crumples into a textured 3D sheet while held and follows the grabbed point as you drag. Release it as a crumpled ball, unfold it flat, or leave the paper creased, with customizable folds, paper grain, lighting and shadows.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `PaperCrumple.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `PaperCrumple.jsx` | Versão JavaScript + Tailwind |
| `PaperCrumple.css` | Folha de estilos CSS puro auxiliar |
| `PaperCrumpleDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install three@^0.180.0
```

---

## 💡 Como Usar

Veja o arquivo [`PaperCrumpleDemo.jsx`](./PaperCrumpleDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import PaperCrumple from './PaperCrumple';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <PaperCrumple />
    </div>
  );
}
```
