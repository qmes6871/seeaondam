import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// 게시판 카테고리
const categories = [
  { id: 'all', label: '전체' },
  { id: 'life', label: '생명보험' },
  { id: 'health', label: '건강보험' },
  { id: 'car', label: '자동차보험' },
  { id: 'fire', label: '화재보험' },
  { id: 'pension', label: '연금보험' },
  { id: 'savings', label: '저축보험' },
]

// 게시판 데이터
const boardData = [
  {
    id: 1,
    category: 'life',
    categoryLabel: '생명보험',
    title: '종신보험의 필요성과 가입 시 고려사항',
    date: '2025.01.15',
    views: 234,
    isNew: true,
    isImportant: true,
  },
  {
    id: 2,
    category: 'health',
    categoryLabel: '건강보험',
    title: '실손의료보험 4세대 변경 사항 안내',
    date: '2025.01.12',
    views: 521,
    isNew: true,
    isImportant: true,
  },
  {
    id: 3,
    category: 'pension',
    categoryLabel: '연금보험',
    title: '연금보험 vs 연금저축, 무엇이 다를까?',
    date: '2025.01.10',
    views: 312,
    isNew: true,
    isImportant: false,
  },
  {
    id: 4,
    category: 'car',
    categoryLabel: '자동차보험',
    title: '자동차보험 갱신 시 할인받는 방법',
    date: '2025.01.08',
    views: 445,
    isNew: false,
    isImportant: false,
  },
  {
    id: 5,
    category: 'health',
    categoryLabel: '건강보험',
    title: '암보험 가입 전 반드시 확인해야 할 5가지',
    date: '2025.01.05',
    views: 678,
    isNew: false,
    isImportant: true,
  },
  {
    id: 6,
    category: 'fire',
    categoryLabel: '화재보험',
    title: '주택화재보험과 아파트화재보험의 차이점',
    date: '2025.01.03',
    views: 189,
    isNew: false,
    isImportant: false,
  },
  {
    id: 7,
    category: 'savings',
    categoryLabel: '저축보험',
    title: '저축보험 중도해지 시 손해 최소화하는 방법',
    date: '2024.12.28',
    views: 267,
    isNew: false,
    isImportant: false,
  },
  {
    id: 8,
    category: 'life',
    categoryLabel: '생명보험',
    title: '정기보험과 종신보험, 나에게 맞는 선택은?',
    date: '2024.12.25',
    views: 398,
    isNew: false,
    isImportant: false,
  },
  {
    id: 9,
    category: 'health',
    categoryLabel: '건강보험',
    title: '치아보험 가입 시 면책기간과 감액기간 이해하기',
    date: '2024.12.20',
    views: 456,
    isNew: false,
    isImportant: false,
  },
  {
    id: 10,
    category: 'pension',
    categoryLabel: '연금보험',
    title: '노후 대비, 언제부터 연금보험을 준비해야 할까?',
    date: '2024.12.18',
    views: 534,
    isNew: false,
    isImportant: false,
  },
  {
    id: 11,
    category: 'car',
    categoryLabel: '자동차보험',
    title: '운전자보험과 자동차보험의 차이점',
    date: '2024.12.15',
    views: 321,
    isNew: false,
    isImportant: false,
  },
  {
    id: 12,
    category: 'life',
    categoryLabel: '생명보험',
    title: '변액보험의 장단점과 가입 적합 대상',
    date: '2024.12.10',
    views: 287,
    isNew: false,
    isImportant: false,
  },
]

