// ● 원형 (disc)
export const BulletDiscIcon = ({size=24}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* 줄 1 */}
    <circle cx="4" cy="7" r="2.5" fill="currentColor" />
    <rect x="8" y="6" width="12" height="2" rx="1" fill="currentColor" />
    {/* 줄 2 */}
    <circle cx="4" cy="15" r="2.5" fill="currentColor" />
    <rect x="8" y="14" width="12" height="2" rx="1" fill="currentColor" />
  </svg>
)

// ◯ 빈 원형 (circle)
export const BulletHollowIcon = ({size=24}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="4" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="8" y="6" width="12" height="2" rx="1" fill="currentColor" />
    <circle cx="4" cy="15" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="8" y="14" width="12" height="2" rx="1" fill="currentColor" />
  </svg>
)

// ■ 사각형 (square)
export const BulletSquareIcon = ({size=24}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2.5" y="5.5" width="3" height="3" fill="currentColor" />
    <rect x="8" y="6" width="12" height="2" rx="1" fill="currentColor" />
    <rect x="2.5" y="13.5" width="3" height="3" fill="currentColor" />
    <rect x="8" y="14" width="12" height="2" rx="1" fill="currentColor" />
  </svg>
)

export const TextIcon = ({size=24, text = ['1.', '2.']}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <text x="2" y="9" fontSize="8" fontWeight="bold" fill="currentColor">{text[0]}</text>
    <rect x="10" y="6" width="12" height="2" rx="1" fill="currentColor" />
    <text x="2" y="17" fontSize="8" fontWeight="bold" fill="currentColor">{text[1]}</text>
    <rect x="10" y="14" width="12" height="2" rx="1" fill="currentColor" />
  </svg>
)