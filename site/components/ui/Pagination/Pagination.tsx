import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid'
import Link from 'next/link'

type PaginationProps = {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: any
}

function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const showPrevious = currentPage > 1
  const showNext = currentPage < totalPages

  const renderPages = () => {
    const pages: JSX.Element[] = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <a
          key={i}
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onPageChange(i)
          }}
          className={`inline-flex items-center border-t-2 ${
            i === currentPage
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } px-4 pt-4 text-sm font-medium`}
          aria-current={i === currentPage ? 'page' : undefined}
        >
          {i}
        </a>
      )
    }
    return pages
  }

  return (
    // <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
    //   <div className="-mt-px flex w-0 flex-1">
    //     {showPrevious && (

    //         <a
    //           href="#"
    //           className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
    //         >
    //           <ArrowLongLeftIcon
    //             className="mr-3 h-5 w-5 text-gray-400"
    //             aria-hidden="true"
    //           />
    //           Previous
    //         </a>

    //     )}
    //   </div>
    //   <div className="hidden md:-mt-px md:flex">{renderPages()}</div>
    //   <div className="-mt-px flex w-0 flex-1 justify-end">
    //     {showNext && (
    //       <a
    //         href="#"
    //         className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
    //       >
    //         Next
    //         <ArrowLongRightIcon
    //           className="ml-3 h-5 w-5 text-gray-400"
    //           aria-hidden="true"
    //         />
    //       </a>
    //     )}
    //   </div>
    // </nav>

    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 mb-8">
      <div className="-mt-px flex">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            if (currentPage > 1) onPageChange(currentPage - 1)
          }}
          className={`inline-flex items-center border-t-2 pt-4 pr-1 text-sm font-medium ${
            currentPage > 1
              ? 'text-gray-500 hover:border-gray-300 hover:text-gray-700'
              : 'text-gray-200'
          }`}
        >
          <ArrowLongLeftIcon
            className="mr-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Previous
        </a>
      </div>
      <div className="hidden md:-mt-px md:flex">{renderPages()}</div>
      <div className="-mt-px flex">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            if (currentPage < totalPages) onPageChange(currentPage + 1)
          }}
          className={`inline-flex items-center border-t-2 pt-4 pl-1 text-sm font-medium ${
            currentPage < totalPages
              ? 'text-gray-500 hover:border-gray-300 hover:text-gray-700'
              : 'text-gray-200'
          }`}
        >
          Next
          <ArrowLongRightIcon
            className="ml-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </a>
      </div>
    </nav>
  )
}

export default Pagination
