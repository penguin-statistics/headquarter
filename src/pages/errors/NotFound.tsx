import { EuiEmptyPrompt } from '@elastic/eui'

export function NotFound() {
  return <EuiEmptyPrompt iconType="asterisk" title={<h2>404 Not Found</h2>} />
}
