import React, { useState } from 'react'
import Modal from '../modal'
import RegisterModal from './register-modal'
import LoginModal from './login-modal'

interface AuthProps {
  open: boolean
  onClose: () => void
}

function Auth(props: AuthProps) {
  const { open, onClose } = props
  const [isLoginModalShow, setIsLoginModalShow] = useState<boolean>(true)

  const handleClose = () => {
    setIsLoginModalShow(true)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="lg:w-2/3 w-full px-4 rounded-lg h-full flex items-center"
    >
      {isLoginModalShow ? (
        <LoginModal onSwitchRegisterModal={() => setIsLoginModalShow(false)} onClose={handleClose} />
      ) : (
        <RegisterModal onSwitchLoginModal={() => setIsLoginModalShow(true)} onClose={handleClose} />
      )}
    </Modal>
  )
}

export default Auth