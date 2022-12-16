import { EuiLoadingSpinner, EuiToolTip } from '@elastic/eui'
import { FC, useEffect, useRef, useState } from 'react'

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
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [dimensions, setDimensions] = useState<string | null>(null)

  useEffect(() => {
    const cb = () => {
      if (!imageRef.current) return

      const { naturalWidth, naturalHeight } = imageRef.current
      const gcdValue = gcd(naturalWidth, naturalHeight)
      setDimensions(
        `Dimensions (width×height): ${naturalWidth}×${naturalHeight} (${
          naturalWidth / gcdValue
        }:${naturalHeight / gcdValue})`,
      )
    }

    if (imageRef.current) {
      imageRef.current.addEventListener('load', cb)
    }

    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener('load', cb)
      }
    }
  }, [imageRef.current])

  return (
    <EuiToolTip content={dimensions ? dimensions : <EuiLoadingSpinner />}>
      <img src={src} alt={alt} {...props} ref={imageRef} />
    </EuiToolTip>
  )
}
