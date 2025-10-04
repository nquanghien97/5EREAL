function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  const {
    width = 24,
    height = 24,
    ...rest
  } = props;
  return (
    <svg {...rest} width={width} height={height} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
      <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path>
    </svg>
  );
}

export default ArrowRightIcon;