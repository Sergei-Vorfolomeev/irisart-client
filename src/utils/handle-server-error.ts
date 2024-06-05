import { Code, InterLayerObject } from '@/utils/inter-layer-object'
import axios, { AxiosError } from 'axios'

type ServerResponseType = {
  message: string | string[]
  error: string
  statusCode: number
}

export const handleServerError = (
  setError: (error: string | null) => void,
  e: unknown,
) => {
  const error = e as Error | AxiosError<ServerResponseType>
  if (axios.isAxiosError(error)) {
    setError(error.response?.data.message)
    setTimeout(() => {
      setError(null)
    }, 6000)
    return new InterLayerObject(Code.error, error.response?.data.message)
  }
  return new InterLayerObject(Code.error, error.message)
}
