import React, { useMemo } from "react";
import { Table, Typography } from "antd";
import { computeParty, excludeCollisions, getProductById } from "../../core/computing";
import { generateUUID, getNameByMember } from "../../core/utils";
import { Member, MemberProducts, Party, Product } from "../../core/types";

const { Title } = Typography;

const columns = [
	{
		title: 'Название',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Сколько',
		dataIndex: 'total',
		key: 'total',
		width: '12%',
	},
];

interface ResultTableProps {
	partyInfo: Record<string, string>,
	membersList: Member[],
	products: Product[],
	memberProducts: MemberProducts[],
}

export const ResultTable = ({partyInfo, memberProducts, products, membersList}: ResultTableProps): JSX.Element => {

	const resulObject = useMemo(() => {
		const party: Party = {
			name: partyInfo?.name ?? '',
			date: new Date(partyInfo.date).toDateString() ?? '',
			members: membersList,
			products,
			memberProducts
		};
		return party;
	}, [partyInfo, memberProducts, membersList, products])

	const result = useMemo(() => {
		return excludeCollisions(computeParty(resulObject))
	}, [resulObject])
	console.log(computeParty(resulObject));
	console.log('---')
	const tableData = result.map((item, idx) => {

		const children = [];

		for (const w of item.whom) {

			const chld = w.products.map(i => ({
				key: generateUUID(),
				name: getProductById(i.productId, products)?.name,
				total: i.total,
			}));

			children.push({
				key: generateUUID(),
				name: getNameByMember(w.memberId, membersList)?.name,
				total: w.total,
				children: chld
			})
		}

		return {
			key: idx,
			name: getNameByMember(item.memberId, membersList)?.name,
			children
		}
	})

	return (
		<div>
			<Title level={2}>{partyInfo.name}</Title>
			<Title level={3}>{resulObject.date}</Title>
			<Table
				pagination={false}
				bordered
				rowClassName={(record, index) => {
					console.log(record, index)
					return 'colors[index % colors.length]'
				}}
				columns={columns}
				dataSource={tableData}
			/>
		</div>
	)
}
