import { ICON_TYPES } from '@elastic/eui'
import { ValuesType } from 'utility-types'

import { appendIconComponentCache } from '@elastic/eui/es/components/icon/icon'

import { icon as apps } from '@elastic/eui/es/components/icon/assets/apps'
import { icon as dashboardApp } from '@elastic/eui/es/components/icon/assets/app_dashboard'
import { icon as arrowEnd } from '@elastic/eui/es/components/icon/assets/arrowEnd'
import { icon as arrowStart } from '@elastic/eui/es/components/icon/assets/arrowStart'
import { icon as arrowLeft } from '@elastic/eui/es/components/icon/assets/arrow_left'
import { icon as arrowRight } from '@elastic/eui/es/components/icon/assets/arrow_right'
import { icon as asterisk } from '@elastic/eui/es/components/icon/assets/asterisk'
import { icon as copy } from '@elastic/eui/es/components/icon/assets/copy'
import { icon as copyClipboard } from '@elastic/eui/es/components/icon/assets/copy_clipboard'
import { icon as cross } from '@elastic/eui/es/components/icon/assets/cross'
import { icon as download } from '@elastic/eui/es/components/icon/assets/download'
import { icon as editorStrike } from '@elastic/eui/es/components/icon/assets/editor_strike'
import { icon as exit } from '@elastic/eui/es/components/icon/assets/exit'
import { icon as eye } from '@elastic/eui/es/components/icon/assets/eye'
import { icon as eyeClosed } from '@elastic/eui/es/components/icon/assets/eye_closed'
import { icon as gear } from '@elastic/eui/es/components/icon/assets/gear'
import { icon as inspect } from '@elastic/eui/es/components/icon/assets/inspect'
import { icon as lock } from '@elastic/eui/es/components/icon/assets/lock'
import { icon as questionInCircle } from '@elastic/eui/es/components/icon/assets/question_in_circle'
import { icon as refresh } from '@elastic/eui/es/components/icon/assets/refresh'

type IconComponentNameType = ValuesType<typeof ICON_TYPES>
type IconComponentCacheType = Partial<Record<IconComponentNameType, unknown>>

const cachedIcons: IconComponentCacheType = {
  lock,
  eye,
  eyeClosed,
  questionInCircle,
  editorStrike,
  asterisk,
  gear,
  dashboardApp,
  refresh,
  cross,
  copy,
  copyClipboard,
  download,
  arrowLeft,
  arrowRight,
  arrowEnd,
  arrowStart,
  inspect,
  exit,
  apps,
}

appendIconComponentCache(cachedIcons)
