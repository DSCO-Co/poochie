export default function useWishlistActions(): {
    addItem: (input: import("../api/wishlist").ItemBody) => Promise<import("./use-wishlist").Wishlist>;
    removeItem: (input: import("./use-remove-item").RemoveItemInput) => Promise<import("./use-wishlist").Wishlist | null>;
};
