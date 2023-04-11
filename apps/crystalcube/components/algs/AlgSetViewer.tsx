import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { AlgSet, isSingleAlgSet } from "../../cube/algs";
import { SingleAlgSetViewer } from "./SingleAlgSetViewer";

export interface AlgSetViewerProps {
  algSet: AlgSet;
}

export const AlgSetViewer = ({ algSet }: AlgSetViewerProps) => {
  if (isSingleAlgSet(algSet)) {
    // algSet is a single alg set
    return <SingleAlgSetViewer algSet={algSet} />;
  }

  return (
    <>
      <Heading>{algSet.name}</Heading>
      <p>{algSet.description}</p>
      <Tabs>
        <TabList>
          {algSet.sets.map((set) => (
            <Tab>{set.name}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {algSet.sets.map((set) => (
            <TabPanel>
              <AlgSetViewer algSet={set} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
};
