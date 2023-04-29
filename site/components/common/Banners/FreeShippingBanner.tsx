import { XMarkIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

export function FreeShippingBanner() {
  const [isVisible, setIsVisible] = useState(true)

  function handleClose() {
    setIsVisible(false)
  }

  return (
    <>
      {isVisible && (
        <div className="h-[44px] w-screen relative flex items-center gap-x-6 bg-pink-super py-2.5 px-6 before:flex-1">
          <p className="text-sm leading-6 text-white">
            <strong className="font-bold">
              Free Shipping on Orders over $100
            </strong>
          </p>
          <div className="flex justify-end flex-1">
            <button
              type="button"
              className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
              onClick={handleClose}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="w-5 h-5 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
