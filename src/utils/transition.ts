import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * Performs a transition animation before navigation
 * This function animates the transition blocks to cover the screen,
 * then returns a promise that resolves when the animation completes.
 * Use this with router.push() for programmatic navigation.
 */
export async function performTransition(): Promise<void> {
  const blocks = document.querySelectorAll(".transition-block");
  
  // Reset blocks to initial state
  blocks.forEach((block) => {
    block.setAttribute("style", "visibility: visible; transform: scaleY(0);");
  });

  // Animate blocks to cover screen
  return new Promise<void>((resolve) => {
    gsap.to(blocks, {
      scaleY: 1,
      duration: 0.5,
      stagger: { each: 0.05, from: "start", grid: [2, 5] },
      ease: "power4.inOut",
      onComplete: resolve,
    });
  });
}

/**
 * Performs transition and navigates early for better perceived performance
 * Navigates when transition is 70% complete instead of waiting for 100%
 */
export async function performTransitionAndNavigate(
  router: AppRouterInstance,
  href: string
): Promise<void> {
  const transitionPromise = performTransition();
  
  // Navigate when transition is 70% complete for faster perceived performance
  setTimeout(() => {
    router.push(href);
  }, 350); // 70% of 500ms = 350ms
  
  await transitionPromise;
}

