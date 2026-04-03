import { PolrFooterElement, registerPolrFooter } from "./polar-footer";
import { PolrLogoElement, registerPolrLogo } from "./polar-logo";

export {
  POLAR_FOOTER_TAG_NAME,
  POLAR_FOOTER_VARIANTS,
  PolrFooterElement,
  registerPolrFooter,
  type PolrFooterTheme,
  type PolrFooterVariant,
} from "./polar-footer";
export {
  POLAR_LOGO_TAG_NAME,
  POLAR_LOGO_VARIANTS,
  PolrLogoElement,
  registerPolrLogo,
  type PolrLogoTheme,
  type PolrLogoVariant,
} from "./polar-logo";

registerPolrFooter();
registerPolrLogo();

declare global {
  interface HTMLElementTagNameMap {
    "polar-footer": PolrFooterElement;
    "polar-logo": PolrLogoElement;
  }
}
