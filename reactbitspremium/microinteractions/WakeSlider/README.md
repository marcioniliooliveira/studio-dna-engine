# WakeSlider

> **Category**: Microinterações & Controles Hápticos  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Range slider drawn as thin bars with no thumb: drag speed raises a wake that trails behind the handle and flattens again at rest.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `WakeSlider.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `WakeSlider.jsx` | Versão JavaScript + Tailwind |
| `WakeSlider.css` | Folha de estilos CSS puro auxiliar |
| `WakeSliderDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12
```

---

## 💡 Como Usar

Veja o arquivo [`WakeSliderDemo.jsx`](./WakeSliderDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import WakeSlider from './WakeSlider';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <WakeSlider />
    </div>
  );
}
```
