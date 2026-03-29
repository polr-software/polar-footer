import {
  DEFAULT_HREF,
  ICON_ANIMATION_EASING,
  KEYFRAMES,
  POLAR_ELEMENT_BASE,
  sanitizeHref,
} from "./polr-brand-badge";

type BadgeStage = "idle" | "settled" | "hover";

export abstract class PolrAnimatedBadgeElement extends POLAR_ELEMENT_BASE {
  private root: ShadowRoot;
  private badgeEl!: HTMLAnchorElement;
  private iconStageEl!: HTMLElement;
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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.setStage("settled");
      this.setIconState("translateY(0) scale(1)", "1");
      return;
    }

    this.setStage("settled");
    this.setIconState("translateY(8px) scale(0.94)", "0");
    this.anim(this.iconStageEl, [...KEYFRAMES.iconEntrance], {
      duration: 460,
      easing: ICON_ANIMATION_EASING,
      fill: "forwards",
    });
  }

  private render() {
    const href = sanitizeHref(this.getAttribute("href") || DEFAULT_HREF);

    this.root.innerHTML = this.renderTemplate(href);
    this.badgeEl = this.root.querySelector(".badge")!;
    this.iconStageEl = this.root.querySelector(".icon-stage")!;
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

    this.cancelAnimations();
    this.setStage("hover");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.setIconState("translateY(0) scale(1)", "1");
      return;
    }

    this.setIconState("translateY(0) scale(1)", "1");
    this.anim(this.iconStageEl, [...KEYFRAMES.iconHover], {
      duration: 220,
      easing: ICON_ANIMATION_EASING,
      fill: "forwards",
    });
  }

  private leaveHoverState() {
    if (this.destroyed) return;

    const active = this.root.activeElement;
    if (active && this.badgeEl.contains(active)) {
      return;
    }

    this.cancelAnimations();
    this.setStage("settled");
    this.setIconState("translateY(0) scale(1)", "1");
  }

  private setStage(stage: BadgeStage) {
    this.badgeEl.dataset.stage = stage;
  }

  private setIconState(transform: string, opacity: string) {
    this.iconStageEl.style.transform = transform;
    this.iconStageEl.style.opacity = opacity;
  }

  private cancelAnimations() {
    this.activeAnimations.forEach((animation) => animation.cancel());
    this.activeAnimations.clear();
  }

  private anim(
    element: Element,
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions,
  ): Animation {
    const animation = element.animate(keyframes, options);
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
