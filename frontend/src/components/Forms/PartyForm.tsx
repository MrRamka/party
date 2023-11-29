import React from "react";
import { Button, DatePicker, Form, Input } from "antd";


interface PartyFormProps {
	onFinish?: (values: any) => void;
	onFinishFailed?: () => void;
}

export const PartyForm = ({ onFinish, onFinishFailed }: PartyFormProps): JSX.Element => {

	return (
		<Form
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			style={{ maxWidth: 600 }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
			layout="vertical"
			requiredMark={false}
		>
			<Form.Item
				label="Название мероприятия"
				name="name"
				rules={[{ required: true, message: 'Введите название мероприятия' }]}
			>
				<Input/>
			</Form.Item>

			<Form.Item
				label="Дата мероприятия"
				name="date"
				rules={[{ required: true, message: 'Введите дату мероприятия' }]}
			>
				<DatePicker style={{ width: '100%' }}/>
			</Form.Item>

			<Form.Item wrapperCol={{ span: 16 }}>
				<Button type="primary" htmlType="submit">
					Далее
				</Button>
			</Form.Item>
		</Form>
	)

}
