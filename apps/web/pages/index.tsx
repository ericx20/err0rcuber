import { Button } from "ui";
import { add } from "cubelib";

export default function Web() {
  return (
    <div>
      <h1>Web</h1>
      <p>{ add(1, 2) }</p>
      <Button />
    </div>
  );
}
