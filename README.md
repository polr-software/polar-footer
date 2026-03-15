# polar-footer

Wspoldzielony footer Polr jako instalowalna paczka na publiczny npm, bez kopiowania kodu miedzy repozytoriami.

## Model publikacji

Docelowy model dla tego repo:

- kod w publicznym repo GitHub
- paczka publikowana do publicznego npm
- instalacja w innych projektach przez `npm install`

Ten projekt eksportuje teraz:

- web component pod `polar-footer`
- wrapper React pod `polar-footer/react`

## Przed pierwszym publish

Finalna nazwa pakietu w `package.json` to:

- `@polr/footer`

Dla scoped package publikacja publiczna wymaga `npm publish --access public`.

Aktualna konfiguracja:

```json
{
  "name": "@polr/footer"
}
```

## Publikacja na npm

```bash
npm login
npm run build
npm publish --access public
```

Jesli publikujesz pakiet unscoped, zwykle wystarczy:

```bash
npm publish
```

## Instalacja w innym repo

Instalacja:

```bash
npm install @polr/footer
```

## Uzycie w React

```tsx
import { PolarFooter } from "@polr/footer/react";

export function Layout() {
  return <PolarFooter variant="white" href="https://polr.pl" />;
}
```

Dostepne warianty:

- `white`
- `black`

## Uzycie jako web component

```ts
import "@polr/footer";
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
