export declare function formatPrice({ amount, currencyCode, locale, }: {
    amount: number;
    currencyCode: string;
    locale: string;
}): string;
export declare function formatVariantPrice({ amount, baseAmount, currencyCode, locale, }: {
    baseAmount: number;
    amount: number;
    currencyCode: string;
    locale: string;
}): {
    price: string;
    basePrice: string | null;
    discount: string | null;
};
export default function usePrice(data?: {
    amount: number;
    baseAmount?: number;
    currencyCode: string;
} | null): {
    price: string;
    basePrice: string | null;
    discount: string | null;
} | {
    price: string;
};
