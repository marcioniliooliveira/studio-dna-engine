# Shredder

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

A list with a paper shredder at the bottom. Drag a row into the slit and the rollers tug it in, pull it through and cut it into strips that curl out underneath, tumble away and fade out. The rest of the list settles down on a spring and the shredded item is handed to you to delete.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `Shredder.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `Shredder.jsx` | Versão JavaScript + Tailwind |
| `Shredder.css` | Folha de estilos CSS puro auxiliar |
| `ShredderDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install react-dom@^19.0.0
```

---

## 💡 Como Usar

Veja o arquivo [`ShredderDemo.jsx`](./ShredderDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import Shredder from './Shredder';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <Shredder />
    </div>
  );
}
```
