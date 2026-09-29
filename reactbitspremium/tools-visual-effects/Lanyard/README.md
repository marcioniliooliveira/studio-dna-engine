# Lanyard

> **Category**: Tools 3D & Efeitos Visuais Statement  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Swinging 3D lanyard / badge card with realistic inertial motion.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `Lanyard.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `Lanyard.jsx` | Versão JavaScript + Tailwind |
| `Lanyard.css` | Folha de estilos CSS puro auxiliar |
| `LanyardDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |
| `card.glb` | Asset 3D/Textura |
| `lanyard.png` | Asset 3D/Textura |

---

## 🚀 Dependências Necessárias

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

---

## 💡 Como Usar

Veja o arquivo [`LanyardDemo.jsx`](./LanyardDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import Lanyard from './Lanyard';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <Lanyard />
    </div>
  );
}
```
