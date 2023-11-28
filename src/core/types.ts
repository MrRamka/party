export interface Member {
	id: number,
	name: string,
}

export interface Product {
	id: number,
	name: string,
	price: number,
	buyerId: number
}

export interface MemberProducts {
	memberId: number,
	productIds: number[],
}

export interface Party {
	name: string,
	date: string,
	members: Member[],
	products: Product[],
	memberProducts: MemberProducts[]
}

export interface WhomProduct {
	productId: number,
	total: number
}

export interface WhomI {
	memberId: number,
	total: number,
	products: WhomProduct[]
}

export interface MemberResult {
	memberId: number,
	whom: WhomI[]
}
