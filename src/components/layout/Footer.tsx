import { Link } from 'react-router-dom'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 pb-20 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Company Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* 본부 정보 */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white font-bold text-sm">
                온담
              </div>
              <span className="font-bold text-lg text-white">시어에셋 온담본부</span>
            </div>

            <div className="space-y-2 text-sm text-gray-400">
              <p><span className="text-gray-500">주소</span> 경기도 오산시 유엔평화로 35(외삼미동)</p>
              <p><span className="text-gray-500">관리자</span> 이승정</p>
              <p><span className="text-gray-500">사업자등록번호</span> 328-38-01517</p>
              <p><span className="text-gray-500">대표전화</span> 02-1234-5678</p>
            </div>
          </div>

          {/* 바로가기 */}
          <div>
            <h4 className="text-white font-semibold mb-4">바로가기</h4>
            <ul className="space-y-2">
              {[
                { path: '/about', label: '온담본부 소개' },
                { path: '/news', label: '홍보센터' },
                // { path: '/insurance', label: '보험정보' },
                { path: '/apply', label: '입사지원' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} 시어에셋 온담본부. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                개인정보처리방침
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                이용약관
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
