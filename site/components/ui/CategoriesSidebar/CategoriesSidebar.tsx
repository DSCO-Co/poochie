import { connectRefinementList } from 'react-instantsearch-dom';

const CustomCategoriesAndBrands = ({ categoriesItems, categoriesRefine, brandsItems, brandsRefine }) => (
    <div>
      <div>
        <h3 className="text-lg font-medium mb-2">Categories</h3>
        <ul>
          {categoriesItems && categoriesItems.map(item => (
            <li key={item.label} className="mb-2">
              <button
                className="text-sm font-medium text-left focus:outline-none hover:underline"
                onClick={() => categoriesRefine(item.value)}
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
          {brandsItems && brandsItems.map(item => (
            <li key={item.label} className="mb-2">
              <button
                className="text-sm font-medium text-left focus:outline-none hover:underline"
                onClick={() => brandsRefine(item.value)}
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

  
