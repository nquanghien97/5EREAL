import React from 'react'
import Image from 'next/image'
import { ProjectsEntity } from '@/entities/projects'
import Link from 'next/link'
import FadeIn from '../framer-motion/FadeIn'
import PlayIcon from '@/assets/icons/PlayIcon'

function ProjectsSection({ response, description }: { response: { data: ProjectsEntity[] }, description: string }) {
  return (
    <section className="px-4 mb-8">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div>
            <div className="flex flex-col lg:flex-row mb-4 ">
              <div className="flex flex-col justify-end w-full lg:w-1/2">
                <h2 className="text-3xl md:text-5xl font-[800] text-[#0F3E5A] mb-12 text-center">DỰ ÁN</h2>
                <Image src="/du-an-1.png" alt="du-an-1" width={1306} height={637} className="h-2/3" />
              </div>
              <div className="w-full lg:w-1/2">
                <Image src="/du-an-2.png" alt="du-an-2" width={1309} height={1025} />
              </div>
            </div>
            <p className="text-[1.25rem] lg:text-[1.5rem] text-[#19366A] text-justify lg:text-center mb-6 px-4">
              {description}
            </p>
          </div>
        </FadeIn>
        <FadeIn>
          <div className={`grid grid-cols-1 ${response.data.length > 1 ? 'md:grid-cols-2' : ''} max-w-7xl mx-auto rounded-2xl overflow-hidden`}>
            {response.data.map((project) => (
              <Link
                href={`/du-an/${project.slug}`}
                key={project.id}
                className="group relative overflow-hidden shadow-lg hover:shadow-xl"
              >
                {/* Background Image with Overlay */}
                <div className="relative">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${project.thumbnailUrl}`}
                    alt={project.name}
                    width={600}
                    height={400}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                  {/* Content */}
                  <div className="absolute background-linear-blue bottom-0 left-0 w-full z-20 p-8 flex flex-col justify-between">
                    {/* Number Badge */}
                    <div className="flex items-start justify-between max-lg:mb-2">
                      <div className="text-2xl lg:text-4xl font-bold text-white/90 leading-none">{project.name}</div>
                    </div>

                    {/* Title and CTA */}
                    <div className="flex items-center max-lg:justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <Image src="/location.png" alt="location" width={20} height={20} className="w-auto h-auto" />
                        <p className="lg:text-xl font-semibold text-white leading-tight">{project.location}</p>
                      </div>
                      <div className="flex items-center cursor-pointer p-2 rounded-full bg-white text-[#d29015] hover:bg-[#d29015] hover:text-white transition-colors">
                        <PlayIcon width={24} height={24} fill="currentColor" className="fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default ProjectsSection