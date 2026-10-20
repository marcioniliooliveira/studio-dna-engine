# StickerPeel

> **Category**: Ícones & Micro-visuals  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Sticker corner lift + peel interaction using 3D transform and shadow depth.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `StickerPeel.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `StickerPeel.jsx` | Versão JavaScript + Tailwind |
| `StickerPeel.css` | Folha de estilos CSS puro auxiliar |
| `StickerPeelDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install gsap@^3.13.0
```

---

## 💡 Como Usar

Veja o arquivo [`StickerPeelDemo.jsx`](./StickerPeelDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import StickerPeel from './StickerPeel';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <StickerPeel />
    </div>
  );
}
```
