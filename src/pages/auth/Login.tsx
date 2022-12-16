import {
  EuiButton,
  EuiFieldPassword,
  EuiForm,
  EuiFormRow,
  EuiPanel,
  EuiTitle,
} from '@elastic/eui'
import { useAdminBonjourMutation } from 'apis/penguin'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authLoggedIn, authTokenChanged } from 'stores/authSlice'
import { formatRTKQError } from '../../utils/fetcher'

export function Login() {
  const { t } = useTranslation('auth')
  const [sendBonjour, bonjourResult] = useAdminBonjourMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const error = formatRTKQError(bonjourResult.error)

  useEffect(() => {
    if (bonjourResult.isSuccess) {
      dispatch(authLoggedIn())
      navigate('/')
    }
  }, [bonjourResult.data])

  return (
    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
      <Helmet>
        <title>{t('login.title')}</title>
      </Helmet>

      <div className="min-w-[32rem]">
        <EuiPanel paddingSize="m" className="w-full">
          <div className="caption mb-1 tracking-wide opacity-70">
            Headquarter
          </div>
          <EuiTitle size="m" className="mb-6">
            <h1>{t('login.title')}</h1>
          </EuiTitle>

          <EuiForm fullWidth error={error} isInvalid={!!error}>
            <EuiFormRow label={t('login.token')} isInvalid={!!error}>
              <EuiFieldPassword
                className="flex h-full w-full max-w-none flex-col items-start"
                placeholder={t('login.token')}
                required
                onInput={(e) => {
                  const input = e.target as HTMLInputElement
                  dispatch(authTokenChanged(input.value))
                }}
                onSubmit={(e) => {
                  e.preventDefault()
                  sendBonjour(undefined)
                }}
                type="dual"
              />
            </EuiFormRow>

            <EuiFormRow>
              <EuiButton
                isLoading={bonjourResult.isLoading}
                type="submit"
                fill
                onClick={() => sendBonjour(undefined)}
              >
                {t('login.submit')}
              </EuiButton>
            </EuiFormRow>
          </EuiForm>
        </EuiPanel>
      </div>
    </div>
  )
}
