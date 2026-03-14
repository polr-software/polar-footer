import { createElement, useEffect } from "react";

import {
  POLAR_FOOTER_TAG_NAME,
  type PolarFooterVariant,
  registerPolarFooter,
} from "./polar-footer";

export interface PolarFooterProps {
  variant?: PolarFooterVariant;
  href?: string;
  id?: string;
  className?: string;
  style?: Record<string, string | number>;
}

export function PolarFooter({
  variant = "white",
  ...props
}: PolarFooterProps) {
  useEffect(() => {
    registerPolarFooter();
  }, []);

  return createElement(POLAR_FOOTER_TAG_NAME, {
    ...props,
    variant,
  });
}
