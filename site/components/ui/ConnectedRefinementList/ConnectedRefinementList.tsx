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
          <label className="text-sm leading-5 text-left flex items-center">
            <input
              type="checkbox"
              checked={item.isRefined}
              onChange={() => refine(item.value)}
              className="mr-2 focus:ring-0 focus:outline-none"
            />
            <button
              onClick={() => handleDropdownClick(index)}
              className={`${
                item.isRefined ? 'text-accent-8 underline' : 'text-accent-4'
              } hover:text-accent-5 focus:outline-none focus:text-accent-5`}
            >
              {item.label}
            </button>
          </label>
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

