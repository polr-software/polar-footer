# polar-footer

Wspoldzielony footer Polr jako instalowalna paczka, bez kopiowania kodu miedzy repozytoriami.

## Najlepszy sposob uzycia

Jesli footer ma trafic do innego repozytorium, najlepsza opcja to publikacja tego projektu jako paczki:

- osobne repo + prywatne npm albo GitHub Packages, gdy projekty sa oddzielne
- workspace package, gdy oba projekty sa w jednym monorepo

Ten projekt eksportuje teraz:

- web component pod `polar-footer`
- wrapper React pod `polar-footer/react`

## Uzycie w React

```tsx
import { PolarFooter } from "polar-footer/react";

export function Layout() {
  return <PolarFooter variant="white" href="https://polr.pl" />;
}
```

Dostepne warianty:

- `white`
- `black`

## Uzycie jako web component

```ts
import "polar-footer";
```

```html
<polar-footer variant="black" href="https://polr.pl"></polar-footer>
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
