import { useState } from "react"
import Slider from "./Slider"
import Modal from "../ui/modal"
import CloseIcon from "@/assets/icons/CloseIcon"

export default function PopupContent({
  coordinatesId,
  initialNote,
  onSave,
  onDelete,
  onCancel
}: {
  coordinatesId: number | null
  initialNote?: string
  onSave: (note: string) => void
  onDelete: () => void
  onCancel: () => void
}) {
  const [note, setNote] = useState(initialNote ?? '');
  const [isOpenModalDeleteMark, setIsOpenModalDeleteMark] = useState(false);

  return (
    <>
      <Modal
        open={isOpenModalDeleteMark}
        onClose={() => setIsOpenModalDeleteMark(false)}
        className="top-1/2! -translate-y-1/2! bg-white p-4"
      >
        <div className="p-6">
          <p>Bạn có chắc chắn muốn xóa đánh dấu này?</p>
        </div>
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#d29015] text-[#d29015] hover:bg-[#d29015] hover:text-white" onClick={() => {
          setIsOpenModalDeleteMark(false)
        }}>
          <CloseIcon />
        </div>
        <div className="flex justify-center gap-4 p-4">
          <button
            className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded cursor-pointer"
            onClick={() => {
              setIsOpenModalDeleteMark(false);
              onDelete();
            }}
          >
            Xóa
          </button>
          <button
            className="px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white text-sm rounded cursor-pointer"
            onClick={() => setIsOpenModalDeleteMark(false)}
          >
            Hủy
          </button>
        </div>
      </Modal>
      <div className="p-2">
        <div className="lg:flex gap-4 mb-4">
          <Slider coordinatesId={coordinatesId} />
          <div className="border border-[#ccc] p-2 rounded-2xl flex flex-col items-center gap-2">
            <p className="text-center">Ghi chú</p>
            <textarea
              className="p-2 border rounded-md text-sm text-gray-700 w-full h-full"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={5}
            />

            <div className="flex justify-around space-x-2 w-full">
              <button
                onClick={() => onSave(note)}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded cursor-pointer"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsOpenModalDeleteMark(true)}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded cursor-pointer"
          >
            Xóa
          </button>
          <button
            onClick={onCancel}
            className="px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white text-sm rounded cursor-pointer"
          >
            Hủy
          </button>
        </div>
      </div>
    </>
  )
}
