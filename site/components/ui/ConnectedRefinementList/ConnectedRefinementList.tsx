import { connectRefinementList } from 'react-instantsearch-dom';
import React, { useState } from 'react';


const CustomRefinementList = ({ items, refine, attribute }) => {
  const [dropdown, setDropdown] = useState(null);

  const handleDropdownClick = (index) => {
    setDropdown(dropdown === index ? null : index);
  };

  return (
    <div className="flex flex-col space-y-2">
      {items.map((item, index) => (
        <div key={item.label}>
          <button
            onClick={() => {
              refine(item.value);
              handleDropdownClick(index);
            }}
            className={`text-sm leading-5 text-left ${
              item.isRefined ? 'text-accent-8 underline' : 'text-accent-4'
            } hover:text-accent-5 focus:outline-none focus:text-accent-5`}
          >
            {item.label} ({item.count})
          </button>
          {dropdown === index && attribute === 'category' && (
            <div className="ml-4 mt-2">
              <ConnectedRefinementList attribute="subCategory" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};



const ConnectedRefinementList = connectRefinementList(CustomRefinementList);

export default ConnectedRefinementList;

  
