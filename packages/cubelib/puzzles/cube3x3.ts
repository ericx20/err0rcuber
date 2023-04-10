// idea: implement CubieCube
// then implement FaceletCube
// later on we can see which is more performant for solvers

// TODO: move all the puzzle-specific stuff
// into a config, rather than all baked into the class itself
// the abstract base class would load the config
// and then you can sprinkle extra puzzle-specific methods
// on top if you wish.

import type { Puzzle } from "./puzzle"

const CUBE_3x3_MOVES = [
    "R", "R'", "R2",
    "L", "L'", "L2",
    "U", "U'", "U2",
    "D", "D'", "D2",
    "F", "F'", "F2",
    "B", "B'", "B2",
    // add more later, split into components
    // to make it easier to form movesets
] as const;

type Cube3x3Move = typeof CUBE_3x3_MOVES[number];

interface Cube3x3State {
    eo: Array<number>; // edge orientation
    ep: Array<number>; // edge permutation
    co: Array<number>; // corner orientation
    cp: Array<number>; // corner permutation
    tp: Array<number>; // center permutation
    // TODO: bandaged 3x3
    // https://github.com/cubing/ksolve/blob/main/source/blocks.h
}

const SOLVED_STATE: Readonly<Cube3x3State> = {
    eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ep: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    co: [0, 0, 0, 0, 0, 0, 0, 0],
    cp: [0, 1, 2, 3, 4, 5, 6, 7],
    tp: [0, 1, 2, 3, 4, 5],
}

class Cube3x3 implements Puzzle<Cube3x3Move, Cube3x3State> {
    private cubeState: Cube3x3State;

    constructor(state: Cube3x3State = SOLVED_STATE) {
        // CAVEAT: if SOLVED_STATE contains any nested data,
        // you must do a proper deep clone
        this.cubeState = { ...state }
    }
    
    apply(move: Cube3x3Move | Array<Cube3x3Move>) {
        
        return this;
    }

    get availableMoves(): typeof CUBE_3x3_MOVES {
        return CUBE_3x3_MOVES;
    }

    get state(): Cube3x3State {
        return this.cubeState;
    }
}

export {}
// TODO: export a 3x3-specific solver
// which has 3x3-specific methods
// and calls a generic puzzle solver with the correct details

// https://github.com/cubing/ksolve has info about bandaging in ksolve definition
// twsearch doesn't support it unfortunately

