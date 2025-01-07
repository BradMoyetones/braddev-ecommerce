export function formatPrice(price: number) {
    const priceFormated = new Intl.NumberFormat('en-ES', {
        style: "currency",
        currency: "EUR"
    })

    const finalPrice = priceFormated.format(price)

    return finalPrice
}