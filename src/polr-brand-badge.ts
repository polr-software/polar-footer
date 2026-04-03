import {
  BLACK_VARIANT_WORDMARK_SVG,
  LIGHT_VARIANT_WORDMARK_SVG,
} from "virtual:polr-brand-assets";

export const POLAR_ELEMENT_BASE = (
  typeof HTMLElement === "undefined" ? class {} : HTMLElement
) as typeof HTMLElement;

export const POLAR_BRAND_VARIANTS = ["light", "dark"] as const;

export type PolrBrandVariant = (typeof POLAR_BRAND_VARIANTS)[number];
export type PolrBrandTheme = "light" | "dark";

export const DEFAULT_HREF = "https://polr.pl";

const LINK_LABEL = "Powered by Polr";
const ALLOWED_PROTOCOLS = ["http:", "https:", "mailto:"] as const;

const TEXT_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

export function sanitizeHref(raw: string): string {
  try {
    const url = new URL(raw, "https://placeholder.invalid");
    if (
      ALLOWED_PROTOCOLS.includes(
        url.protocol as (typeof ALLOWED_PROTOCOLS)[number],
      )
    ) {
      return raw;
    }
  } catch {
    // Invalid URL.
  }

  return DEFAULT_HREF;
}

function createHostStyles(display: "block" | "inline-block"): string {
  return `
    :host {
      display: ${display};
      --pf-font: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
      --pf-color: #171717;
      --pf-muted: rgba(23, 23, 23, 0.62);
      --pf-bg: rgba(255, 255, 255, 0.9);
      --pf-border: rgba(0, 0, 0, 0.08);
      --pf-hover-bg: rgba(255, 255, 255, 0.97);
      --pf-shadow: 0 -1px 20px rgba(0, 0, 0, 0.035);
      --pf-hover-shadow: 0 -4px 32px rgba(0, 0, 0, 0.075);
      --pf-pill-bg: rgba(0, 0, 0, 0);
      --pf-pill-hover: rgba(0, 0, 0, 0.045);
      --pf-focus: rgba(0, 0, 0, 0.24);
      color: var(--pf-color);
      font-family: var(--pf-font);
    }

    :host([variant="dark"]),
    :host(:not([variant])[theme="dark"]) {
      --pf-color: #efefef;
      --pf-muted: rgba(239, 239, 239, 0.68);
      --pf-bg: rgba(17, 17, 17, 0.88);
      --pf-border: rgba(255, 255, 255, 0.08);
      --pf-hover-bg: rgba(17, 17, 17, 0.96);
      --pf-shadow: 0 -1px 24px rgba(0, 0, 0, 0.18);
      --pf-hover-shadow: 0 -4px 36px rgba(0, 0, 0, 0.34);
      --pf-pill-hover: rgba(255, 255, 255, 0.07);
      --pf-focus: rgba(255, 255, 255, 0.24);
    }
  `;
}

const BADGE_STYLES = `
  .badge {
    position: relative;
    display: inline-flex;
    align-items: center;
    min-height: 32px;
    padding: 6px 10px;
    border-radius: 999px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    background: var(--pf-pill-bg);
    cursor: pointer;
    visibility: hidden;
    will-change: transform;
    contain: layout style paint;
    transition: background 180ms ease, transform 180ms ease;
  }

  .badge[data-ready="true"] {
    visibility: visible;
  }

  .badge:hover,
  .badge[data-stage="hover"] {
    background: var(--pf-pill-hover);
    transform: translateY(-1px);
  }

  .badge:focus-visible {
    outline: 2px solid var(--pf-focus);
    outline-offset: 3px;
    background: var(--pf-pill-hover);
  }

  .copy {
    display: grid;
    grid-template-columns: 0fr;
    align-items: center;
    overflow: hidden;
    opacity: 0;
    margin-right: 0;
    transition:
      grid-template-columns 420ms ${TEXT_EASING},
      opacity 180ms ease,
      margin-right 420ms ${TEXT_EASING};
  }

  .copy-track {
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    min-width: 0;
    transform: translateY(12%);
    opacity: 0;
    transition:
      transform 320ms ${TEXT_EASING},
      opacity 180ms ease;
  }

  .powered-text {
    color: var(--pf-muted);
    font-size: 11px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .wordmark-asset {
    display: none;
    line-height: 0;
  }

  .wordmark-asset svg {
    display: block;
    width: auto;
    height: 14px;
  }

  .wordmark-light {
    display: inline-flex;
  }

  :host([variant="dark"]) .wordmark-light,
  :host(:not([variant])[theme="dark"]) .wordmark-light {
    display: none;
  }

  :host([variant="dark"]) .wordmark-dark,
  :host(:not([variant])[theme="dark"]) .wordmark-dark {
    display: inline-flex;
  }

  .badge[data-stage="settled"] .wordmark,
  .badge[data-stage="hover"] .wordmark {
    grid-template-columns: 1fr;
    opacity: 1;
    margin-right: 10px;
  }

  .badge[data-stage="hover"] .powered {
    grid-template-columns: 1fr;
    opacity: 1;
    margin-right: 8px;
  }

  .badge[data-stage="settled"] .wordmark .copy-track,
  .badge[data-stage="hover"] .wordmark .copy-track,
  .badge[data-stage="hover"] .powered .copy-track {
    transform: translateY(0);
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .badge,
    .copy,
    .copy-track {
      transition: none;
      animation: none;
      will-change: auto;
    }
  }
`;

export const FOOTER_SHELL_STYLES = `
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    background: var(--pf-bg);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-top: 1px solid var(--pf-border);
    box-shadow: var(--pf-shadow);
  }
`;

export function createBadgeStyles(
  hostDisplay: "block" | "inline-block",
  shellStyles = "",
): string {
  return `${createHostStyles(hostDisplay)}${shellStyles}${BADGE_STYLES}`;
}

export function createBadgeMarkup(href: string): string {
  return `
    <a
      class="badge"
      data-stage="idle"
      data-ready="false"
      href="${href}"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="${LINK_LABEL}"
    >
      <span class="copy powered" aria-hidden="true">
        <span class="copy-track">
          <span class="powered-text">Powered by</span>
        </span>
      </span>
      <span class="copy wordmark" aria-hidden="true">
        <span class="copy-track">
          <span class="wordmark-asset wordmark-light">${LIGHT_VARIANT_WORDMARK_SVG}</span>
          <span class="wordmark-asset wordmark-dark">${BLACK_VARIANT_WORDMARK_SVG}</span>
        </span>
      </span>
    </a>
  `;
}
