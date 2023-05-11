import React, { useState } from 'react';
import { useSearchBox, useHits, InstantSearch } from 'react-instantsearch-hooks-web';
import searchClient from '../AlgoliaSearchClient/searchClient';
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

// AlgoliaSearchBar component
function AlgoliaSearchBar() {
  const [query, setQuery] = useState('');
  const { refine } = useSearchBox();
  const hits = useHits();
  const router = useRouter();

  const handleInput = (event) => {
    const newQuery = event.target.value;
    refine(newQuery);
    setQuery(newQuery);
    
    // If the current URL contains 'collections', change it to '/search'
    if (router.asPath.includes('collections')) {
      router.push('/search');
    }
  };

  const handleBlur = () => {
    setTimeout(() => setQuery(''), 200);
  };

  return (
    <div className="relative z-50 w-full lg:w-[500px]">
      <InstantSearch searchClient={searchClient} indexName="DEVELOPMENT_Products">
        <input
          type="search"
          placeholder="Search for products"
          value={query}
          onChange={handleInput}
          onBlur={handleBlur}
          className="w-full rounded-lg border px-4 py-2"
        />
        {query && (
          <ul className="absolute w-full bg-white border rounded-lg mt-2 overflow-hidden">
            {hits.hits.slice(0, 5).map(hit => (
              <Link href={`${hit.path}`}>
                <li key={hit.objectID} className="px-4 py-2 flex items-center">
                  <div className="mr-3">
                    <Image 
                      src={hit.image_thumbnail as string} 
                      alt={hit.name as string}
                      width={50} 
                      height={50} 
                    />
                  </div>
                  <div className="flex flex-col h-full text-sm bg-white group">
                    <h3 className="font-medium text-left text-gray-900">
                      {hit.name as string}
                    </h3>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </InstantSearch>
    </div>
  );
}

export default AlgoliaSearchBar;
