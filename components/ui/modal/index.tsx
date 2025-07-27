import {
  useCallback, useRef, useEffect, PropsWithChildren, RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css'

interface ModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  className?: string;
  ref?: RefObject<HTMLDivElement>
}

export default function Modal(props: ModalProps) {
  const {
    children,
    open,
    onClose,
    className,
    ref,
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);

  const closeModal = useCallback((event: MouseEvent) => {
    if (
      wrapperRef
      && wrapperRef.current
      && !wrapperRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('click', closeModal, { capture: true });

    return () => {
      document.removeEventListener('click', closeModal, { capture: true });
    };
  }, [closeModal]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  

  return open ? createPortal(
    <div className={styles.container} ref={ref}>
      <div className={styles.overlay} />
      <div className={styles.body}>
        <div ref={wrapperRef} className={`${styles.wrapper} ${className && className}`}>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  ) : null;
}