import {
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiPageTemplate,
  EuiSideNav,
} from '@elastic/eui'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png?url'
import { useAppSelector } from '../store'
import { authLoggedOut, selectIsLoggedIn } from '../stores/authSlice'

export function AuthRedirector() {
  const authed = useAppSelector(selectIsLoggedIn)
  const route = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const authRoute = route.pathname.startsWith('/auth')
    if (!authed && !authRoute) {
      navigate('/auth/login?next=' + encodeURIComponent(route.pathname), {
        replace: true,
      })
    } else if (authed && authRoute) {
      navigate('/', { replace: true })
    }
  }, [authed, route])

  return null
}

export function GlobalHeader() {
  const dispatch = useDispatch()
  const loggedIn = useSelector(selectIsLoggedIn)

  return (
    <EuiHeader position="fixed">
      <EuiHeaderSection grow={false}>
        <EuiHeaderSectionItem border="right">
          <EuiHeaderLogo
            iconType={() => (
              <img src={logo} alt="logo" className="h-full py-1" />
            )}
          >
            Headquarter
          </EuiHeaderLogo>
        </EuiHeaderSectionItem>
      </EuiHeaderSection>

      <EuiHeaderSection side="right">
        {loggedIn && (
          <EuiHeaderSectionItem>
            <EuiHeaderSectionItemButton
              onClick={() => {
                dispatch(authLoggedOut())
              }}
            >
              <EuiIcon type="exit" />
            </EuiHeaderSectionItemButton>
          </EuiHeaderSectionItem>
        )}
      </EuiHeaderSection>
    </EuiHeader>
  )
}

const routes = [
  {
    name: 'Dashboard',
    path: '/',
    description: 'Dashboard',
    iconType: 'dashboardApp',
  },
  {
    name: 'Recognition Defects',
    path: '/recognition/defects',
    description: 'Recognition Defects',
    iconType: 'inspect',
  },
]

function RootContentLayoutSidebar() {
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const sidebar = routes.map(({ path, name }) => ({
    id: path,
    name,
    isSelected: location.pathname === path,
    onClick: () => navigate(path),
  }))

  return (
    <EuiSideNav
      items={[
        {
          name: 'Headquarter',
          id: 'headquarter',
          items: sidebar,
        },
      ]}
      mobileTitle="Navigation"
      toggleOpenOnMobile={() =>
        setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile)
      }
      isOpenOnMobile={isSideNavOpenOnMobile}
    />
  )
}

function RootContentLayout({ children }: { children: ReactNode }) {
  const location = useLocation()

  const currentRoute = useMemo(() => {
    return routes.find((route) => route.path === location.pathname)
  }, [location])

  return (
    <EuiPageTemplate panelled grow restrictWidth={false}>
      <GlobalHeader />
      <EuiPageTemplate.Sidebar sticky>
        <RootContentLayoutSidebar />
      </EuiPageTemplate.Sidebar>
      <EuiPageTemplate.Header
        pageTitle={currentRoute?.name}
        iconType={currentRoute?.iconType}
      />
      <EuiPageTemplate.Section className="app-body h-full">
        {children}
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  )
}

export function RootLayout({ children }: { children: ReactNode }) {
  return <RootContentLayout>{children}</RootContentLayout>
}
