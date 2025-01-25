import { IconProps } from "../../types/icons"

const ChevronLeft = ({ className }: IconProps) => (
  <svg className={`size-6 text-gray-800 dark:text-white ${className}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14 8-4 4 4 4" />
  </svg>
)

export default ChevronLeft