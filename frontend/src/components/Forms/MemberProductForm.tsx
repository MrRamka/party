import React, { useMemo } from "react";
import { AutoComplete, Button, DatePicker, Form, Input, InputNumber, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import './styles.css'
import { Member, Product } from "../../core/types";

interface ProductsFormProps {
	members: Member[],
	products: Product[],
	onFinish?: (values: any) => void;
	onFinishFailed?: () => void;
}

export const MemberProductForm = ({ onFinish, onFinishFailed, members, products }: ProductsFormProps): JSX.Element => {

	const memberOptions = useMemo(() => members.map(member => ({ value: member.id, label: member.name })), [members]);
	const productOptions = useMemo(() => products.map(product => ({ value: product.id, label: product.name })), [products]);

	return (
		<Form
			name="basic"
			style={{ maxWidth: 600 }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
			layout="vertical"
			requiredMark={false}
		>
			<Form.List name="memberProducts">
				{(fields, { add, remove }) => (
					<>
						{fields.map(({ key, name, ...restField }) => (
							<Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="start">
								<Form.Item
									{...restField}
									name={[name, 'memberId']}
									rules={[{ required: true, message: 'Выберите имя участника' }]}
								>
									<Select
										placeholder="Участник"
										style={{ minWidth: 200 }}
										options={memberOptions}
									/>
								</Form.Item>
								<Form.Item
									{...restField}
									name={[name, 'productIds']}
									rules={[{ required: true, message: 'Продукты' }]}
								>
									<Select
										placeholder="Продукты"
										style={{ minWidth: 200 }}
										options={productOptions}
										mode='multiple'
									/>
								</Form.Item>
								<MinusCircleOutlined
									className="dynamic-delete-button"
									onClick={() => remove(name)}
								/>
							</Space>
						))}
						<Form.Item>
							<Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
								Добавить кто что ел
							</Button>
						</Form.Item>
					</>
				)}
			</Form.List>

			<Form.Item wrapperCol={{ span: 16 }}>
				<Button type="primary" htmlType="submit">
					Далее
				</Button>
			</Form.Item>
		</Form>
	)

}
