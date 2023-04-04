import { connectRefinementList } from 'react-instantsearch-dom';

const CustomCategoriesAndBrands = ({ items, refine }) => (
  <div>
    <div>
      <h3 className="text-lg font-medium mb-2">Categories</h3>
      <ul>
        {items.map(item => (
          <li key={item.label} className="mb-2">
            <button
              className="text-sm font-medium text-left focus:outline-none hover:underline"
              onClick={() => refine(item.value)}
            >
              {item.label} ({item.count})
            </button>
          </li>
        ))}
      </ul>
    </div>
    <div>
      <h3 className="text-lg font-medium mb-2">Brands</h3>
      <ul>
        {items.map(item => (
          <li key={item.label} className="mb-2">
            <button
              className="text-sm font-medium text-left focus:outline-none hover:underline"
              onClick={() => refine(item.value)}
            >
              {item.label} ({item.count})
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const CategoriesSidebar = connectRefinementList(CustomCategoriesAndBrands);
export default CategoriesSidebar;


  
