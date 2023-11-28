import React, { useMemo } from "react";
import { AutoComplete, Button, DatePicker, Form, Input, InputNumber, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import './styles.css'
import { Member } from "../../core/types";

interface ProductsFormProps {
	members: Member[]
	onFinish?: (values: any) => void;
	onFinishFailed?: () => void;
}

export const ProductsForm = ({ onFinish, onFinishFailed, members }: ProductsFormProps): JSX.Element => {

	const options = useMemo(() => members.map(member => ({ value: member.id, label: member.name })), [members]);

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
			<Form.List name="products">
				{(fields, { add, remove }) => (
					<>
						{fields.map(({ key, name, ...restField }) => (
							<Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="start">
								<Form.Item
									{...restField}
									name={[name, 'name']}
									rules={[{ required: true, message: 'Введите название продукта' }]}
								>
									<Input placeholder="Название продукта"/>
								</Form.Item>
								<Form.Item
									{...restField}
									name={[name, 'price']}
									rules={[{ required: true, message: 'Введите цену продукта' }]}
								>
									<InputNumber addonAfter="₽"/>
								</Form.Item>
								<Form.Item
									{...restField}
									name={[name, 'buyerId']}
									rules={[{ required: true, message: 'Выберите имя покупателя' }]}
								>
									<Select
										placeholder="Покупатель"
										style={{ minWidth: 125 }}
										options={options}
									/>
								</Form.Item>
								<MinusCircleOutlined
									className="dynamic-delete-button"
									onClick={() => remove(name)}
								/>
							</Space>
						))}
						<Form.Item>
							<Button type="dashed" onClick={() => add({ price: 100 })} block icon={<PlusOutlined/>}>
								Добавить продукт
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
