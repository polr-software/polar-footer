declare module "react" {
  export function createElement(
    type: string | ((props: unknown) => unknown),
    props?: Record<string, unknown> | null,
    ...children: unknown[]
  ): unknown;

  export function useEffect(
    effect: () => void | (() => void),
    deps?: readonly unknown[],
  ): void;
}
