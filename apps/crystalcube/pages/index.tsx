import { Button } from "ui";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import { AlgSetViewer } from "../components/algs/AlgSetViewer";
import { TwoLookOLL } from "../cube/algs/3x3/2L-OLL";

export default function App() {
  return (
    <ChakraProvider>
      <AlgSetViewer algSet={TwoLookOLL} />
    </ChakraProvider>
  );
}
