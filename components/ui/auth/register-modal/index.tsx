import React, { useState } from 'react'
import CloseIcon from '@/assets/icons/CloseIcon'
import { Input } from '../../input'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import EyeOffIcon from '@/assets/icons/EyeOff'
import EyeIcon from '@/assets/icons/EyeIcon'
import { RegisterUserDTO } from '@/dto/user'
import { RegisterUser } from '@/services/auth'
import { useAuthStore } from '@/zustand/user'
import LoadingIcon from '@/assets/icons/LoadingIcon'
import { useRouter } from 'next/navigation'

interface RegisterModalProps {
  onSwitchLoginModal: () => void
  onClose: () => void
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Vui lòng nhập số điện thoại')
    .length(10, 'Số điện thoại phải đủ 10 chữ số')
    .matches(phoneRegExp, 'Vui lòng nhập số điện thoại hợp lệ'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu'),
  fullName: yup
    .string()
    .required('Vui lòng nhập họ tên')
})

function RegisterModal(props: RegisterModalProps) {
  const { onClose, onSwitchLoginModal } = props
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const { setUser } = useAuthStore()

  const onSubmit = async (data: RegisterUserDTO) => {
    try {
      setIsLoading(true)
      const res = await RegisterUser(data)
      setUser(res.user)
      router.refresh()
      onClose()
    } catch (err) {
      console.log((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg w-full">
      <div className="flex mb-4">
        <div className="flex-1">
          <h3 className="text-center text-2xl">Đăng ký</h3>
        </div>
        <div className="flex items-center p-2 hover:bg-[#ccc] duration-300 rounded-full cursor-pointer" onClick={onClose}>
          <CloseIcon />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Input label="Họ tên" {...register('fullName')} name="fullName" id="fullName" className="mb-1" />
          {errors.fullName && <p className="text-[red] text-sm">{errors.fullName.message}</p>}
        </div>
        <div className="mb-4">
          <Input label="Số điện thoại" {...register('phoneNumber')} name="phoneNumber" id="phoneNumber" className="mb-1" />
          {errors.phoneNumber && <p className="text-[red] text-sm">{errors.phoneNumber.message}</p>}
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input label="Mật khẩu" {...register('password')} name="password" id="password" className="mb-1" type={isShowPassword ? 'text' : 'password'} />
            <div className="absolute top-1/2 -translate-y-1/2 right-2">
              {isShowPassword ? (
                <div className="hover:bg-[#edecec] p-2 rounded-full duration-300 cursor-pointer" onClick={() => setIsShowPassword(false)}>
                  <EyeOffIcon color='#9c9c9c' width={20} height={20} />
                </div>
              ) : (
                <div className="hover:bg-[#edecec] p-2 rounded-full duration-300 cursor-pointer" onClick={() => setIsShowPassword(true)}>
                  <EyeIcon color='#9c9c9c' width={20} height={20} />
                </div>
              )}
            </div>
          </div>
          {errors.password && <p className="text-[red] text-sm">{errors.password.message}</p>}
        </div>
        <div className="flex justify-center mb-4">
          <button disabled={isLoading} className={`${isLoading ? 'bg-[#013d7b] cursor-not-allowed' : 'bg-[#013d7b] hover:opacity-70 cursor-pointer'} text-white font-semibold py-2 px-8 rounded-lg duration-300`} type="submit">
            {isLoading ? <LoadingIcon size='small' color='white' /> : 'Đăng ký'}
          </button>
        </div>
        <div>
          <p className="text-center">
            Bạn đã có tài khoản?
            <span
              className="text-[#005cc5] cursor-pointer hover:underline ml-2"
              onClick={onSwitchLoginModal}
            >
              Đăng nhập ngay
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default RegisterModal