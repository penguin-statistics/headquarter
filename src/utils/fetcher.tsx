import { EuiIcon, EuiToolTip } from '@elastic/eui'
import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { ReactNode } from 'react'

const formatFetchBaseQueryError = (error: FetchBaseQueryError): string => {
  if (error.status === 'FETCH_ERROR') {
    return `Network error: ${error.error}`
  }

  if (error.status === 'PARSING_ERROR') {
    return `Parsing error: (originalStatus=${error.originalStatus}) ${error.error}`
  }

  if (error.status === 'TIMEOUT_ERROR') {
    return `Timeout error: ${error.error}`
  }

  if (error.status === 'CUSTOM_ERROR') {
    return `Error: ${error.error}`
  }

  return `HTTP status code exception: (${error.status}) ${error.data}`
}

export const formatRTKQError = (
  error: FetchBaseQueryError | SerializedError | undefined,
): ReactNode => {
  if (!error) {
    return ''
  }

  if ('status' in error) {
    error = error as FetchBaseQueryError
    return <>Request error: {formatFetchBaseQueryError(error)}</>
  }

  return (
    <>
      An error occurred while processing the response: {error.name} -{' '}
      {error.message}{' '}
      <EuiToolTip
        position="bottom"
        content={<pre>{JSON.stringify(error, null, 2)}</pre>}
      >
        <EuiIcon tabIndex={0} type="questionInCircle" />
      </EuiToolTip>
    </>
  )
}
