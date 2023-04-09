import Image from 'next/image'

const placeholderImg = '/product-img-placeholder.svg'
export const SlimCard = ({ product, imgProps }) => {
    return (
        <>
            <div className="flex items-center justify-center">
                {product?.images && (
                    <Image
                        quality="85"
                        src={product.images[0]?.url || placeholderImg}
                        alt={product.name || 'Product Image'}
                        height={320}
                        width={320}
                        {...imgProps}
                    />
                )}
                <div className="absolute bottom-0 right-0">
                    <h3 className="inline-block p-3 m-4 font-bold break-words bg-accent-9 text-accent-0 text-l">
                        {product.name}
                    </h3>
                </div>
            </div>
        </>
    )
}