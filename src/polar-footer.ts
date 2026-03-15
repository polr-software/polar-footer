const POLAR_FOOTER_ELEMENT_BASE = (
  typeof HTMLElement === "undefined" ? class { } : HTMLElement
) as typeof HTMLElement;

export const POLAR_FOOTER_TAG_NAME = "polar-footer";
export const POLAR_FOOTER_VARIANTS = ["white", "black"] as const;

export type PolrFooterVariant = (typeof POLAR_FOOTER_VARIANTS)[number];
export type PolrFooterTheme = "light" | "dark";

const LOGO_ICON = `<svg viewBox="0 0 2000 1996.95" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M568.23,1442.47c-111.71,79.07-246.9,197.83-168.4,348.89-147.13-75.76-196.49-248.1-125.32-394.89,61.31-126.46,224.54-267.71,342.66-341.82l451.92-283.57c107.53-67.47,210.11-132.21,307.9-212.43,122.09-100.15,250.72-257.91,113.92-411.25,104.79,34.44,189.46,106.98,248.3,195.84,82.06,123.93,76.14,276.54-9.3,396.76-49.31,69.38-109.54,124.67-179.42,175.23-102.66,74.28-209.63,135.29-324.97,189.34l-352.45,165.18c-107.41,50.34-208.28,104.35-304.85,172.7v.02Z"/>
  <path d="M107.46,1483.1c-148.34-218.21-17.66-441.66,140.01-609.3,92.1-97.93,190.94-182.8,298.19-263.82l172.35-130.21c96.12-72.62,189.19-143.91,276.23-226.91,40.8-38.9,119.78-122.81,87.2-175.22-32.03-51.53-188.62-30.12-243.13-17.17C533.32,132.93,278.27,341.31,146.69,625.45c-30.63,66.15-54.03,130.08-72.21,200.52L5.9,1091.62C-37.76,699.99,164.24,326.37,502.93,132.98,715.67,11.52,966.51-30.18,1206.85,22.17c52.61,11.46,101.51,29.56,143.13,59.52,71.63,51.56,93.93,137.9,57.84,218.16-30.37,67.53-77.68,122.99-134.52,172.42-89.24,77.59-183.09,143.56-283.66,206.86l-328.28,206.61c-109.96,69.21-211.31,143.75-307.71,230.29-128.83,115.66-239.21,284.24-164.63,462.35-37.34-26.51-57.67-60.17-81.55-95.28h0Z"/>
  <path d="M495.53,1582.27c8.16,96.48,127.55,166.89,207.35,197.62,193.88,74.65,406.81,73.11,603.92,5.02,349.82-120.84,588.65-443.5,614.7-812.28,7.93-112.22-2.33-218.31-26.03-328.2-7.52-34.85-16.3-69.48-15.61-104.25,136.12,242.62,155.4,527.88,63.78,787.39-138.34,391.9-512.22,659.4-927.6,669.11-144.9,3.39-282.22-24.41-411.27-86.01-57.64-27.51-107.05-63.61-145.01-114.12-52.98-70.5-34.97-166.8,35.76-214.27h0Z"/>
</svg>`;

const WORDMARK = `<svg viewBox="0 0 5116.04 1996.95" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M894.97,116.53c376.65,0,615.37,265.25,615.37,594.15s-238.72,594.15-615.37,594.15h-424.39c-26.52,0-47.74,21.22-47.74,47.74v514.58c0,26.52-21.22,47.74-47.74,47.74h-193.63c-26.52,0-47.74-21.22-47.74-47.74V164.27c0-26.52,21.22-47.74,47.74-47.74h713.51ZM894.97,405.64h-424.39c-26.52,0-47.74,21.22-47.74,47.74v514.58c0,26.52,21.22,47.74,47.74,47.74h424.39c217.5,0,326.25-135.28,326.25-305.03s-108.75-305.03-326.25-305.03Z"/>
  <path d="M3016.89,1246.47c0,379.3-307.69,686.99-686.99,686.99s-686.99-307.69-686.99-686.99,307.69-686.99,686.99-686.99,686.99,307.69,686.99,686.99ZM2727.78,1246.47c0-220.15-177.71-397.87-397.87-397.87s-397.87,177.71-397.87,397.87,177.71,397.87,397.87,397.87,397.87-177.71,397.87-397.87Z"/>
  <path d="M4982.33,832.7c0,15.91-7.96,31.83-23.87,42.44l-159.15,98.14c-7.96,5.3-18.57,7.96-29.18,7.96-15.91,0-29.18-7.96-39.79-18.57-61.01-76.92-153.84-114.06-254.64-114.06-180.37,0-328.91,116.71-328.91,344.82v673.72c0,26.52-21.22,47.74-47.74,47.74h-517.2c-238.72,0-432.35-164.45-432.35-450.92V113.89c0-26.52,21.22-50.4,47.74-50.4h193.63c26.52,0,47.74,23.87,47.74,50.4v1350.1c0,127.32,63.66,161.8,143.23,161.8h278.48v-432.35c0-387.26,275.86-633.94,615.37-633.94,204.24,0,384.61,90.18,498.66,246.68,5.3,7.96,7.96,15.91,7.96,26.52Z"/>
</svg>`;

