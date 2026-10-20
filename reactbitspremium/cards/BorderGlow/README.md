# BorderGlow

> **Category**: Cards Sofisticados & Elegantes  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Glowing mesh-gradient border that follows cursor direction and intensifies near edges.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `BorderGlow.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `BorderGlow.jsx` | Versão JavaScript + Tailwind |
| `BorderGlow.css` | Folha de estilos CSS puro auxiliar |
| `BorderGlowDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

---

## 💡 Como Usar

Veja o arquivo [`BorderGlowDemo.jsx`](./BorderGlowDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import BorderGlow from './BorderGlow';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <BorderGlow />
    </div>
  );
}
```
