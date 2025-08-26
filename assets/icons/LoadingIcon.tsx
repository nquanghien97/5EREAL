
interface LoadingIconProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
}

export default function LoadingIcon(props: LoadingIconProps) {
  const { size = 'medium', color = '#6979F8' } = props;
  const sizes = {
    small: 'h-5 w-5',
    medium: 'h-10 w-10',
    large: 'h-12 w-12',
  };
  const circleClass = 'opacity-25';
  const pathClass = 'opacity-75';
  return (
    <svg
      className={`mx-2 spins animate-spin ${sizes[size]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      color="white"
      viewBox="0 0 24 24"
    >
      <circle
        className={circleClass}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className={pathClass}
        fill={color}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}