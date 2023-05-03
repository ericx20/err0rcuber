import Link from "next/link";

export default function () {
  return (
    <div>
      <h1>
        <Link href="/">crystalcube!!!</Link>
      </h1>
      <ul>
        <li>
          <Link href="/algs">Algs</Link>
        </li>
      </ul>
    </div>
  );
}
