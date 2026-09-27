# AnimatedList

> **Category**: Dashboards, Billing & Metrics  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

List items enter with staggered motion variants for polished reveals.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `AnimatedList.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `AnimatedList.jsx` | Versão JavaScript + Tailwind |
| `AnimatedList.css` | Folha de estilos CSS puro auxiliar |
| `AnimatedListDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12
```

---

## 💡 Como Usar

Veja o arquivo [`AnimatedListDemo.jsx`](./AnimatedListDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import AnimatedList from './AnimatedList';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <AnimatedList />
    </div>
  );
}
```
