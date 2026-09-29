# ElasticSlider

> **Category**: Dashboards, Billing & Metrics  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

Slider handle stretches elastically then snaps with spring physics.

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
| `ElasticSlider.tsx` | Componente pronto em React + TypeScript + Tailwind CSS |
| `ElasticSlider.jsx` | Versão JavaScript + Tailwind |
| `ElasticSlider.css` | Folha de estilos CSS puro auxiliar |
| `ElasticSliderDemo.jsx` | Exemplo de uso prático e demo com estado |
| `registry.json` | Especificação completa shadcn / jsrepo com metadados |

---

## 🚀 Dependências Necessárias

```bash
npm install motion@^12.23.12
```

---

## 💡 Como Usar

Veja o arquivo [`ElasticSliderDemo.jsx`](./ElasticSliderDemo.jsx) para o exemplo completo de implementação com estados, props e customizações.

```tsx
import ElasticSlider from './ElasticSlider';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <ElasticSlider />
    </div>
  );
}
```
