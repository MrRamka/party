import React from "react";
import { Button, Form, Input } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import './styles.css';

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 4 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 20 },
	},
};

const formItemLayoutWithOutLabel = {
	wrapperCol: {
		xs: { span: 24, offset: 0 },
		sm: { span: 20, offset: 4 },
	},
};
interface MembersFormProps {
	onFinish?: (values: any) => void;
	onFinishFailed?: () => void;
}

export const MembersForm = ({ onFinish, onFinishFailed }: MembersFormProps): JSX.Element => {

	return (
		<Form
			name="basic"
			style={{ maxWidth: 600 }}
			{...formItemLayoutWithOutLabel}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
			requiredMark={false}
		>
			<Form.List
				name="names"
				rules={[
					{
						validator: async (_, names) => {
							if (!names || names.length < 2) {
								return Promise.reject(new Error('Введите минимум двух участников'));
							}
						},
					},
				]}
			>
				{(fields, { add, remove }, { errors }) => (
					<>
						{fields.map((field, index) => (
							<Form.Item
								{...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
								label={index === 0 ? 'Участник' : ''}
								required={false}
								key={field.key}
							>
								<Form.Item
									{...field}
									validateTrigger={['onChange', 'onBlur']}
									rules={[
										{
											required: true,
											whitespace: true,
											message: "Введите участника или удалите это поле",
										},
									]}
									noStyle
								>
									<Input placeholder="Участник" style={{ width: '60%' }} />
								</Form.Item>
								{fields.length > 1 ? (
									<MinusCircleOutlined
										className="dynamic-delete-button"
										onClick={() => remove(field.name)}
									/>
								) : null}
							</Form.Item>
						))}
						<Form.Item>
							<Button
								type="dashed"
								onClick={() => add()}
								style={{ width: '60%' }}
								icon={<PlusOutlined />}
							>
								Добавить участника
							</Button>
							<Form.ErrorList errors={errors} />
						</Form.Item>
					</>
				)}
			</Form.List>

			<Form.Item wrapperCol={{ span: 16, offset: 4 }}>
				<Button type="primary" htmlType="submit" >
					Далее
				</Button>
			</Form.Item>
		</Form>
	)

}
