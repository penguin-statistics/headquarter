import { EuiCard, EuiIcon } from '@elastic/eui'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const navigate = useNavigate()

  return (
    <EuiCard
      icon={<EuiIcon size="xl" type="inspect" />}
      title="Recognition Defects"
      description="User reported recognition defects"
      onClick={() => navigate('/recognition/defects')}
    />
  )
}
