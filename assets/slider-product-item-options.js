document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll(".slider-item__options").forEach((select) => {
		select.addEventListener("change", function () {
			const selectedOption = this.options[this.selectedIndex]
			const parentCard = this.closest(".slider-product-proposal__slider-item")

			if (!selectedOption) return

			const priceElement = parentCard.querySelector(".slider-item__money")
			const imageElement = parentCard.querySelector(".slider-item__picture")
			const addToCartButton = parentCard.querySelector(
				".slider-item__submit_button"
			)
			const soldOutMessage = parentCard.querySelector(".sold-out-message")
			const inputVariant = parentCard.querySelector('input[name="id"]')
			const saleBadge = parentCard.querySelector(".badge--sale")
			const soldOutBadge = parentCard.querySelector(".badge--sold-out")

			priceElement.textContent = selectedOption.getAttribute("data-price")
			imageElement.src = selectedOption.getAttribute("data-image")
			inputVariant.value = selectedOption.value

			if (selectedOption.getAttribute("data-available") === "false") {
				addToCartButton.disabled = true
				addToCartButton.querySelector("span").textContent = ""
				soldOutMessage.classList.remove("hidden")
				soldOutBadge.classList.remove("hidden")
			} else {
				addToCartButton.disabled = false
				addToCartButton.querySelector("span").textContent = "Add to cart"
				soldOutMessage.classList.add("hidden")
				soldOutBadge.classList.add("hidden")
			}

			const compareAtPriceRaw =
				selectedOption.getAttribute("data-compare-price") || "0"
			const currentPriceRaw = selectedOption.getAttribute("data-price") || "0"

			const compareAtPrice = parseFloat(
				compareAtPriceRaw.replace(/[^0-9.]/g, "")
			)
			const currentPrice = parseFloat(currentPriceRaw.replace(/[^0-9.]/g, ""))

			if (compareAtPrice > currentPrice) {
				saleBadge.classList.remove("hidden")
			} else {
				saleBadge.classList.add("hidden")
			}
		})
	})
})
