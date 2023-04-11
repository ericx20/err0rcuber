import type { AlgSet } from "..";

// TODO: OCLL
export const TwoLookOLL: AlgSet = {
  name: "2 Look OLL",
  description: "hello world",
  sets: [
    {
      name: "OLL Step 1",
      description: "Twist the edges to form a cross on top",
      puzzle: "3x3x3",
      stage: "EOLL",
      cases: [
        {
          name: "Dot",
          display: "R U2 R2' F R F' U2 R' F R F'",
          solutions: [
            {
              alg: "R U2 R2' F R F' U2 R' F R F'",
            },
            {
              alg: "F R U R' U' F' f R U R' U' f'",
            },
          ],
        },
        {
          name: "Line",
          display: "F R U R' U' F'",
          solutions: [
            {
              alg: "F R U R' U' F'",
            },
          ],
        },
        {
          name: "Small L",
          display: "F U R U' R' F'",
          solutions: [
            {
              alg: "F U R U' R' F'",
            },
            {
              alg: "f R U R' U' f'",
              preAdjust: "U2",
            },
          ],
        },
      ],
    },
  ],
};
