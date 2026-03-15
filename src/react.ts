import { createElement, type ReactElement, useEffect } from "react";

import {
  POLAR_FOOTER_TAG_NAME,
  type PolrFooterVariant,
  registerPolrFooter,
} from "./polar-footer";

export interface PolrFooterProps {
  variant?: PolrFooterVariant;
  href?: string;
  id?: string;
  className?: string;
  style?: Record<string, string | number>;
}

export function PolrFooter({
  variant = "white",
  ...props
}: PolrFooterProps): ReactElement {
  useEffect(() => {
    registerPolrFooter();
  }, []);

  return createElement(POLAR_FOOTER_TAG_NAME, {
    ...props,
    variant,
  });
}
