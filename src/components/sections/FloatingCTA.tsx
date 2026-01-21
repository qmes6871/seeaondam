import { Link, useLocation } from 'react-router-dom'

export function FloatingCTA() {
  const location = useLocation()

  // 입사지원 페이지에서는 숨김
  if (location.pathname === '/apply') {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        to="/apply"
        className="group flex items-center gap-3 px-6 py-4 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span className="font-semibold">입사 지원하기</span>
        <svg
          className="w-4 h-4 transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
  )
}
