import { EuiPageTemplate } from '@elastic/eui'
import terra2bg from 'assets/terra2bg.png?url'
import clsx from 'clsx'
import { GlobalHeader } from 'layouts/RootLayout'
import styles from './AuthLayout.module.css'

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <EuiPageTemplate>
      <GlobalHeader />
      <div
        className={clsx(
          'absolute top-0 left-0 h-full w-full bg-cover bg-no-repeat',
          styles['img-wrapper'],
        )}
      >
        <img src={terra2bg} alt="Terra 2" className="h-full w-full" />
      </div>
      <EuiPageTemplate.Section
        restrictWidth={false}
        className="w-full"
        contentProps={{
          className: 'h-full absolute top-0 left-0 w-full',
        }}
      >
        {children}
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  )
}
