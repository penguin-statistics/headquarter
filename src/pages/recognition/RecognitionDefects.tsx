import {
  EuiBadge,
  EuiButton,
  EuiButtonIcon,
  EuiCopy,
  EuiDescriptionList,
  EuiEmptyPrompt,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiPagination,
  EuiPanel,
  EuiTitle,
} from '@elastic/eui'
import { RecognitionDefect, useRecognitionDefectsQuery } from 'apis/penguin'
import { JSONViewer } from 'components/JSONViewer'
import { FC, ReactNode, useState } from 'react'
import { formatRelativeTime, formatTimeShort } from 'utils/times'
import { formatTimeLong } from '../../utils/times'

interface DefectFact {
  title: NonNullable<ReactNode>
  description: NonNullable<ReactNode>
}

const RecognitionDefectFactList: FC<{
  item: RecognitionDefect
  append?: DefectFact[]
}> = ({ item, append }) => {
  const facts: DefectFact[] = [
    {
      title: 'Defect ID',
      description: item.defectId,
    },
    {
      title: 'Session ID',
      description: item.sessionId,
    },
    ...(item.accountId
      ? [
          {
            title: 'Account ID',
            description: item.accountId,
          },
        ]
      : []),
    ...(append ? append : []),
  ].map((item) => ({
    ...item,
    description: (
      <div className="flex items-center gap-2">
        <span className="font-mono tracking-wide">{item.description}</span>
        <EuiCopy textToCopy={String(item.description)}>
          {(copy) => (
            <EuiButtonIcon onClick={copy} iconType="copyClipboard" size="s" />
          )}
        </EuiCopy>
      </div>
    ),
  }))

  return <EuiDescriptionList listItems={facts} />
}

const RecognitionDefectCardFlyout: FC<{
  item: RecognitionDefect
  onClose: () => void
}> = ({ item, onClose }) => {
  return (
    <EuiFlyout ownFocus={true} size="l" onClose={onClose}>
      <EuiFlyoutHeader hasBorder>
        <div className="caption mb-1 font-mono tracking-wide">
          <h6>#{item.defectId}</h6>
        </div>
        <EuiTitle size="m">
          <h2>Defect Report</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <EuiTitle size="s">
              <h3>Original Image</h3>
            </EuiTitle>

            <div className="flex">
              {item.image ? (
                <img
                  src={item.image.original}
                  alt="original defect"
                  className="w-full bg-gray-200"
                  loading="lazy"
                />
              ) : (
                <div className="flex aspect-[16/9] w-full items-center justify-center rounded-md bg-gray-200 object-contain">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <EuiButton size="s" color="primary" fill iconType="download">
                Download
              </EuiButton>
            </div>
          </div>

          <RecognitionDefectFactList
            item={item}
            append={[
              {
                title: 'Created At',
                description: formatTimeLong(item.createdAt),
              },
              ...(item.updatedAt
                ? [
                    {
                      title: 'Updated At',
                      description: formatTimeLong(item.updatedAt),
                    },
                  ]
                : []),
            ]}
          />

          <section>
            <EuiTitle size="s">
              <h3>Recognition Result</h3>
            </EuiTitle>

            <JSONViewer value={item.recognitionResult} />
          </section>

          <section>
            <EuiTitle size="s">
              <h3>Environment</h3>
            </EuiTitle>

            <JSONViewer value={item.environment} />
          </section>
        </div>
      </EuiFlyoutBody>
    </EuiFlyout>
  )
}

const RecognitionDefectCard: FC<{ item: RecognitionDefect }> = ({ item }) => {
  const [flyoutOpen, setFlyoutOpen] = useState(false)

  return (
    <EuiPanel
      className="!flex h-[20rem] w-full items-center overflow-hidden text-left"
      paddingSize="none"
      onClick={() => setFlyoutOpen(true)}
    >
      <div className="flex h-full w-1/3 items-center bg-gray-200 object-contain">
        {item.image ? (
          <img
            src={item.image.thumbnail}
            alt="thumbnail defect"
            className="h-full w-full bg-gray-200 object-contain"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>

      <div className="flex h-full w-full flex-col justify-start gap-4 p-4">
        <div>
          <EuiBadge color="default">
            {formatRelativeTime(item.createdAt)}
          </EuiBadge>

          <EuiBadge color="hollow">{formatTimeShort(item.createdAt)}</EuiBadge>
        </div>

        <div className="flex flex-col gap-2">
          <RecognitionDefectFactList item={item} />
        </div>
      </div>

      {flyoutOpen && (
        <RecognitionDefectCardFlyout
          item={item}
          onClose={() => setFlyoutOpen(false)}
        />
      )}
    </EuiPanel>
  )
}

export const RecognitionDefects = () => {
  const [page, setPage] = useState(0)
  const query = useRecognitionDefectsQuery({
    page,
    limit: 10,
  })

  const pagination = (
    <div className="flex items-center gap-2">
      <span className="tabular-nums">
        pageIndex={page} (Page {page + 1})
      </span>
      <EuiPagination pageCount={0} activePage={page} onPageClick={setPage} />
    </div>
  )

  return (
    <div className="mb-32 flex flex-col gap-4">
      <div className="flex items-center">
        <EuiButton
          onClick={() => query.refetch()}
          iconType="refresh"
          isLoading={query.isLoading}
        >
          Refresh
        </EuiButton>

        <div className="flex-1" />

        {pagination}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {query.data?.map((item) => (
          <RecognitionDefectCard key={item.defectId} item={item} />
        ))}

        {query.data?.length === 0 && (
          <EuiEmptyPrompt iconType="asterisk" title={<h2>No Defects</h2>} />
        )}
      </div>

      <div className="mt-4 flex items-center justify-end">{pagination}</div>
    </div>
  )
}
