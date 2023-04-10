import { Button } from "ui";
import { ChakraProvider, Heading } from "@chakra-ui/react";

export default function App() {
  return (
    <ChakraProvider>
      <Heading>Hello world!</Heading>
    </ChakraProvider>
  );
}
