import { expect, it, vi } from "vitest";

import { scrollToCurrentRoadmapModule } from "@/campusly/roadmapNavigation";

it("scrolls the current roadmap module into the middle of the screen", () => {
  document.body.innerHTML = `
    <div class="roadmap-module-map">
      <div class="roadmap-module-item journey-completed" data-module-id="2"></div>
      <div class="roadmap-module-item journey-current" data-module-id="3"></div>
      <div class="roadmap-module-item journey-available" data-module-id="4"></div>
    </div>
  `;
  const currentModule = document.querySelector('[data-module-id="3"]') as HTMLElement;
  const scrollIntoView = vi.fn();
  currentModule.scrollIntoView = scrollIntoView;

  expect(scrollToCurrentRoadmapModule({ behavior: "instant" })).toBe(true);
  expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "instant", block: "center" });
});
