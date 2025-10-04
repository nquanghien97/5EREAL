import React from 'react'
import Image from 'next/image'

function Banner({ bannerImage, title, description, style = 'primary' }: { bannerImage?: string, title?: string, description?: string[] | string, style?: 'primary' | 'secondary' }) {
  return (
    <section className="mb-8 z-0 relative">
      <Image src={bannerImage || "/banner-home.png"} alt="banner-home" width={1831} height={916} unoptimized className="w-full lg:max-h-[600px] object-cover" />
      <div className="absolute inset-0 lg:top-1/2 background-linear-blue" />
      <div className={`absolute lg:left-[10%] bottom-[10%] text-white ${style === 'secondary' && 'flex flex-col lg:flex-row lg:gap-4 w-full'}`}>
        <div>
          {title && <h2 className="text-2xl text-center lg:text-4xl font-bold pb-2">{title}</h2>}
          {style === 'secondary' && <div className="max-lg:hidden w-full h-[4px] bg-white" />}
        </div>
        {description && (
          <div className="flex items-center gap-2">
            {style === 'primary' && <div className="max-lg:hidden w-1/2 h-[4px] bg-white" />}
            {Array.isArray(description) ? (
              <ul className={`text-sm lg:text-xl max-w-lg max-lg:flex justify-center items-center flex-col w-full`}>
                {description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm lg:text-xl max-w-lg max-lg:text-center px-2">{description}</p>
            )}
          </div>
        )}
      </div>
    </section>
    // <section className="mb-8 z-0 relative">
    //   <Image src={bannerImage || "/banner-home.png"} alt="banner-home" width={1831} height={916} unoptimized className="w-full max-h-[600px] object-cover" />
    //   <div className="absolute inset-0 top-1/2 background-linear-blue" />
    //   <div className="absolute left-[10%] bottom-[10%] text-white ">
    //     <div>
    //       {title && <h2 className="text-4xl font-bold mb-2">{title}</h2>}
    //       <div className="w-full h-[4px] bg-white" />
    //     </div>
    //     {description && (
    //       <div className="flex items-center gap-2">
    //         <p className="text-xl mt-4 max-w-lg">{description}</p>
    //       </div>
    //     )}
    //   </div>
    // </section>
  )
}

export default Banner