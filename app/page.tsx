import { Header } from "@/components/Header";
import Carrossel from "@/components/Carrossel";
import { Products } from "@/components/Products";
import { Contact } from "@/components/Contact";
import { About } from "@/components/About";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#ffe2ec_0%,#ffc5d3_42%,#f29db4_100%)]">
      <Header />

      <section id="inicio" className="mt-4 px-4 pt-24 sm:px-6 lg:px-8">
        <p className="mx-auto max-w-4xl text-center  text-sm leading-7 text-black/30 sm:text-base">
          Seja Bem vindo ao Charme Chicc, onde a elegância encontra a sofisticação. Descubra uma coleção exclusiva de roupas e acessórios que combinam estilo e conforto para realçar sua beleza única. Explore nossas últimas tendências e encontre peças que refletem sua personalidade. Charme Chicc - onde cada detalhe é pensado para você brilhar.
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
    </main>
  );
}