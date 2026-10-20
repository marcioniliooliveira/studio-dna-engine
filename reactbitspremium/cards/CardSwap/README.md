# CardSwap

> **Category**: Cards Sofisticados & Elegantes  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Cards animate position swapping with smooth layout transitions.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `CardSwap.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `CardSwap.jsx` | Versão JavaScript + Tailwind |
| `CardSwap.css` | Folha de estilos CSS puro auxiliar |
| `CardSwapDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install gsap@^3.13.0
```

---

## 💡 Como Usar

Veja o arquivo [`CardSwapDemo.jsx`](./CardSwapDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import CardSwap from './CardSwap';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <CardSwap />
    </div>
  );
}
```