const DEFAULT_HREF = "https://polr.pl";
const LINK_LABEL = "Powered by Polr";
const ALLOWED_PROTOCOLS = ["http:", "https:", "mailto:"] as const;
const TEXT_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const ICON_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

type BadgeStage = "idle" | "settled" | "hover";

function sanitizeHref(raw: string): string {
  try {
    const url = new URL(raw, "https://placeholder.invalid");
    if (ALLOWED_PROTOCOLS.includes(url.protocol as (typeof ALLOWED_PROTOCOLS)[number])) {
      return raw;
    }
  } catch {
    // Invalid URL.
  }

  return DEFAULT_HREF;
}

const KEYFRAMES = {
  iconEntrance: [
    { opacity: 0, transform: "translateY(8px) scale(0.94)" },
    { opacity: 1, transform: "translateY(-1px) scale(1.02)", offset: 0.72 },
    { opacity: 1, transform: "translateY(0) scale(1)" },
  ],
  iconHover: [
    { transform: "translateY(0) scale(1)" },
    { transform: "translateY(-1px) scale(1.03)" },
  ],
} as const;

const STYLES = `
  :host {
    display: block;
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

  :host([variant="black"]),
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
    transition: background 220ms ease, box-shadow 220ms ease;
  }

  .footer:hover,
  .footer:focus-within {
    background: var(--pf-hover-bg);
    box-shadow: var(--pf-hover-shadow);
  }

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
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    max-width: 0;
    opacity: 0;
    margin-right: 0;
    transition:
      max-width 420ms ${TEXT_EASING},
      opacity 180ms ease,
      margin-right 420ms ${TEXT_EASING};
  }

  .copy-track {
    display: inline-flex;
    align-items: center;
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

  .wordmark svg {
    display: block;
    width: auto;
    height: 14px;
  }

  .icon-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    width: 20px;
    height: 20px;
  }

  .icon-wrap svg {
    display: block;
    width: 20px;
    height: 20px;
    opacity: 0;
    transform: translateY(8px) scale(0.94);
    transform-origin: center;
    transition: filter 180ms ease;
    will-change: transform, opacity;
  }

  .badge[data-stage="settled"] .wordmark,
  .badge[data-stage="hover"] .wordmark {
    max-width: 86px;
    opacity: 1;
    margin-right: 10px;
  }

  .badge[data-stage="hover"] .powered {
    max-width: 120px;
    opacity: 1;
    margin-right: 8px;
  }

  .badge[data-stage="settled"] .wordmark .copy-track,
  .badge[data-stage="hover"] .wordmark .copy-track,
  .badge[data-stage="hover"] .powered .copy-track {
    transform: translateY(0);
    opacity: 1;
  }

  .badge[data-stage="idle"] .icon-wrap svg,
  .badge[data-stage="settled"] .icon-wrap svg,
  .badge[data-stage="hover"] .icon-wrap svg {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .badge[data-stage="hover"] .icon-wrap svg {
    filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.12));
  }

  :host([variant="black"]) .badge[data-stage="hover"] .icon-wrap svg,
  :host(:not([variant])[theme="dark"]) .badge[data-stage="hover"] .icon-wrap svg {
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.12));
  }

  @media (prefers-reduced-motion: reduce) {
    .footer,
    .badge,
    .copy,
    .copy-track,
    .icon-wrap svg {
      transition: none;
      animation: none;
      will-change: auto;
    }
  }
`;

export class PolrFooterElement extends POLAR_FOOTER_ELEMENT_BASE {
  private root: ShadowRoot;
  private badgeEl!: HTMLAnchorElement;
  private iconSvg!: SVGElement;
  private activeAnimations: Set<Animation> = new Set();
  private pendingFrames: Set<number> = new Set();
  private cleanupFns: Array<() => void> = [];
  private destroyed = false;

