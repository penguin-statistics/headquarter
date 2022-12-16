import { Checkmark, Language } from '@carbon/icons-react'
import { OverflowMenu, OverflowMenuItem } from '@carbon/react'
import { LOCALES } from 'i18n/locales'
import { Dispatch } from 'react'
import { useTranslation } from 'react-i18next'

export function LocaleOverflowMenu({ onOpen }: { onOpen?: Dispatch<void> }) {
  const { i18n } = useTranslation()
  return (
    <OverflowMenu
      renderIcon={() => (
        <Language className="text-white" aria-label="Language" />
      )}
      size="lg"
      ariaLabel="Language"
      flipped
      onOpen={onOpen}
    >
      {LOCALES.map((locale) => (
        <OverflowMenuItem
          key={locale.code}
          itemText={
            <div className="flex w-full items-center">
              <div>{locale.name}</div>
              <div className="flex-1" />
              {locale.code === i18n.language && (
                <Checkmark className="text-white" />
              )}
            </div>
          }
          onClick={() => {
            i18n.changeLanguage(locale.code)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              i18n.changeLanguage(locale.code)
            }
          }}
        />
      ))}
    </OverflowMenu>
  )
}
