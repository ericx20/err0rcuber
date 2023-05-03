interface SingleAlgSet {
  name: string;
  description?: string;
  puzzle: PuzzleName;
  stage: string; // e.g. OLL
  cases: Array<AlgCase>;
}

function isSingleAlgSet(algSet: AlgSet): algSet is SingleAlgSet {
  return "cases" in algSet;
}

type AlgSet =
  | SingleAlgSet
  | {
      name: string;
      description?: string;
      subsets: Array<AlgSet>;
    };

type PuzzleName = "3x3x3" | "megaminx";

interface AlgCase {
  name: string;
  display: string;
  categories?: Array<string>;
  solutions: Array<Solution>;
  probabilityWeight?: number;
}

interface Solution {
  alg: string;
  labels?: Array<string>;
  preAdjust?: string;
  postAdjust?: string;
  notes?: string;
}

export type { SingleAlgSet, AlgSet, PuzzleName, AlgCase, Solution };
export { isSingleAlgSet };
