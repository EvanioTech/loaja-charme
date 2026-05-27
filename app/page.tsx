import { Header } from "@/components/Header";
import Carrossel from "@/components/Carrossel";
import { Products } from "@/components/Products";
import { Contact } from "@/components/Contact";
import { About } from "@/components/About";
import { WppButton } from "@/components/WppButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#ffe2ec_0%,#ffc5d3_42%,#f29db4_100%)]">
      <Header />

      <section id="inicio" className="mt-4 px-4 pt-24 sm:px-6 lg:px-8">
        <p className="mx-auto max-w-4xl text-center  text-sm leading-7 text-black/30 sm:text-base">
          Bem-vinda à Charme Chicc ✨
Onde elegância, estilo e sofisticação se encontram. Descubra peças exclusivas que valorizam sua beleza e elevam sua confiança em cada detalhe. Nossa coleção foi pensada para mulheres modernas que amam conforto sem abrir mão da tendência.
Vista-se de charme, brilhe com autenticidade 💖
        </p>
        <Carrossel options={{ loop: true }} />

      </section>
      <section id="produtos">
        <h2 className="text-white text-center text-2xl mt-8">Produtos</h2>
        <Products />
      </section>
      <section id="sobre">
        <h2 className="text-white text-center text-2xl mt-8">Sobre</h2>
        <About />
      </section>
      <section id="contato">
        <h2 className="text-white text-center text-2xl mt-8">Contato</h2>
        <Contact />
      </section>
      <WppButton />
    </main>
  );
}