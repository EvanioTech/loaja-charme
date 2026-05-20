import { Header } from "@/components/Header";
import { Carrossel } from "@/components/Carrossel";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <Header />

      <section id="inicio" className="mt-4 pt-25 sm:p-18 px-4">
        <p className="text-white text-center text-sm sm:text-base  text-lg lg:px-30">
          Seja Bem vindo ao Charme Chicc, onde a elegância encontra a sofisticação. Descubra uma coleção exclusiva de roupas e acessórios que combinam estilo e conforto para realçar sua beleza única. Explore nossas últimas tendências e encontre peças que refletem sua personalidade. Charme Chicc - onde cada detalhe é pensado para você brilhar.
        </p>
        <Carrossel />

      </section>
      <section id="produtos">
        <h2 className="text-white text-center text-2xl mt-8">Produtos</h2>
        {/* Adicione aqui a seção de produtos */}
        <p className="text-white text-center  text-sm sm:text-base text-lg lg:px-30">
          
        </p>
      </section>
      <section id="sobre">
        <h2 className="text-white text-center text-2xl mt-8">Sobre</h2>
        {/* Adicione aqui a seção sobre */}
      </section>
      <section id="contato">
        <h2 className="text-white text-center text-2xl mt-8">Contato</h2>
        {/* Adicione aqui a seção de contato */}
      </section>
    </main>
  );
}