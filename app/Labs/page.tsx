import Link from "next/link";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h2>Labs Index</h2>
     <ul>
        <li><Link href="/Labs/Lab1">Lab 1</Link></li>
        <li><Link href="/Labs/Lab2">Lab 2</Link></li>
        <li><Link href="/Labs/Lab3">Lab 3</Link></li>
        <li><Link href="/Labs/Lab4">Lab 4</Link></li>
      </ul>

      <h3 className="mt-4">Projects & Resources</h3>
      <ul>
        <li><Link href="/Account/Signin">Kambaz Application</Link></li>
        <li>
          <a
            href="https://github.com/venkat5456/kambaz-next-js"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repository (Kambaz + Labs)
          </a>
        </li>
      </ul>
    </div>
  );
}