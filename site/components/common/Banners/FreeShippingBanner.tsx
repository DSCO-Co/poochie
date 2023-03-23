import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';

export function FreeShippingBanner() {
  const [isVisible, setIsVisible] = useState(true);

  function handleClose() {
    setIsVisible(false);
  }

  return (
    <>
      {isVisible && (
        <div className="h-[44px] w-screen relative flex items-center gap-x-6 bg-[#EE7E7B] py-2.5 px-6 sm:before:flex-1">
          <p className="text-sm leading-6 text-white">
            <strong className="font-bold">Free Shipping on Orders over $100</strong>
          </p>
          <div className="flex flex-1 justify-end">
            <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]" onClick={handleClose}>
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
