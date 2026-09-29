# ModelViewer

> **Category**: Tools 3D & Efeitos Visuais Statement  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Three.js model viewer with orbit controls and lighting presets.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `ModelViewer.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `ModelViewer.jsx` | Versão JavaScript + Tailwind |
| `ModelViewerDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install @react-three/fiber@^9.3.0 @react-three/drei@^10.7.4 three@^0.180.0
```

---

## 💡 Como Usar

Veja o arquivo [`ModelViewerDemo.jsx`](./ModelViewerDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import ModelViewer from './ModelViewer';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <ModelViewer />
    </div>
  );
}
```
