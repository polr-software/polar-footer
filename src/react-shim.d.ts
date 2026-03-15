declare module "react" {
  export interface ReactElement<
    Props = Record<string, unknown>,
    Type = string | ((props: Props) => ReactElement),
  > {
    type: Type;
    props: Props;
    key: string | number | null;
  }

  export function createElement(
    type: string | ((props: unknown) => ReactElement),
    props?: Record<string, unknown> | null,
    ...children: unknown[]
  ): ReactElement;

  export function useEffect(
    effect: () => void | (() => void),
    deps?: readonly unknown[],
  ): void;
}
