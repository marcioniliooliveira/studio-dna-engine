# GlassSurface

> **Category**: Tools 3D & Efeitos Visuais Statement  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Advanced Apple-style glass surface with real-time distortion + lighting.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `GlassSurface.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `GlassSurface.jsx` | Versão JavaScript + Tailwind |
| `GlassSurface.css` | Folha de estilos CSS puro auxiliar |
| `GlassSurfaceDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

---

## 💡 Como Usar

Veja o arquivo [`GlassSurfaceDemo.jsx`](./GlassSurfaceDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import GlassSurface from './GlassSurface';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <GlassSurface />
    </div>
  );
}
```