  static get observedAttributes() {
    return ["theme", "variant", "href"];
  }

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.destroyed = false;
    this.render();
    this.bindInteractions();
    void this.start();
  }

  disconnectedCallback() {
    this.destroyed = true;
    this.cleanupFns.forEach((fn) => fn());
    this.cleanupFns = [];
    this.pendingFrames.forEach((id) => cancelAnimationFrame(id));
    this.pendingFrames.clear();
    this.cancelAnimations();
  }

  attributeChangedCallback(name: string) {
    if (!this.root.innerHTML) return;

    if (name === "href") {
      const link = this.root.querySelector<HTMLAnchorElement>(".badge");
      if (link) link.href = sanitizeHref(this.getAttribute("href") || DEFAULT_HREF);
    }
  }

  private async start() {
    await this.nextFrame();
    if (this.destroyed) return;

    this.badgeEl.dataset.ready = "true";
    this.setStage("idle");

    await this.nextFrame();
    if (this.destroyed) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.setStage("settled");
      this.setIconState("translateY(0) scale(1)", "1");
      return;
    }

    this.setStage("settled");
    this.setIconState("translateY(8px) scale(0.94)", "0");
    this.anim(this.iconSvg, [...KEYFRAMES.iconEntrance], {
      duration: 460,
      easing: ICON_EASING,
      fill: "forwards",
    });
  }

  private render() {
    const href = sanitizeHref(this.getAttribute("href") || DEFAULT_HREF);

    this.root.innerHTML = `
      <style>${STYLES}</style>
      <footer class="footer">
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
            <span class="copy-track">${WORDMARK}</span>
          </span>
          <span class="icon-wrap" aria-hidden="true">
            ${LOGO_ICON}
          </span>
        </a>
      </footer>
    `;

    this.badgeEl = this.root.querySelector(".badge")!;
    this.iconSvg = this.root.querySelector(".icon-wrap svg")!;
  }

  private bindInteractions() {
    const onEnter = () => this.enterHoverState();
    const onLeave = () => this.leaveHoverState();
    const onFocusIn = () => this.enterHoverState();
    const onFocusOut = () => {
      const active = this.root.activeElement;
      if (!active || !this.badgeEl.contains(active)) this.leaveHoverState();
    };

    this.badgeEl.addEventListener("mouseenter", onEnter);
    this.badgeEl.addEventListener("mouseleave", onLeave);
    this.badgeEl.addEventListener("focusin", onFocusIn);
    this.badgeEl.addEventListener("focusout", onFocusOut);

    this.cleanupFns.push(() => {
      this.badgeEl.removeEventListener("mouseenter", onEnter);
      this.badgeEl.removeEventListener("mouseleave", onLeave);
      this.badgeEl.removeEventListener("focusin", onFocusIn);
      this.badgeEl.removeEventListener("focusout", onFocusOut);
    });
  }

  private enterHoverState() {
    if (this.destroyed) return;

    this.cancelAnimations();
    this.setStage("hover");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.setIconState("translateY(0) scale(1)", "1");
      return;
    }

    this.setIconState("translateY(0) scale(1)", "1");
    this.anim(this.iconSvg, [...KEYFRAMES.iconHover], {
      duration: 220,
      easing: ICON_EASING,
      fill: "forwards",
    });
  }

  private leaveHoverState() {
    if (this.destroyed) return;

    const active = this.root.activeElement;
    if (active && this.badgeEl.contains(active)) return;

    this.cancelAnimations();
    this.setStage("settled");
    this.setIconState("translateY(0) scale(1)", "1");
  }

  private setStage(stage: BadgeStage) {
    this.badgeEl.dataset.stage = stage;
  }

  private setIconState(transform: string, opacity: string) {
    this.iconSvg.style.transform = transform;
    this.iconSvg.style.opacity = opacity;
  }

  private cancelAnimations() {
    this.activeAnimations.forEach((animation) => animation.cancel());
    this.activeAnimations.clear();
  }

  private anim(el: Element, keyframes: Keyframe[], options: KeyframeAnimationOptions): Animation {
    const animation = el.animate(keyframes, options);
    this.activeAnimations.add(animation);
    animation.finished
      .then(() => this.activeAnimations.delete(animation))
      .catch(() => this.activeAnimations.delete(animation));
    return animation;
  }

  private nextFrame(): Promise<void> {
    return new Promise((resolve) => {
      const id = window.requestAnimationFrame(() => {
        this.pendingFrames.delete(id);
        resolve();
      });

      this.pendingFrames.add(id);
    });
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
