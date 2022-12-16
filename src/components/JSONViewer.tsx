import { FC } from 'react'
import ReactJson from 'react-json-view'

export const JSONViewer: FC<{ value: any }> = ({ value }) => {
  return (
    <ReactJson
      src={value}
      theme="bright:inverted"
      iconStyle="triangle"
      style={{ margin: '1rem 0' }}
    >
      {JSON.stringify(value, null, 2)}
    </ReactJson>
  )
}
