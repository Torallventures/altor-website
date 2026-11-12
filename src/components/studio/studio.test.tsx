import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { StudioNav } from "./StudioChrome";
import { StudioContact } from "./StudioContact";
import Portfolio from "@/pages/Portfolio";

describe("Current studio interactions", () => {
  it("closes mobile navigation with Escape and restores focus", () => {
    render(
      <MemoryRouter>
        <StudioNav />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
    const toggle = screen.getByRole("button", { name: "Close navigation" });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(toggle, { key: "Escape" });
    expect(screen.getByRole("button", { name: "Open navigation" })).toHaveFocus();
    expect(screen.getByRole("button", { name: "Open navigation" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
  it("opens a URL-backed portfolio perspective and supports arrow-key navigation", () => {
    render(
      <MemoryRouter initialEntries={["/portfolio?view=residents"]}>
        <Portfolio />
      </MemoryRouter>,
    );
    const residents = screen.getByRole("tab", { name: "Everyday living" });
    expect(residents).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(residents, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "Behind the scenes" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("A clearer view of the details.");
    expect(screen.getByRole("link", { name: "Open the interactive demo" })).toHaveAttribute(
      "href",
      "/lumeratm",
    );
  });
  it("validates contact details and prepares an email without claiming it was sent", () => {
    render(
      <MemoryRouter initialEntries={["/contact?service=business-websites"]}>
        <StudioContact />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Prepare project email" }));
    expect(screen.getByLabelText("Your name")).toHaveFocus();
    expect(screen.getAllByRole("alert")).toHaveLength(3);
    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Preview Reviewer" } });
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "reviewer@example.com" },
    });
    fireEvent.change(screen.getByLabelText("A little about your project"), {
      target: { value: "Preview-only interaction verification." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Prepare project email" }));
    expect(screen.getByRole("heading", { name: "Your introduction is ready." })).toHaveFocus();
    expect(screen.getByText(/Nothing has been sent yet/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open email app" }).getAttribute("href")).toContain(
      "Business%20Websites",
    );
    fireEvent.click(screen.getByRole("button", { name: "Edit your details" }));
    expect(screen.getByLabelText("Your name")).toHaveValue("Preview Reviewer");
  });
});
