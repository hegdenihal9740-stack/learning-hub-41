import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

import BottomNav from "@/campusly/BottomNav";

afterEach(() => {
  vi.unstubAllGlobals();
});

it("opens Study Materials from the bottom navigation", () => {
  vi.stubGlobal("requestAnimationFrame", vi.fn());
  const setPage = vi.fn();

  render(<BottomNav page="dashboard" setPage={setPage} onMore={vi.fn()} />);
  fireEvent.click(screen.getByRole("button", { name: "Study Materials" }));

  expect(setPage).toHaveBeenCalledWith("materials");
});

it("does not jump the Course page back to the top when it opens", () => {
  const raf = vi.fn();
  vi.stubGlobal("requestAnimationFrame", raf);
  const setPage = vi.fn();

  render(<BottomNav page="dashboard" setPage={setPage} onMore={vi.fn()} />);
  fireEvent.click(screen.getByRole("button", { name: /Course/ }));

  expect(setPage).toHaveBeenCalledWith("courses");
  expect(raf).not.toHaveBeenCalled();
});

it("returns to the current module when Course is tapped again", () => {
  document.body.innerHTML = '<div class="roadmap-module-item journey-current"></div>';
  const currentModule = document.querySelector(".journey-current") as HTMLElement;
  const scrollIntoView = vi.fn();
  currentModule.scrollIntoView = scrollIntoView;

  render(<BottomNav page="courses" setPage={vi.fn()} onMore={vi.fn()} />);
  fireEvent.click(screen.getByRole("button", { name: /Course/ }));

  expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "center" });
});
