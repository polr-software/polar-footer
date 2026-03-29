import {
  POLAR_BRAND_VARIANTS,
  createBadgeMarkup,
  createBadgeStyles,
  type PolrBrandTheme,
  type PolrBrandVariant,
} from "./polr-brand-badge";
import { PolrAnimatedBadgeElement } from "./polr-badge-element";

export const POLAR_LOGO_TAG_NAME = "polar-logo";
export const POLAR_LOGO_VARIANTS = POLAR_BRAND_VARIANTS;

export type PolrLogoVariant = PolrBrandVariant;
export type PolrLogoTheme = PolrBrandTheme;

export class PolrLogoElement extends PolrAnimatedBadgeElement {
  protected override renderTemplate(href: string): string {
    return `
      <style>${createBadgeStyles("inline-block")}</style>
      ${createBadgeMarkup(href)}
    `;
  }
}

export function registerPolrLogo(tagName = POLAR_LOGO_TAG_NAME) {
  if (typeof window === "undefined" || !("customElements" in window)) {
    return;
  }

  if (!window.customElements.get(tagName)) {
    window.customElements.define(tagName, PolrLogoElement);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "polar-logo": PolrLogoElement;
  }
}
