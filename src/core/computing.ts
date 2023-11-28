import { MemberProducts, MemberResult, Party, Product, WhomI } from "./types";

export const computeProductMap = (memberProducts: MemberProducts[]) => {
	const productMap: Record<string, number> = {}
	for (const memberProduct of memberProducts) {
		const { productIds } = memberProduct;
		for (const productId of productIds) {
			if (productId in productMap) {
				productMap[productId] += 1
			} else {
				productMap[productId] = 1
			}

		}
	}
	return productMap;
}

export const getProductById = (id: number, products: Product[]): Product | undefined => {
	return products.find(product => product.id === id);
}

export const computeParty = (party: Party): MemberResult[] => {

	const { memberProducts, members, products } = party;

	const productMap = computeProductMap(memberProducts);

	const result = []

	for (const member of members) {
		const { id } = member;

		// все что ел текущий member
		const currentMemberProducts = memberProducts.find(memberProduct => memberProduct.memberId === id)

		// ничего не ел
		if (!currentMemberProducts) {
			break;
		}
		const whom: WhomI[] = []

		// по всем продуктам, которые ел чувак
		for (const currentMemberProductId of currentMemberProducts.productIds) {
			// количество людей за продукт
			const memberAmountPerProduct = productMap[currentMemberProductId]

			// продукт
			const product = getProductById(currentMemberProductId, products);

			// заглушка на undefined
			if (!product) {
				break;
			}

			// цена и покупатель продукта
			const { price, buyerId } = product;

			// проверяем на наличие покупателя в whom
			// если есть, то добавляем туд, если нет, то создаем

			const whomObj: WhomI | undefined = whom.find(whomMember => whomMember.memberId === buyerId);

			const whomPricePerProduct = Math.round(price / memberAmountPerProduct);

			// должен самому себе
			if (buyerId === id) {
				continue;
			}

			if (whomObj) {
				// нашли и обновили значения
				whomObj.total += whomPricePerProduct;
				whomObj.products.push({
					productId: currentMemberProductId,
					total: whomPricePerProduct
				})
			} else {
				// не нашли и создали
				const newWhomObj: WhomI = {
					memberId: buyerId,
					total: whomPricePerProduct,
					products: [
						{
							productId: currentMemberProductId,
							total: whomPricePerProduct
						}
					]
				}
				whom.push(newWhomObj)
			}

		}

		const memberResult: MemberResult = {
			memberId: id,
			whom
		}

		result.push(memberResult);
	}

	return result;
}


export const excludeCollisions = (memberResults: MemberResult[]): MemberResult[] => {

	for (const memberResult of memberResults) {
		// смотрим всех кому должен
		const { whom, memberId: currentMemberId } = memberResult;

		for (const whomMember of whom) {
			//смотрим всех кому должен кому мы должны
			//смотрим whom whoma

			const whomMemberResult = memberResults.find(memResult =>
				memResult.memberId === whomMember.memberId)

			if (whomMemberResult){

				// находим текущего пользователя в списке whom того кому должны мы
				const whomWhomMember = whomMemberResult.whom.find(w => w.memberId === currentMemberId);

				//нашли
				if (whomWhomMember){
					//сравниваем долги
					const currentMemberTotal = whomMember.total;

					const whomWhomMemberTotal = whomWhomMember.total;

					if (currentMemberTotal > whomWhomMemberTotal) {
						whomWhomMember.total = 0
						whomMember.total = currentMemberTotal - whomWhomMemberTotal;
					} else {
						whomMember.total = 0
						whomWhomMember.total = whomWhomMemberTotal - currentMemberTotal;
					}
				}
			}

		}

	}


	return memberResults;
}
