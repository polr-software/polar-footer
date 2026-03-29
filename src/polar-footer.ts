import {
  FOOTER_SHELL_STYLES,
  POLAR_BRAND_VARIANTS,
  createBadgeMarkup,
  createBadgeStyles,
  type PolrBrandTheme,
  type PolrBrandVariant,
} from "./polr-brand-badge";
import { PolrAnimatedBadgeElement } from "./polr-badge-element";

export const POLAR_FOOTER_TAG_NAME = "polar-footer";
export const POLAR_FOOTER_VARIANTS = POLAR_BRAND_VARIANTS;

export type PolrFooterVariant = PolrBrandVariant;
export type PolrFooterTheme = PolrBrandTheme;

export class PolrFooterElement extends PolrAnimatedBadgeElement {
  protected override renderTemplate(href: string): string {
    return `
      <style>${createBadgeStyles("block", FOOTER_SHELL_STYLES)}</style>
      <footer class="footer">
        ${createBadgeMarkup(href)}
      </footer>
    `;
  }
}

export function registerPolrFooter(tagName = POLAR_FOOTER_TAG_NAME) {
  if (typeof window === "undefined" || !("customElements" in window)) {
    return;
  }

  if (!window.customElements.get(tagName)) {
    window.customElements.define(tagName, PolrFooterElement);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "polar-footer": PolrFooterElement;
  }
}
