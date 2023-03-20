import { XMarkIcon } from '@heroicons/react/20/solid'

export function FreeShippingBanner() {
  return (
    <div className=" w-screen fixed flex items-center gap-x-6 bg-[#EE7E7B] py-2.5 px-6 sm:before:flex-1">
      <p className="text-sm leading-6 text-white">
          <strong className=" font-bold">Free Shipping on Orders over $100</strong>
      </p>
      <div className="flex flex-1 justify-end">
        <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
          <span className="sr-only">Dismiss</span>
          <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
