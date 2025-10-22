import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <nav>
        <Link href="page/about">About으로 이동</Link> |
        <Link href="page/calendar">Calendar로 이동</Link>
      </nav>
    </main>
  );
}