/** Approved Concept 08. Keep these coordinates in sync with the identity master. */
export const OPEN_CONTOUR_PATHS = [
  { d: "M31 51H127C152 51 162 66 150 88L113 151C104 169 94 169 86 151L59 102", width: 14 },
  { d: "M87 52V105", width: 12 },
] as const;

/** Original outlined lettering: shared rounded turns, open apex and oblique R leg. */
export const WORDMARK_GLYPHS: Record<string, string> = {
  T: "M2 2H34M18 2V42",
  O: "M18 2C8 2 3 7 3 17V27C3 37 8 42 18 42C28 42 33 37 33 27V17C33 7 28 2 18 2Z",
  R: "M3 42V2H19C29 2 33 7 33 14C33 22 27 26 18 26H3M18 26L34 42",
  A: "M2 42L14 7Q18 -3 22 7L34 42M8 28H28",
  L: "M3 2V36Q3 42 9 42H33",
  V: "M2 2L13 34Q18 49 23 34L34 2",
  E: "M32 2H9Q3 2 3 8V36Q3 42 9 42H32M3 22H27",
  N: "M3 42V2L33 42V2",
  U: "M3 2V27Q3 42 18 42Q33 42 33 27V2",
  S: "M33 7Q27 2 18 2Q3 2 3 12Q3 22 18 22Q33 22 33 32Q33 42 18 42Q8 42 3 36",
};

export const PRIMARY_WORD = "TORALL";
export const SECONDARY_WORD = "VENTURES";
