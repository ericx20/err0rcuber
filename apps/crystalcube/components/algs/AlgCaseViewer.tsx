import { Card, CardBody, Text } from "@chakra-ui/react";
import type { AlgCase, PuzzleName } from "../../cube/algs";
import { TwistyPlayer } from "../TwistyPlayer";

export interface AlgCaseViewerProps {
  algCase: AlgCase;
  puzzle: PuzzleName;
  stage: string;
}

export function AlgCaseViewer({ algCase, puzzle, stage }: AlgCaseViewerProps) {
  const visualization = stageIsLastLayer(stage) ? "experimental-2D-LL" : "3D";
  return (
    <Card>
      <CardBody>
        <Text>{algCase.name}</Text>
        <TwistyPlayer
          alg={algCase.display}
          puzzle={puzzle}
          experimentalSetupAnchor="end"
          experimentalStickering={stage}
          background="none"
          controlPanel="none"
          visualization={visualization}
        />
        <ul>
          {algCase.solutions.map((sol) => (
            <li>
              {sol.preAdjust ? `(${sol.preAdjust}) ` : ""}
              {sol.alg}
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}

function stageIsLastLayer(stage: string) {
  const lastLayerStages: Record<string, true> = {
    OLL: true,
    PLL: true,
    LL: true,
    EOLL: true,
    COLL: true,
    OCLL: true,
    CPLL: true,
    CLL: true,
    EPLL: true,
    ELL: true,
    ZBLL: true,
  };
  return !!lastLayerStages[stage];
}
