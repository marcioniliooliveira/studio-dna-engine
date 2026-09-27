# SpecularButton

> **Category**: Ícones & Micro-visuals  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Glass button with a shader-driven specular rim light that sweeps around the edge and follows the cursor.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `SpecularButton.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `SpecularButton.jsx` | Versão JavaScript + Tailwind |
| `SpecularButton.css` | Folha de estilos CSS puro auxiliar |
| `SpecularButtonDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install ogl@^1.0.11
```

---

## 💡 Como Usar

Veja o arquivo [`SpecularButtonDemo.jsx`](./SpecularButtonDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import SpecularButton from './SpecularButton';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <SpecularButton />
    </div>
  );
}
```
