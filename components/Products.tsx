import Image from "next/image";


export function Products() {
  return (
    <div className="mt-10">
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <article className="bg-white rounded-2xl p-4 h-100 relative">
          <Image
            src="/produtos/i1.webp"
            alt="Produto Charme Chicc 1"
            width={400}
            height={400}
            className="object-cover rounded-2xl w-full h-full"
          />
          <p className="absolute bottom-6 left-6 bg-black/50 text-white font-bold px-2 py-1 rounded-lg ">Vestido</p>
          <p className="absolute bottom-6 right-6 bg-black/50 text-white px-2 py-1 rounded-lg font-bold">45,00</p>
        </article>

        <article className="bg-white rounded-2xl p-4 h-100 relative">
          <Image
            src="/produtos/i2.webp"
            alt="Produto Charme Chicc 2"
            width={400}
            height={400}
            className="object-cover rounded-2xl w-full h-full"
          />
          <p className="absolute bottom-6 left-6 bg-black/50 text-white font-bold px-2 py-1 rounded-lg ">Vestido</p>
          <p className="absolute bottom-6 right-6 bg-black/50 text-white px-2 py-1 rounded-lg font-bold">45,00</p>
        </article>

        <article className="bg-white rounded-2xl p-4 h-100 relative">
          <Image
            src="/produtos/i3.webp"
            alt="Produto Charme Chicc 3"
            width={400}
            height={400}
            className="object-cover rounded-2xl w-full h-full"
          />
          <p className="absolute bottom-6 left-6 bg-black/50 text-white font-bold px-2 py-1 rounded-lg ">Vestido</p>
          <p className="absolute bottom-6 right-6 bg-black/50 text-white px-2 py-1 rounded-lg font-bold">45,00</p>
        </article>
        <article className="bg-white rounded-2xl p-4 h-100 relative">
          <Image
            src="/produtos/i4.webp"
            alt="Produto Charme Chicc 4"
            width={400}
            height={400}
            className="object-cover rounded-2xl w-full h-full"
          />
          <p className="absolute bottom-6 left-6 bg-black/50 text-white font-bold px-2 py-1 rounded-lg ">Vestido</p>
          <p className="absolute bottom-6 right-6 bg-black/50 text-white px-2 py-1 rounded-lg font-bold">45,00</p>  
        </article>
        <article className="bg-white rounded-2xl p-4 h-100 relative">
          <Image
            src="/produtos/i5.webp"
            alt="Produto Charme Chicc 5"
            width={400}
            height={400}
            className="object-cover rounded-2xl w-full h-full"
          />
          <p className="absolute bottom-6 left-6 bg-black/50 text-white font-bold px-2 py-1 rounded-lg ">Vestido</p>
          <p className="absolute bottom-6 right-6 bg-black/50 text-white px-2 py-1 rounded-lg font-bold">45,00</p>
        </article>
        
        <article className="bg-white rounded-2xl p-4 h-100 relative">
          <Image
            src="/produtos/i6.webp"
            alt="Produto Charme Chicc 6"
            width={400}
            height={400}
            className="object-cover rounded-2xl w-full h-full"
          />
          <p className="absolute bottom-6 left-6 bg-black/50 text-white font-bold px-2 py-1 rounded-lg ">Vestido</p>
          <p className="absolute bottom-6 right-6 bg-black/50 text-white px-2 py-1 rounded-lg font-bold">45,00</p>
        
        </article>

      </div>
    </div>
  );
}