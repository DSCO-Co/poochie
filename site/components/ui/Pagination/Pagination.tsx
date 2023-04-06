import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid'


import { usePagination } from 'react-instantsearch-hooks-web';



function ConnectedPagination() {


  const { nbPages, currentRefinement, refine } = usePagination();

  const renderPages = () => {
    const pages: JSX.Element[] = []
    for (let i = 0; i < nbPages; i++) {
      pages.push(
        <a
          key={i}
          href="#"
          onClick={(e) => {
            e.preventDefault()
            refine(i);
          }}
          className={`inline-flex items-center border-t-2 ${
            i === currentRefinement
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } px-4 pt-4 text-sm font-medium`}
          aria-current={i === currentRefinement ? 'page' : undefined}
        >
          {i + 1}
        </a>
      )
    }
    return pages
  }

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 mb-8 mx-auto max-w-4xl">
      <div className="-mt-px flex">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            if (currentRefinement > 1) refine(currentRefinement - 1);
          }}
          className={`inline-flex items-center border-t-2 pt-4 pr-1 text-sm font-medium ${
            currentRefinement > 1
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
            if (currentRefinement < nbPages) refine(currentRefinement + 1);
          }}
          className={`inline-flex items-center border-t-2 pt-4 pl-1 text-sm font-medium ${
            currentRefinement < nbPages
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

export default ConnectedPagination;

