import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import type { SingleAlgSet } from "../../cube/algs";
import { AlgCaseViewer } from "./AlgCaseViewer";

export interface SingleAlgSetViewerProps {
  algSet: SingleAlgSet;
}

export const SingleAlgSetViewer = ({ algSet }: SingleAlgSetViewerProps) => {
  return (
    <>
      <Heading size="lg">{algSet.name}</Heading>
      <Text>{algSet.description}</Text>
      <SimpleGrid minChildWidth={400} spacing={10}>
        {algSet.cases.map((algCase) => (
          <AlgCaseViewer
            algCase={algCase}
            puzzle={algSet.puzzle}
            stage={algSet.stage}
          />
        ))}
      </SimpleGrid>
    </>
  );
};
