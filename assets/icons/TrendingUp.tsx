function TrendingUp(props: React.SVGProps<SVGSVGElement>) {
  const {
    width = 24,
    height = 24,
    ...rest
  } = props;
  return (
    <svg {...rest} data-v-15b35c9e="" xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-icon customizable lucide-trending-up-icon lucide-trending-up lucide-icon customizable">
      <path d="M16 7h6v6"></path>
      <path d="m22 7-8.5 8.5-5-5L2 17"></path>
    </svg>
  );
}

export default TrendingUp;