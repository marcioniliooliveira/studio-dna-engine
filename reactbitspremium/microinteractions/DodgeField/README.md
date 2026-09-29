# DodgeField

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Wrapper that makes any child flee the pointer inside a bounded field, dodges once per approach, then relents after a few tries and glides home.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `DodgeField.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `DodgeField.jsx` | Versão JavaScript + Tailwind |
| `DodgeField.css` | Folha de estilos CSS puro auxiliar |
| `DodgeFieldDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12
```

---

## 💡 Como Usar

Veja o arquivo [`DodgeFieldDemo.jsx`](./DodgeFieldDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import DodgeField from './DodgeField';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <DodgeField />
    </div>
  );
}
```
