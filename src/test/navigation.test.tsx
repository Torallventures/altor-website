import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Navbar } from "@/sections/Navbar";

describe("Navbar", () => {
  it("renders the Services tab and core links, with no Home link", () => {
    render(
      <MemoryRouter initialEntries={["/services"]}>
        <Navbar />
      </MemoryRouter>
    );

    for (const label of ["Services", "Portfolio", "About", "Contact"]) {
      expect(screen.getAllByRole("link", { name: label }).length).toBeGreaterThan(0);
    }
    expect(screen.queryByRole("link", { name: "Home" })).toBeNull();
  });

  it("makes the logo the link back home", () => {
    render(
      <MemoryRouter initialEntries={["/portfolio"]}>
        <Navbar />
      </MemoryRouter>
    );

    const logo = screen.getByRole("link", { name: /torall ventures — home/i });
    expect(logo).toHaveAttribute("href", "/");
  });
});
