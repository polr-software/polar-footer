import {
  DEFAULT_HREF,
  POLAR_ELEMENT_BASE,
  sanitizeHref,
} from "./polr-brand-badge";

type BadgeStage = "idle" | "settled" | "hover";

export abstract class PolrAnimatedBadgeElement extends POLAR_ELEMENT_BASE {
  private root: ShadowRoot;
  private badgeEl!: HTMLAnchorElement;
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
  }

  attributeChangedCallback(name: string) {
    if (!this.root.innerHTML || name !== "href") {
      return;
    }

    this.badgeEl.href = sanitizeHref(this.getAttribute("href") || DEFAULT_HREF);
  }

  protected abstract renderTemplate(href: string): string;

  private async start() {
    await this.nextFrame();
    if (this.destroyed) return;

    this.badgeEl.dataset.ready = "true";
    this.setStage("idle");

    await this.nextFrame();
    if (this.destroyed) return;

    this.setStage("settled");
  }

  private render() {
    const href = sanitizeHref(this.getAttribute("href") || DEFAULT_HREF);

    this.root.innerHTML = this.renderTemplate(href);
    this.badgeEl = this.root.querySelector(".badge")!;
  }

  private bindInteractions() {
    const onEnter = () => this.enterHoverState();
    const onLeave = () => this.leaveHoverState();
    const onFocusIn = () => this.enterHoverState();
    const onFocusOut = () => {
      const active = this.root.activeElement;
      if (!active || !this.badgeEl.contains(active)) {
        this.leaveHoverState();
      }
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

    this.setStage("hover");
  }

  private leaveHoverState() {
    if (this.destroyed) return;

    const active = this.root.activeElement;
    if (active && this.badgeEl.contains(active)) {
      return;
    }

    this.setStage("settled");
  }

  private setStage(stage: BadgeStage) {
    this.badgeEl.dataset.stage = stage;
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
