import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "20px" }}>
      <h1>Home Page</h1>
      <p>Bienvenido a la página principal.</p>
      <p>
        Ir a la lista de <Link href="/blogs">blogs</Link>.
      </p>
    </main>
  );
}
