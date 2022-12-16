import { FC } from 'react'

function gcd(a: number, b: number) {
  return b === 0 ? a : gcd(b, a % b)
}

export const DimensionImage: FC<
  {
    src: string
    alt?: string
  } & React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
> = ({ src, alt, ...props }) => {
  return <img src={src} alt={alt} {...props} />
}