export function InsurancePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const itemsPerPage = 8

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }
        )
      }
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.3 }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  // 필터링된 데이터
  const filteredData = boardData.filter((item) => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  // 페이지네이션
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // 카테고리 변경 시 페이지 리셋
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchQuery])

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div ref={heroRef} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white/90 text-sm font-medium mb-6">
            Insurance Info
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            보험정보
          </h1>
          <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            알아두면 유용한 보험 정보와 상품 안내를 확인해 보세요.
          </p>
        </div>
      </section>

      {/* Board Section */}
      <section className="py-12 lg:py-20 bg-gray-50 min-h-[60vh]">
        <div ref={contentRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category & Search */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-gray-100">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Board List */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Table Header - Desktop */}
            <div className="hidden sm:grid sm:grid-cols-12 bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="col-span-1 text-sm font-medium text-gray-500 text-center">번호</div>
              <div className="col-span-2 text-sm font-medium text-gray-500">분류</div>
              <div className="col-span-6 text-sm font-medium text-gray-500">제목</div>
              <div className="col-span-2 text-sm font-medium text-gray-500 text-center">등록일</div>
              <div className="col-span-1 text-sm font-medium text-gray-500 text-center">조회</div>
            </div>

            {/* Board Items */}
            <div className="divide-y divide-gray-100">
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <div
                    key={item.id}
                    className="group hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    {/* Desktop View */}
                    <div className="hidden sm:grid sm:grid-cols-12 items-center px-6 py-4">
                      <div className="col-span-1 text-sm text-gray-400 text-center">
                        {item.isImportant ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-red-100 text-red-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a.5.5 0 000 1h5a.5.5 0 000-1h-5zm0 2a.5.5 0 000 1h5a.5.5 0 000-1h-5zm0 2a.5.5 0 000 1h5a.5.5 0 000-1h-5z" clipRule="evenodd" />
                            </svg>
                          </span>
                        ) : (
                          (currentPage - 1) * itemsPerPage + index + 1
                        )}
                      </div>
                      <div className="col-span-2">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                          item.category === 'life' ? 'bg-blue-100 text-blue-700' :
                          item.category === 'health' ? 'bg-green-100 text-green-700' :
                          item.category === 'car' ? 'bg-orange-100 text-orange-700' :
                          item.category === 'fire' ? 'bg-red-100 text-red-700' :
                          item.category === 'pension' ? 'bg-purple-100 text-purple-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.categoryLabel}
                        </span>
                      </div>
                      <div className="col-span-6 flex items-center gap-2">
                        <span className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors truncate">
                          {item.title}
                        </span>
                        {item.isNew && (
                          <span className="flex-shrink-0 px-1.5 py-0.5 bg-primary-500 text-white text-[10px] font-bold rounded">
                            NEW
                          </span>
                        )}
                      </div>
                      <div className="col-span-2 text-sm text-gray-500 text-center">{item.date}</div>
                      <div className="col-span-1 text-sm text-gray-400 text-center">{item.views}</div>
                    </div>

                    {/* Mobile View */}
                    <div className="sm:hidden px-4 py-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          item.category === 'life' ? 'bg-blue-100 text-blue-700' :
                          item.category === 'health' ? 'bg-green-100 text-green-700' :
                          item.category === 'car' ? 'bg-orange-100 text-orange-700' :
                          item.category === 'fire' ? 'bg-red-100 text-red-700' :
                          item.category === 'pension' ? 'bg-purple-100 text-purple-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.categoryLabel}
                        </span>
                        <div className="flex items-center gap-2">
                          {item.isImportant && (
                            <span className="text-red-500">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5z" clipRule="evenodd" />
                              </svg>
                            </span>
                          )}
                          {item.isNew && (
                            <span className="px-1.5 py-0.5 bg-primary-500 text-white text-[10px] font-bold rounded">
                              NEW
                            </span>
                          )}
                        </div>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>{item.date}</span>
                        <span>조회 {item.views}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-16 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500">검색 결과가 없습니다.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 px-6 py-4 border-t border-gray-100">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">보험 상담이 필요하신가요?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  온담본부의 전문 설계사가 고객님께 맞는 최적의 보험 상품을 안내해 드립니다.
                  부담 없이 문의해 주세요.
                </p>
                <a
                  href="tel:010-0000-0000"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  상담 문의하기
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
