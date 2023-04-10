type Mask<S> = 3; // TODO

// M is move name, S is state
// TODO: refactor this into an abstract base class
// which will be able to enforce what the constructor's type will be
// as well as probably implement the ctor with deep state cloning by default?
// and will also have a static class inside for Move
interface Puzzle<M, S> {
    apply(move: M | M[]): this;
    get availableMoves(): Readonly<Array<M>>;
    get state(): Readonly<S>;
    toString: () => string;
    // TODO: deal with masks
}

export type { Puzzle };