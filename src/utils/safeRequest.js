import { toast } from 'sonner'

/**
 * 안전한 axios 요청 래퍼 함수
 *
 * 요청 중 로딩 토스트, 성공 메시지, 에러 핸들링 등을 일관되게 처리한다.
 *
 * @param {Promise} promise - axios 요청 Promise 객체
 * @param {Object} [options] - 옵션 객체
 * @param {boolean} [options.silent=false] - 에러 토스트 및 콘솔 출력 비활성화 여부
 * @param {Function} [options.onError] - 에러 발생 시 실행할 콜백 함수
 * @param {string} [options.successMessage] - 요청 성공 시 보여줄 메시지
 * @param {number} [options.successDuration=2000] - 성공 메시지 유지 시간
 * @param {string} [options.loadingMessage] - 로딩 메시지 (toast.loading)
 * @param {number} [options.minLoadingDuration=700] - 로딩 메시지 최소 유지 시간 (ms)
 *
 * @returns {{ result: any, error: any }} - 응답 결과와 에러 객체 반환
 */
export const safeRequest = async (
  promise,
  {
    silent = false,
    onError,
    successMessage,
    successDuration = 2000,
    loadingMessage,
    minLoadingDuration = 700, // 기본 최소 로딩 유지 시간: 700ms
  } = {}
) => {
  let loadingToastId
  const startTime = Date.now()

  // 로딩 메시지 출력
  if (loadingMessage) {
    loadingToastId = toast.loading(loadingMessage)
  }

  try {
    const result = await promise

    // 최소 로딩 시간 보장
    const elapsed = Date.now() - startTime
    const delay = Math.max(0, minLoadingDuration - elapsed)

    if (loadingToastId) {
      setTimeout(() => toast.dismiss(loadingToastId), delay)
    }
    
    if(result.code === 200) {
      if (successMessage) {
        toast.success(successMessage, {
          duration: successDuration,
        })
      }
      return { result, error: null }
    } else {
      // 커스텀 에러 콜백
      if (typeof onError === 'function') {
        onError(result)
      }
    }

    return { result: null, error: result }
    
  // INFO: 서버자체 에러일 때  
  } catch (error) {
    // 로딩 토스트 닫기
    if (loadingToastId) toast.dismiss(loadingToastId)

    // 기타 에러
    if (!silent) {
      console.error('API 에러:', error)
      toast.error('⚠️ 에러가 발생했습니다.')
    }

    

    return { result: null, error }
  }
}
