import { useSortBy } from 'react-instantsearch-hooks-web'

const ConnectedSortBy = ({ items }) => {
  const { currentRefinement, options, refine } = useSortBy({ items })

  return (
    <div className="flex flex-col space-y-2">
      {options.map((item) => (
        <button
          key={item.value}
          onClick={() => refine(item.value)}
          className={`text-sm leading-5 text-left ${
            item.value === currentRefinement
              ? 'text-accent-8 underline'
              : 'text-accent-4'
          } hover:text-accent-5 focus:outline-none focus:text-accent-5`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

export default ConnectedSortBy
