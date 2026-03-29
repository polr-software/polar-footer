# polar-footer

Wspoldzielony footer Polr jako instalowalna paczka na publiczny npm, bez kopiowania kodu miedzy repozytoriami.

## Model publikacji

Docelowy model dla tego repo:

- kod w publicznym repo GitHub
- paczka publikowana do publicznego npm
- instalacja w innych projektach przez `npm install`

Ten projekt eksportuje teraz:

- web component pod `polar-footer`
- web component pod `polar-logo`
- wrappery React pod `@polr/footer/react`

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

Albo z Bun:

```bash
bun add @polr/footer
```

## Uzycie w React

```tsx
import { PolrFooter, PolrLogo } from "@polr/footer/react";

export function Layout() {
  return (
    <>
      <PolrLogo variant="light" href="https://polr.pl" />
      <PolrFooter variant="light" href="https://polr.pl" />
    </>
  );
}
```

Dostepne warianty:

- `light`
- `black`

## Uzycie jako web component

```ts
import "@polr/footer";
```

```html
<polar-logo variant="light" href="https://polr.pl"></polar-logo>
<polar-footer variant="black" href="https://polr.pl"></polar-footer>
```

`polar-logo` to standalone badge z ta sama animacja i logika hover/focus, ale bez kontenera footera.

## Development

```bash
npm install
npm run dev
```

Z Bun:

```bash
bun install
bun run dev
```

## Build

```bash
npm run build
```

Z Bun:

```bash
bun run build
```
