# LaserFlow

> **Category**: Tools 3D & Efeitos Visuais Statement  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Dynamic laser light that flows onto a surface, customizable effect.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `LaserFlow.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `LaserFlow.jsx` | Versão JavaScript + Tailwind |
| `LaserFlow.css` | Folha de estilos CSS puro auxiliar |
| `LaserFlowDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install three@^0.180.0
```

---

## 💡 Como Usar

Veja o arquivo [`LaserFlowDemo.jsx`](./LaserFlowDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import LaserFlow from './LaserFlow';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <LaserFlow />
    </div>
  );
}
```
