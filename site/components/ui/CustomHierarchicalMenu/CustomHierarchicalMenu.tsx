import { useHierarchicalMenu } from 'react-instantsearch-hooks-web';

const CustomHierarchicalMenu = ({ attributes, limit }) => {
  const { items, refine } = useHierarchicalMenu({ attributes, limit});
  console.log("Items", items)
  items.map((item) => (
    console.log("Item: ", item.data)
  ))

  const handleItemClick = (item) => {
    refine(item.value);
  };

  return (
    <div className="flex flex-col space-y-2">
      {items.map((item) => (
        <div key={item.label}>
          <label className="flex items-center text-sm leading-5 text-left">
            <input
              type="checkbox"
              checked={item.isRefined}
              onChange={() => handleItemClick(item)}
              className="mr-2 focus:ring-0 focus:outline-none"
            />
            <span
              className={`${
                item.isRefined ? 'text-accent-8 underline' : 'text-accent-4'
              } hover:text-accent-5 focus:outline-none focus:text-accent-5`}
            >
              {item.label}
            </span>
          </label>
          {item.data && (
            <div className="mt-2 ml-4">
              {item.data.map((subItem) => (
                <label className="flex items-center text-sm leading-5 text-left mt-1" key={subItem.label}>
                  <input
                    type="checkbox"
                    checked={subItem.isRefined}
                    onChange={() => handleItemClick(subItem)}
                    className="mr-2 focus:ring-0 focus:outline-none"
                  />
                  <span
                    className={`${
                      subItem.isRefined ? 'text-accent-8 underline' : 'text-accent-4'
                    } hover:text-accent-5 focus:outline-none focus:text-accent-5`}
                  >
                    {subItem.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomHierarchicalMenu;
