import Image from 'next/image'
import iconi from '../public/icons/iconi.gif'

export function Contact() {
  return (
    <div className="flex-row gap-4 mt-10 justify-center items-center flex pb-8">
      <span >
        
        <a href="https://www.instagram.com/charme_chicc/" target="_blank" rel="noopener noreferrer" className="text-white flex-row flex gap-4 items-center">
          <Image src={iconi} alt="Instagram" width={32} height={32} className='rounded-full' /> @charmechicc
        </a>
      </span>
    </div>
  )
}