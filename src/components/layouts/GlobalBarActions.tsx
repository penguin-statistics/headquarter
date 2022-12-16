import {
  Button,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderPanel,
} from '@carbon/react'

import { Switcher, User } from '@carbon/icons-react'
import { ReactNode, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import store, { useAppSelector } from 'store'
import { authLoggedOut } from 'stores/authSlice'
import { selectIsLoggedIn } from '../../stores/authSlice'
import { LocaleOverflowMenu } from './preferences/LocaleOverflowMenu'

function AccountPanel() {
  const { t } = useTranslation('auth')
  const profile = useAppSelector(selectIsLoggedIn)
  if (!profile) {
    return null
  }

  return (
    <div className="flex h-full flex-col gap-2 p-8">
      <div className="flex-1" />

      <Button
        kind="danger--tertiary"
        onClick={() => {
          store.dispatch(authLoggedOut())
        }}
        className="mt-2"
      >
        {t('logout')}
      </Button>
    </div>
  )
}

interface BarAction {
  id: string
  icon?: ReactNode
  label?: string
  panel?: ReactNode
  bareButton?: boolean
}

export function GlobalBarActions() {
  const [activeBarAction, dispatchActiveBarAction] = useReducer(
    (state: BarAction | null, action: BarAction) => {
      if (state?.id === action.id) {
        return null // toggle off
      }
      return action // toggle on
    },
    null,
  )

  const barActions: BarAction[] = [
    {
      id: 'locale',
      icon: (
        <LocaleOverflowMenu
          key="locale"
          onOpen={() => dispatchActiveBarAction({ id: 'locale' })}
        />
      ),
      label: 'Locale',
      bareButton: true,
    },
    {
      id: 'account',
      icon: <User size={20} />,
      label: 'Account',
      panel: <AccountPanel />,
    },
    {
      id: 'app-switcher',
      icon: <Switcher size={20} />,
      label: 'App Switcher',
      panel: <div>App Switcher</div>,
    },
  ]

  return (
    <>
      <HeaderGlobalBar>
        {barActions.map((action) =>
          action.bareButton ? (
            action.icon
          ) : (
            <HeaderGlobalAction
              key={action.id}
              aria-label={action.label}
              isActive={activeBarAction?.id === action?.id}
              onClick={() => dispatchActiveBarAction(action)}
            >
              {action.icon}
            </HeaderGlobalAction>
          ),
        )}
      </HeaderGlobalBar>

      <HeaderPanel
        aria-hidden={!activeBarAction}
        aria-label={activeBarAction?.label ?? ''}
        expanded={!!activeBarAction?.panel}
      >
        {activeBarAction?.panel}
      </HeaderPanel>
    </>
  )
}
