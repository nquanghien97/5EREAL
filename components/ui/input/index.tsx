import * as React from "react"
import styles from './input.module.css'
interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode
  className?: string
  label: string
  addon?: string | React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, type, name, label, addon, placeholder = "", ...props }, ref) => {
    return (
      <div
        className={
          `${styles.container} ${className || ""}`
        }
      >
        <div className={styles.icon_wrapper}>
          {icon}
        </div>
        <input
          {...props}
          placeholder={placeholder}
          type={type}
          ref={ref}
          name={name}
          className={`${styles.input} ${icon ? styles.input_with_icon : ''}`}
          autoComplete="off"
        />
        <label htmlFor={name} className={`${styles.label} ${icon ? styles.label_with_icon : ''}`}>{label}</label>
        {addon && (<span className={styles.addon}>{addon}</span>)}

      </div>
    );
  }
)
Input.displayName = "Input"

export { Input }
