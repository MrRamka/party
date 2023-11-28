import React, { useCallback, useMemo, useState } from "react";
import { Steps as AntSteps } from 'antd';
import { steps } from "./steps";
import { PartyForm } from "../Forms/PartyForm";
import './styles.css'
import { PartySteps } from "./types";
import { MembersForm } from "../Forms/MembersForm";
import { ProductsForm } from "../Forms/ProductsForm";
import { Member, MemberProducts, Product } from "../../core/types";
import { MemberProductForm } from "../Forms/MemberProductForm";
import { ResultTable } from "../ResultTable/ResultTable";

export const Steps = (): JSX.Element => {

	const [current, setCurrent] = useState<PartySteps>(PartySteps.PARTY_NAME);
	const [partyInfo, setPartyInfo] = useState<Record<string, string>>({});
	const [membersList, setMembersList] = useState<Member[]>([]);
	const [products, setProductsList] = useState<Product[]>([])
	const [memberProducts, setMemberProducts] = useState<MemberProducts[]>([])

	const onFinishPartyName = useCallback((values: any) => {
		// name "" date ""
		setPartyInfo(values);
		setCurrent(PartySteps.MEMBERS)
	}, []);

	const onFinishMembers = useCallback((values: any) => {
		// array names[]
		const list = values?.names?.map((name: string, index: number) => ({ id: index + 1, name })) ?? []
		setMembersList(list)
		setCurrent(PartySteps.PRODUCTS)
	}, []);

	const onFinishProducts = useCallback((values: any) => {
		const list = values?.products?.map((product: Partial<Product>, index: number) => (
			{ id: index + 1, ...product })
		) ?? []
		setProductsList(list)
		setCurrent(PartySteps.WHO_WHAT)
	}, []);

	const onFinishMemberProduct = useCallback((value: any) => {
		setMemberProducts(value?.memberProducts);
		setCurrent(PartySteps.RESULT)
	}, [])


	const renderSteps = useMemo(() => {
		switch (current) {
			case PartySteps.PARTY_NAME:
				return <PartyForm onFinish={onFinishPartyName}/>
			case PartySteps.MEMBERS:
				return <MembersForm onFinish={onFinishMembers}/>
			case PartySteps.PRODUCTS:
				return <ProductsForm members={membersList} onFinish={onFinishProducts}/>
			case PartySteps.WHO_WHAT:
				return <MemberProductForm members={membersList} products={products} onFinish={onFinishMemberProduct}/>
			case PartySteps.RESULT:
				return <ResultTable products={products} memberProducts={memberProducts} membersList={membersList}
									partyInfo={partyInfo}/>
		}
		return <></>
	}, [current, onFinishPartyName, onFinishMembers, membersList, onFinishProducts, products, onFinishMemberProduct, partyInfo, memberProducts])

	return (
		<>
			<AntSteps current={current} items={steps}/>
			<div className="wrapper">
				{renderSteps}
			</div>
		</>
	)
}
