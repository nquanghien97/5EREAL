import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import TrashIcon from '@/assets/icons/TrashIcon';
import Modal from '../../../components/ui/modal';
import CloseIcon from '@/assets/icons/CloseIcon';
import { addImagesReview, deleteImagesReview, getImagesReview } from '@/services/images-review-bds';
import { toast } from 'react-toastify';

interface ImagesType {
  id: number
  url: string
}

function Slider({ coordinatesId, lat, lng }: { coordinatesId: number | null, lat?: number, lng?: number }) {

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [files, setFiles] = useState<File[]>([]);
  const [isOpenModalPreview, setIsOpenModalPreview] = useState(false);
  const [isOpenModalDeleteImage, setIsOpenModalDeleteImage] = useState(false);
  const [imageId, setImageId] = useState<number | null>(null);

  const [images, setImages] = useState<ImagesType[]>([])

  useEffect(() => {
    const fetchImages = async () => {
      if (coordinatesId) {
        const res = await getImagesReview({ coordinatesId })
        if (res.data) {
          setImages(res.data)
        }
      }
    }
    fetchImages()
  }, [coordinatesId])

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
      setIsOpenModalPreview(true);
    }
  }

  const onAddImagesReview = async () => {
    if (files.length === 0) return;

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
      if (coordinatesId) {
        formData.append('coordinatesId', coordinatesId.toString());
      }
      if (lat && lng) {
        formData.append('lat', lat.toString());
        formData.append('lng', lng.toString());
      }

      const res = await addImagesReview(formData);
      res.images.forEach((item: ImagesType) => {
        setImages((prev) => [...prev, item]);
      });
      setIsOpenModalPreview(false);
      toast.success('Thêm hình ảnh thành công');
    } catch (err) {
      console.error('Error adding images review:', err);
      toast.error('Thêm hình ảnh thất bại');
    }
  }

  const onDeleteImage = async (id: number) => {
    try {
      await deleteImagesReview(id);
      setImages((prev) => prev.filter((image) => image.id !== id));
      toast.success('Xóa hình ảnh thành công');
    } catch (err) {
      console.error('Error deleting images review:', err);
      toast.error('Xóa hình ảnh thất bại');
    }
  }

  return (
    <>
      <Modal
        open={isOpenModalPreview}
        onClose={() => {
          setIsOpenModalPreview(false)
          setFiles([])
        }}
        className="top-1/2! -translate-y-1/2! bg-white p-4"
      >
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#d29015] text-[#d29015] hover:bg-[#d29015] hover:text-white" onClick={() => {
          setIsOpenModalPreview(false)
          setFiles([])
        }}>
          <CloseIcon />
        </div>
        <div className="p-4 max-w-7xl m-auto flex flex-wrap">
          {files.map((file, index) => (
            <div key={index} className="mb-4 max-w-1/3 p-4">
              <Image src={URL.createObjectURL(file)} alt={file.name} width={740} height={740} className="rounded-2xl" />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4">
          <div>
            <button
              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded cursor-pointer"
              onClick={onAddImagesReview}
            >
              Thêm hình ảnh
            </button>
          </div>
          <div>
            <button
              className="px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white text-sm rounded cursor-pointer" onClick={() => {
                setIsOpenModalPreview(false)
                setFiles([])
              }}
            >
              Hủy
            </button>
          </div>
        </div>
      </Modal>
      {imageId && (
        <Modal
          open={isOpenModalDeleteImage}
          onClose={() => setIsOpenModalDeleteImage(false)}
          className="top-1/2! -translate-y-1/2! bg-white p-4"
        >
          <div className="p-6">
            <p>Bạn có chắc chắn muốn xóa hình ảnh này?</p>
          </div>
          <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#d29015] text-[#d29015] hover:bg-[#d29015] hover:text-white" onClick={() => {
            setIsOpenModalDeleteImage(false)
          }}>
            <CloseIcon />
          </div>
          <div className="flex justify-center gap-4 p-4">
            <button
              className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded cursor-pointer"
              onClick={() => {
                setIsOpenModalDeleteImage(false);
                onDeleteImage(imageId);
              }}
            >
              Xóa
            </button>
            <button
              className="px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white text-sm rounded cursor-pointer"
              onClick={() => setIsOpenModalDeleteImage(false)}
            >
              Hủy
            </button>
          </div>
        </Modal>
      )}
      <div className="relative border border-[#ccc] p-2 rounded-2xl lg:w-1/2 max-lg:mb-4">
        <p className="text-center mb-2">Hình ảnh review</p>
        <div className="flex justify-end mb-2">
          <label htmlFor="file" className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded cursor-pointer">Thêm mới hình ảnh</label>
          <input multiple id="file" type="file" className="hidden" onChange={onFileChange} />
        </div>
        {images.length > 0 ? (
          <div className="max-w-7xl m-auto">
            <div className="relative">
              <button
                ref={prevRef}
                className="absolute left-[-12px] top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-[#d29015] hover:bg-[#d29015] hover:text-white group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border border-[#d29015]"
                aria-label="Previous slide"
              >
                <ArrowLeftIcon width={16} height={16} className="group-hover:scale-110 transition-transform" />
              </button>

              <button
                ref={nextRef}
                className="absolute right-[-12px] top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-[#d29015] hover:bg-[#d29015] hover:text-white group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border border-[#d29015]"
                aria-label="Next slide"
              >
                <ArrowRightIcon width={16} height={16} className="group-hover:scale-110 transition-transform" />
              </button>

              <Swiper
                slidesPerView={1}
                loop={true}
                modules={[Navigation]}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                  }
                }}
              >
                {images.map((image) => (
                  <SwiperSlide key={image.id}>
                    <div className="relative">
                      <div
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#d29015] text-[#d29015] hover:bg-[#d29015] hover:text-white"
                        onClick={() => {
                          setIsOpenModalDeleteImage(true)
                          setImageId(image.id)
                        }}
                      >
                        <TrashIcon />
                      </div>
                      <div>
                        <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + image.url} alt={image.url} width={740} height={740} className="rounded-2xl" />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

            </div>
          </div>
        ) : (
          <p>Không có hình ảnh nào để hiển thị</p>
        )}
      </div>
    </>
  )
}

export default Slider