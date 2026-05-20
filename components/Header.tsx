export function Header() {
  return (
    <header className="w-full p-4 fixed top-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 shadow-md z-10">
      <nav className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">
            <a href="#inicio">Charme Chicc</a>
          
        </h1>

        <ul className="flex gap-4 text-white">
          

          <li>
            <a href="#produtos">Produtos</a>
          </li>

          <li>
            <a href="#sobre">Sobre</a>
          </li>

          <li>
            <a href="#contato">Contato</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}