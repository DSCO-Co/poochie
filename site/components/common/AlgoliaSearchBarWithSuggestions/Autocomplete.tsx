import { createElement, Fragment, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom';

import { autocomplete } from '@algolia/autocomplete-js';

import type { AutocompleteOptions } from '@algolia/autocomplete-js';
import type { BaseItem } from '@algolia/autocomplete-core';

import '@algolia/autocomplete-theme-classic';

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>>;

export function Autocomplete(props: AutocompleteProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const search = autocomplete({
      ...props,
      container: containerRef.current,
      //@ts-ignore
      renderer: { createElement, Fragment, render: (element, container) => createRoot(container).render(element) },
      // renderItem({ item, root }) {
      //   console.log('Suggestion item:', item); // Add this line to inspect suggestion items
      //   root.innerHTML = item.label;
      // },
    });

    return () => search.destroy();
  }, [props]);

  return <div ref={containerRef} />;
}
