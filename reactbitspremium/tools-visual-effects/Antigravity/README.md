# Antigravity

> **Category**: Tools 3D & Efeitos Visuais Statement  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

3D antigravity particle field that repels from the cursor with smooth motion.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `Antigravity.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `Antigravity.jsx` | Versão JavaScript + Tailwind |
| `AntigravityDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install @react-three/fiber@^9.3.0 three@^0.180.0
```

---

## 💡 Como Usar

Veja o arquivo [`AntigravityDemo.jsx`](./AntigravityDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import Antigravity from './Antigravity';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <Antigravity />
    </div>
  );
}
```
