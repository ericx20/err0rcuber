interface AlgSheet {
  name: string;
  description?: string;
  puzzle: PuzzleName;
  stage: string; // e.g. OLL
  cases: Array<Case>;
}

type PuzzleName = "3x3x3" | "megaminx";

interface Case {
  name: string;
  display: string;
  categories?: Array<string>;
  solutions: Array<Solution>;
  probabilityWeight?: number;
}

interface Solution {
  alg: string;
  tags?: Array<string>;
  preAdjust?: string;
  postAdjust?: string;
}

export type { AlgSheet, PuzzleName, Case, Solution };
