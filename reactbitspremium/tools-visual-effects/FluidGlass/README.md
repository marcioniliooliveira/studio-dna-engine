# FluidGlass

> **Category**: Tools 3D & Efeitos Visuais Statement  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Glassmorphism container with animated liquid distortion refraction.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `FluidGlass.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `FluidGlass.jsx` | Versão JavaScript + Tailwind |
| `FluidGlassDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install three@^0.180.0 @react-three/fiber@^9.3.0 @react-three/drei@^10.7.4 maath@^0.10.8
```

---

## 💡 Como Usar

Veja o arquivo [`FluidGlassDemo.jsx`](./FluidGlassDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import FluidGlass from './FluidGlass';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <FluidGlass />
    </div>
  );
}
```
