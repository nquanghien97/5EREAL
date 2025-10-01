import FadeIn from '@/components/framer-motion/FadeIn'
import Image from 'next/image'
import React from 'react'

function ThanhTuu() {
  return (
    <FadeIn>
      <section className="py-8">
        <h2 className="text-3xl md:text-5xl font-bold text-[#0F3E5A] mb-4 text-center">THÀNH TỰU</h2>
        <div className="max-w-7xl m-auto px-4 mb-8">
          <div className="flex justify-around flex-col md:flex-row gap-4">
            <div className="flex flex-col items-center">
              <Image src="/thanh-tuu-1.png" alt="thanh-tuu-1" width={300} height={200} className="object-cover rounded-2xl mb-4" />
              <div className="flex items-end flex-1 justify-center">
                <p className="font-bold text-[#d2a932] text-xl text-center">2020 - Giải vàng BĐS</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Image src="/thanh-tuu-2.png" alt="thanh-tuu-2" width={300} height={200} className="object-cover rounded-2xl mb-4" />
              <div className="flex items-end flex-1 justify-center">
                <p className="font-bold text-[#d2a932] text-xl text-center">2020 - Giải vàng BĐS</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Image src="/thanh-tuu-3.png" alt="thanh-tuu-3" width={300} height={200} className="object-cover rounded-2xl mb-4" />
              <div className="flex items-end flex-1 justify-center">
                <p className="font-bold text-[#d2a932] text-xl text-center">2020 - Giải vàng BĐS</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Image src="/thanh-tuu-4.png" alt="thanh-tuu-4" width={300} height={200} className="object-cover rounded-2xl mb-4" />
              <div className="flex items-end flex-1 justify-center">
                <p className="font-bold text-[#d2a932] text-xl text-center">2020 - Giải vàng BĐS</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Image src="/thanh-tuu-1.png" alt="thanh-tuu-1" width={300} height={200} className="object-cover rounded-2xl mb-4" />
              <div className="flex items-end flex-1 justify-center">
                <p className="font-bold text-[#d2a932] text-xl text-center">2020 - Giải vàng BĐS</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  )
}

export default ThanhTuu