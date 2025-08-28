function Building2Icon(props: React.SVGProps<SVGSVGElement>) {
  const {
    width = 24,
    height = 24,
    ...rest
  } = props;
  return (
    <svg {...rest} data-v-15b35c9e="" xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-icon customizable lucide-building2-icon lucide-building-2 lucide-icon customizable"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path></svg>
  );
}

export default Building2Icon;