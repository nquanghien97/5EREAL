import React from 'react'
import Modal from '../../modal';
import Image from 'next/image';

function Detail({ open, onClose, data }: {
  open: boolean,
  onClose: () => void,
  data: {
    id: number;
    src: string;
    name: string;
    description: string;
    details: string;
  }
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="w-1/2 bg-white rounded-2xl shadow-lg px-4"
    >
      <div className="bg-white p-4 rounded-lg w-full mx-auto">
        <div className="flex justify-end w-full" onClick={onClose}>
          <div className="flex justify-center items-center p-2 hover:bg-[#ccc] duration-300 rounded-full cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <div className="w-full mx-auto">
          <div className="flex items-center gap-4">
            <Image
              src={data.src}
              alt={data.name}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{data.name}</h2>
              <p className="text-gray-600">{data.description}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-700 leading-relaxed">{data.details}</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Detail