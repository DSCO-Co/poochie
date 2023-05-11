import { createElement, Fragment, useEffect, useRef } from 'react';
import { createRoot } from "react-dom/client";

import { autocomplete } from '@algolia/autocomplete-js';

import type { AutocompleteOptions } from '@algolia/autocomplete-js';
import type { BaseItem } from '@algolia/autocomplete-core';

import '@algolia/autocomplete-theme-classic';
import React from 'react';

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>>;

export function Autocomplete(props: AutocompleteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRoot = useRef(null);


  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const search = autocomplete({
      ...props,
      container: containerRef.current,
      //@ts-ignore
      renderer: {
        createElement: React.createElement,
        Fragment: React.Fragment,
    },
    render({ children }, root) {
        if (!panelRoot.current) {
          //@ts-ignore
            panelRoot.current = createRoot(root);
        }
        //@ts-ignore
        panelRoot.current!.render(children);
    },
    });

    return () => search.destroy();
  }, [props]);

  return <div ref={containerRef} />;
}
