import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery'

export interface RecognitionDefectImage {
  original: string
  thumbnail: string
}

export interface RecognitionDefect {
  defectId: string
  createdAt: string
  updatedAt?: string
  sessionId: string
  accountId?: number
  image?: RecognitionDefectImage
  recognitionResult: Record<string, any>
  environment: Environment
}

export interface Environment {
  server: string
  sessionId: string
  frontendCommit: string
  frontendVersion: string
  recognizerVersion: string
  recognizerAssetsVersion: string
  recognizerOpenCVVersion: string
}

export interface RecognitionDefectQueryArgs {
  page: number
  limit: number
}

// Define a service using a base URL and expected endpoints
export const penguinApi = createApi({
  reducerPath: 'penguinApi',
  baseQuery,
  endpoints: (builder) => ({
    adminBonjour: builder.mutation({
      query: () => ({ url: '/api/admin/bonjour' }),
      transformErrorResponse(value, meta, arg) {
        if (value.status === 'PARSING_ERROR' && value.originalStatus === 401) {
          return {
            status: 'CUSTOM_ERROR',
            error: 'Token provided has been rejected',
          }
        }
        return null
      },
    }),
    recognitionDefects: builder.query<
      RecognitionDefect[],
      RecognitionDefectQueryArgs
    >({
      query: (args) => ({
        url: '/api/admin/recognition/defects',
        params: args,
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAdminBonjourMutation, useRecognitionDefectsQuery } =
  penguinApi