// TEMP, copied from cubing.js
export const cube3x3x3KPuzzleDefinition = {
    name: "3x3x3",
    orbits: {
      EDGES: { numPieces: 12, numOrientations: 2 },
      CORNERS: { numPieces: 8, numOrientations: 3 },
      CENTERS: { numPieces: 6, numOrientations: 4 },
    },
    startStateData: {
      EDGES: {
        pieces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        orientation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      CORNERS: {
        pieces: [0, 1, 2, 3, 4, 5, 6, 7],
        orientation: [0, 0, 0, 0, 0, 0, 0, 0],
      },
      CENTERS: {
        pieces: [0, 1, 2, 3, 4, 5],
        orientation: [0, 0, 0, 0, 0, 0],
      },
    },
    moves: {
      U: {
        EDGES: {
          permutation: [1, 2, 3, 0, 4, 5, 6, 7, 8, 9, 10, 11],
          orientation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        CORNERS: {
          permutation: [1, 2, 3, 0, 4, 5, 6, 7],
          orientation: [0, 0, 0, 0, 0, 0, 0, 0],
        },
        CENTERS: {
          permutation: [0, 1, 2, 3, 4, 5],
          orientation: [1, 0, 0, 0, 0, 0],
        },
      },
      y: {
        EDGES: {
          permutation: [1, 2, 3, 0, 5, 6, 7, 4, 10, 8, 11, 9],
          orientation: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        },
        CORNERS: {
          permutation: [1, 2, 3, 0, 7, 4, 5, 6],
          orientation: [0, 0, 0, 0, 0, 0, 0, 0],
        },
        CENTERS: {
          permutation: [0, 2, 3, 4, 1, 5],
          orientation: [1, 0, 0, 0, 0, 3],
        },
      },
      x: {
        EDGES: {
          permutation: [4, 8, 0, 9, 6, 10, 2, 11, 5, 7, 1, 3],
          orientation: [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        },
        CORNERS: {
          permutation: [4, 0, 3, 5, 7, 6, 2, 1],
          orientation: [2, 1, 2, 1, 1, 2, 1, 2],
        },
        CENTERS: {
          permutation: [2, 1, 5, 3, 0, 4],
          orientation: [0, 3, 0, 1, 2, 2],
        },
      },
      L: {
        EDGES: {
          permutation: [0, 1, 2, 11, 4, 5, 6, 9, 8, 3, 10, 7],
          orientation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        CORNERS: {
          permutation: [0, 1, 6, 2, 4, 3, 5, 7],
          orientation: [0, 0, 2, 1, 0, 2, 1, 0],
        },
        CENTERS: {
          permutation: [0, 1, 2, 3, 4, 5],
          orientation: [0, 1, 0, 0, 0, 0],
        },
      },
      F: {
        EDGES: {
          permutation: [9, 1, 2, 3, 8, 5, 6, 7, 0, 4, 10, 11],
          orientation: [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0],
        },
        CORNERS: {
          permutation: [3, 1, 2, 5, 0, 4, 6, 7],
          orientation: [1, 0, 0, 2, 2, 1, 0, 0],
        },
        CENTERS: {
          permutation: [0, 1, 2, 3, 4, 5],
          orientation: [0, 0, 1, 0, 0, 0],
        },
      },
      R: {
        EDGES: {
          permutation: [0, 8, 2, 3, 4, 10, 6, 7, 5, 9, 1, 11],
          orientation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        CORNERS: {
          permutation: [4, 0, 2, 3, 7, 5, 6, 1],
          orientation: [2, 1, 0, 0, 1, 0, 0, 2],
        },
        CENTERS: {
          permutation: [0, 1, 2, 3, 4, 5],
          orientation: [0, 0, 0, 1, 0, 0],
        },
      },
      B: {
        EDGES: {
          permutation: [0, 1, 10, 3, 4, 5, 11, 7, 8, 9, 6, 2],
          orientation: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
        },
        CORNERS: {
          permutation: [0, 7, 1, 3, 4, 5, 2, 6],
          orientation: [0, 2, 1, 0, 0, 0, 2, 1],
        },
        CENTERS: {
          permutation: [0, 1, 2, 3, 4, 5],
          orientation: [0, 0, 0, 0, 1, 0],
        },
      },
      D: {
        EDGES: {
          permutation: [0, 1, 2, 3, 7, 4, 5, 6, 8, 9, 10, 11],
          orientation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        CORNERS: {
          permutation: [0, 1, 2, 3, 5, 6, 7, 4],
          orientation: [0, 0, 0, 0, 0, 0, 0, 0],
        },
        CENTERS: {
          permutation: [0, 1, 2, 3, 4, 5],
          orientation: [0, 0, 0, 0, 0, 1],
        },
      },
      z: {
        EDGES: {
          permutation: [9, 3, 11, 7, 8, 1, 10, 5, 0, 4, 2, 6],
          orientation: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        CORNERS: {
          permutation: [3, 2, 6, 5, 0, 4, 7, 1],
          orientation: [1, 2, 1, 2, 2, 1, 2, 1],
        },
        CENTERS: {
          permutation: [1, 5, 2, 0, 4, 3],
          orientation: [1, 1, 1, 1, 3, 1],
        },
      },
      M: {
        EDGES: {
          permutation: [2, 1, 6, 3, 0, 5, 4, 7, 8, 9, 10, 11],
          orientation: [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        },
        CORNERS: {
          permutation: [0, 1, 2, 3, 4, 5, 6, 7],
          orientation: [0, 0, 0, 0, 0, 0, 0, 0],
        },
        CENTERS: {
          permutation: [4, 1, 0, 3, 5, 2],
          orientation: [2, 0, 0, 0, 2, 0],
        },
      },
      E: {
        EDGES: {
          permutation: [0, 1, 2, 3, 4, 5, 6, 7, 9, 11, 8, 10],
          orientation: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        },
        CORNERS: {
          permutation: [0, 1, 2, 3, 4, 5, 6, 7],
          orientation: [0, 0, 0, 0, 0, 0, 0, 0],
        },
        CENTERS: {
          permutation: [0, 4, 1, 2, 3, 5],
          orientation: [0, 0, 0, 0, 0, 0],
        },
      },
      S: {
        EDGES: {
          permutation: [0, 3, 2, 7, 4, 1, 6, 5, 8, 9, 10, 11],
          orientation: [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
        },
        CORNERS: {
          permutation: [0, 1, 2, 3, 4, 5, 6, 7],
          orientation: [0, 0, 0, 0, 0, 0, 0, 0],
        },
        CENTERS: {
          permutation: [1, 5, 2, 0, 4, 3],
          orientation: [1, 1, 0, 1, 0, 1],
        },
      },
      u: {
        EDGES: {
          permutation: [1, 2, 3, 0, 4, 5, 6, 7, 10, 8, 11, 9],
          orientation: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        },
        CORNERS: {
          permutation: [1, 2, 3, 0, 4, 5, 6, 7],
          orientation: [0, 0, 0, 0, 0, 0, 0, 0],
        },
        CENTERS: {
          permutation: [0, 2, 3, 4, 1, 5],
          orientation: [1, 0, 0, 0, 0, 0],
        },
      },
      l: {
        EDGES: {
          permutation: [2, 1, 6, 11, 0, 5, 4, 9, 8, 3, 10, 7],
          orientation: [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        },
        CORNERS: {
          permutation: [0, 1, 6, 2, 4, 3, 5, 7],
          orientation: [0, 0, 2, 1, 0, 2, 1, 0],
        },
        CENTERS: {
          permutation: [4, 1, 0, 3, 5, 2],
          orientation: [2, 1, 0, 0, 2, 0],
        },
      },
      f: {
        EDGES: {
          permutation: [9, 3, 2, 7, 8, 1, 6, 5, 0, 4, 10, 11],
          orientation: [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
        },
        CORNERS: {
          permutation: [3, 1, 2, 5, 0, 4, 6, 7],
          orientation: [1, 0, 0, 2, 2, 1, 0, 0],
        },
        CENTERS: {
          permutation: [1, 5, 2, 0, 4, 3],
          orientation: [1, 1, 1, 1, 0, 1],
        },
      },
      r: {
        EDGES: {
          permutation: [4, 8, 0, 3, 6, 10, 2, 7, 5, 9, 1, 11],
          orientation: [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        },
        CORNERS: {
          permutation: [4, 0, 2, 3, 7, 5, 6, 1],
          orientation: [2, 1, 0, 0, 1, 0, 0, 2],
        },
        CENTERS: {
          permutation: [2, 1, 5, 3, 0, 4],
          orientation: [0, 0, 0, 1, 2, 2],
        },
      },
      b: {
        EDGES: {
          permutation: [0, 5, 10, 1, 4, 7, 11, 3, 8, 9, 6, 2],
          orientation: [0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1],
        },
        CORNERS: {
          permutation: [0, 7, 1, 3, 4, 5, 2, 6],
          orientation: [0, 2, 1, 0, 0, 0, 2, 1],
        },
        CENTERS: {
          permutation: [3, 0, 2, 5, 4, 1],
          orientation: [3, 3, 0, 3, 1, 3],
        },
      },
      d: {
        EDGES: {
          permutation: [0, 1, 2, 3, 7, 4, 5, 6, 9, 11, 8, 10],
          orientation: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        },
        CORNERS: {
          permutation: [0, 1, 2, 3, 5, 6, 7, 4],
          orientation: [0, 0, 0, 0, 0, 0, 0, 0],
        },
        CENTERS: {
          permutation: [0, 4, 1, 2, 3, 5],
          orientation: [0, 0, 0, 0, 0, 1],
        },
      },
    },
    experimentalDerivedMoves: {
      Uw: "u",
      Lw: "l",
      Fw: "f",
      Rw: "r",
      Bw: "b",
      Dw: "d",
  
      Uv: "y",
      Lv: "x'",
      Fv: "z",
      Rv: "x",
      Bv: "z'",
      Dv: "y'",
  
      "2U": "u U'",
      "2L": "l L'",
      "2F": "f F'",
      "2R": "r R'",
      "2B": "b B'",
      "2D": "d D'",
    },
  };
  