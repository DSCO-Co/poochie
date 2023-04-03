import { connectSortBy } from 'react-instantsearch-dom';

const CustomSortBy = ({ items, refine, currentRefinement }) => {
    return (
      <div className="flex flex-col space-y-2">
        {items.map((item) => (
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
    );
  };
  
  const ConnectedSortBy = connectSortBy(CustomSortBy);
  
  export default ConnectedSortBy;
