import { createElement, type ReactElement, useEffect } from "react";

import {
  POLAR_FOOTER_TAG_NAME,
  type PolrFooterVariant,
  registerPolrFooter,
} from "./polar-footer";
import {
  POLAR_LOGO_TAG_NAME,
  type PolrLogoVariant,
  registerPolrLogo,
} from "./polar-logo";

interface PolrBrandProps {
  href?: string;
  id?: string;
  className?: string;
  style?: Record<string, string | number>;
}

export interface PolrFooterProps extends PolrBrandProps {
  variant?: PolrFooterVariant;
}

export interface PolrLogoProps extends PolrBrandProps {
  variant?: PolrLogoVariant;
}

function useCustomElementRegistration(register: () => void) {
  useEffect(() => {
    register();
  }, []);
}

export function PolrFooter({
  variant = "light",
  ...props
}: PolrFooterProps): ReactElement {
  useCustomElementRegistration(registerPolrFooter);

  return createElement(POLAR_FOOTER_TAG_NAME, {
    ...props,
    variant,
  });
}

export function PolrLogo({
  variant = "light",
  ...props
}: PolrLogoProps): ReactElement {
  useCustomElementRegistration(registerPolrLogo);

  return createElement(POLAR_LOGO_TAG_NAME, {
    ...props,
    variant,
  });
}
