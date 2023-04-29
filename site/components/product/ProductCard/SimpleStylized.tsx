import WishlistButton from '@components/wishlist/WishlistButton'
import Image from 'next/image'
const placeholderImg = '/product-img-placeholder.svg'

export const SimpleStylizedCard = ({
  product,
  price,
  s,
  imgProps,
  addToCart,
  loading,
  item,
}) => {
  return (
    <>
      <div className="relative flex flex-col h-full text-sm rounded-xl bg-secondary-2 group ">
        <div className="flex-grow p-1 overflow-hidden max-h-56">
          <Image
            alt={product.name || 'Product Image'}
            className="object-contain overflow-hidden rounded-lg aspect-square"
            src={product.images[0]?.url || placeholderImg}
            height={500}
            width={500}
            quality="85"
            {...imgProps}
          />
        </div>
        <div className="py-3 rounded-b-lg bg-secondary-2">
          <h3 className="font-medium text-center text-gray-900">
            {product.name}
          </h3>
          <div className="pt-4 text-lg font-bold text-center text-gray-900 dark:text-white">
            {`${price} ${product.price?.currencyCode}`}
          </div>
        </div>
        <WishlistButton
          className="absolute top-2 right-2"
          productId={product.id}
          variant={product.variants[0]}
        />
        <div className="absolute top-2 left-2">
          {/* <div>
            <div
              className="mx-1 my-3 text-xs font-bold tracking-wide uppercase text-pink-super bg-secondary-2"
              style={{
                backgroundColor: 'white',
                border: '1px solid var(--pink-super)',
                boxShadow: '4px 4px 0px 0px var(--pink-super)',
                padding: '4px',
              }}
            >
              Sale
            </div>
          </div> */}
          {/* <div className="absolute p-1 bg-orange-500 top-1 left-1" /> */}
        </div>
        {/* <Button
          aria-label="Add to Cart"
          className="opacity-0 group-hover:opacity-100 absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-1 py-0.5 bg-black text-white font-semibold rounded-md whitespace-nowrap"
          onClick={(e) => {
            e.preventDefault()
            addToCart()
            trackProductAdded()
          }}
          type="button"
          loading={loading}
          disabled={item?.availableForSale === false}
        >
          {item?.availableForSale === false ? 'Not Available' : 'Add To Cart'}
        </Button> */}
      </div>
    </>
  )
}
