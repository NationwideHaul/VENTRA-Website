/**
 * Tiny decoupled bus so the hero buttons and the sticky mobile bar can ask the
 * forms island to switch tabs, without threading state through the server page.
 * A CTA dispatches `grace:selectTab`; GraceForms listens and selects the tab.
 * The CTAs are plain `#grace-forms` anchors, so the global Lenis handler still
 * owns the smooth-scroll (we never call preventDefault).
 */

export type GraceTab = "review" | "contact";

export const GRACE_FORMS_ID = "grace-forms";
export const GRACE_TAB_EVENT = "grace:selectTab";

export function requestGraceTab(tab: GraceTab) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<GraceTab>(GRACE_TAB_EVENT, { detail: tab }),
  );
}
