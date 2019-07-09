import React from 'react';
import { connect } from 'dva';
import { Button, Table, Icon, Modal, Drawer, Row, Col, Divider } from 'antd';
import styles from '../basic/course.less';
import CreateForm from './CreateForm';
import ReviseFrom from './ReviseFrom';

class Create extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			form: {},
			ids: [],
			record_clazzVM: {},
			record_course: {},
			record_user: {},
			record_qnVM: {},
		};
	}

	componentWillMount() {
		this.props.dispatch({ type: 'create/fetchCreates' });
		this.props.dispatch({ type: 'create/findAllVM' });
		this.props.dispatch({ type: 'create/findAllCourse' });
		this.props.dispatch({ type: 'create/findAllQuestionnaire' });
		this.props.dispatch({ type: 'create/findAllEnabled' });
	}

	// 取消按钮的事件处理函数
	handleCancel = () => {
		this.props.dispatch({ type: 'create/changeVisible', payload: false });
	};

	// 确认按钮的事件处理函数
	handleCreate = () => {
		const form = this.formRef.props.form;
		form.validateFields((err, values) => {
			var values1 = new Array();
			values1 = {
				'id': values.id,
				'average': null,
				'status': values.status,
				'code':null,
				'surveydate':values.date,
				'courseId': values.courseID,
				'clazzId': values.clazz,
				'userId': values.userID,
				'questionnaireId': values.questionnaireId,
			};
			if (err) {
				return;
			}
			this.props.dispatch({ type: 'create/saveOrUpdateCreate', payload: values1 });
		});
	};

	// 添加
	toAdd = () => {
		this.props.dispatch({ type: 'create/changeVisible', payload: true });
		this.setState({ form: {} });
	};

	// 编辑
	toEdit = record => {
		this.setState({
			form: record,
		});
		this.props.dispatch({ type: 'create/changeVisible', payload: true });
	};

	// 预览课调 展示抽屉
	showDrawer = record => {
		this.setState({
			visible: true,
			record_clazzVM: record.clazzVM,
			record_course: record.course,
			record_user: record.user,
			record_qnVM: record.qnVM,
		},
			() => {
				// console.log('record',record)
			});
	}

	// 关闭抽屉
	onClose = () => {
		this.setState({
			visible: false,
		});
	};

	// 将子组件的引用在父组件中进行保存，方便后期调用
	saveFormRef = formRef => {
		this.formRef = formRef;
	};
	// 批量删除
	batchDeleteSurveyById() {
		let ids = this.state.ids;
		Modal.confirm({
			title: '确认删除选中的数据吗？',
			content: 'Do you confirm deletion?',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk: () => {
				// 编写代码进行删除
				this.props.dispatch({ type: 'create/batchDeleteSurveyById', payload: ids });
			},
			onCancel() { },
		});
	}
	// 通过id删除
	deleteSurveyById = id => {
		Modal.confirm({
			title: '确认删除吗？',
			content: 'Are you sure that you want to delete it?',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk: () => {
				// 编写代码进行删除
				this.props.dispatch({ type: 'create/deleteSurveyById', payload: id });
			},
			onCancel() { },
		});
	};

	// 开启课调
	beginSurvey = id => {
		Modal.confirm({
			title: '确认开启该课调吗？',
			content: 'Are you sure to start the survey?',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk: () => {
				// 编写代码进行开启
				this.props.dispatch({ type: 'create/beginSurvey', payload: id });
			},
			onCancel() { },
		});
	};

	render() {
		// const records1 =this.state.records
		// 抽屉
		const pStyle = {
			fontSize: 16,
			color: 'rgba(0,0,0,0.85)',
			lineHeight: '24px',
			display: 'block',
			marginBottom: 16,
		};

		const DescriptionItem = ({ title, content }) => (
			<div
				style={{
					fontSize: 14,
					lineHeight: '22px',
					marginBottom: 7,
					color: 'rgba(0,0,0,0.65)',
				}}
			>
				<p
					style={{
						marginRight: 8,
						display: 'inline-block',
						color: 'rgba(0,0,0,0.85)',
					}}
				>
					{title}:
			</p>
				{content}
			</div>
		);

		// 表格
		const columns = [
			{
				title: '年级',
				dataIndex: 'grade',
			},
			{
				title: '班级',
				dataIndex: 'clazz',
			},
			{
				title: '课程',
				dataIndex: 'coursename',
			},
			{
				title: '讲师',
				dataIndex: 'teacher',
			},
			{
				title: '问卷',
				dataIndex: 'survey',
			},
			{
				title: '创建时间',
				dataIndex: 'date',
			},
			{
				title: '状态',
				dataIndex: 'status',
			},
			{
				title: '编号',
				dataIndex: 'id',
			},
			{
				title: '操作',
				fixed: 'right',
				width: 100,
				render: (record) => {
					if (record.status === '开启') {
						return (
							<div>
								<a title="删除">
									<Icon type="delete" onClick={this.deleteSurveyById.bind(this, record.id)} />
								</a>
								&nbsp;
							<a title="编辑">
									<Icon type="edit" onClick={this.toEdit.bind(this, record)} />
								</a>
								&nbsp;
							<a title="预览">
									<Icon type="search" onClick={this.showDrawer.bind(this, record)} />
								</a>
								&nbsp;
								<a title="开启课调" style={{ cursor: 'not-allowed', disabled: 'true' }}>
									<Icon type="poweroff" />
								</a>
								&nbsp;
							</div>
						);
					} else {
						return (
							<div>
								<a title="删除">
									<Icon type="delete" onClick={this.deleteSurveyById.bind(this, record.id)} />
								</a>
								&nbsp;
							<a title="编辑">
									<Icon type="edit" onClick={this.toEdit.bind(this, record)} />
								</a>
								&nbsp;
							<a title="预览">
									<Icon type="search" onClick={this.showDrawer.bind(this, record)} />
								</a>
								&nbsp;
								<a title="开启课调" >
									<Icon type="poweroff" onClick={this.beginSurvey.bind(this, record.id)} />
								</a>
								&nbsp;
							</div>
						);
					}
				},
			},
		];

		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({ ids: selectedRowKeys });
			},
			getCheckboxProps: record => ({
				disabled: record.name === 'Disabled User', // Column configuration not to be checked
				name: record.name,
			}),
		};
		let userMessage;
		if (this.state.record_qnVM.questionVMs) {
			userMessage = (
				this.state.record_qnVM.questionVMs.map(item => {
					return (
						<div>
							<span>
								{item.name}
							</span>
							<span style={{ marginLeft: 20, padding: 3, backgroundColor: '#fdf6ec', borderColor: '#faecd8', color: '#e6a23c', width: 50, height: 20, fontSize: 10, borderRadius: 5 }}>
								{item.questionType}
							</span>
							<p style={{ marginLeft: 35, }}>
								{item.options.map(items => { return (<div><p>{items.label}: {items.name}</p></div>) })}
							</p>
						</div>
					);
				})
			)
		}

		return (
			<div className={styles.content}>
				{/* 按钮 */}
				<div>
					<Button className="btns" type="primary" onClick={this.toAdd}>
						添加
			</Button>

					<Button className="btns" type="danger" onClick={this.batchDeleteSurveyById.bind(this)} style={{ marginBottom: '0.5em', marginLeft: '0.5em' }}>
						批量删除
			</Button>
				</div>
				{/* 表格内容 */}
				<div>
					<Table
						bordered
						rowKey="id"
						size="small"
						rowSelection={{ rowSelection, fixed: 'left' }}
						columns={columns}
						dataSource={this.props.create.creates}
						scroll={{ x: 1300 }}
					/>
				</div>
				{/* 模态框 */}
				<CreateForm
					initData={this.state.form}
					wrappedComponentRef={this.saveFormRef}
					visible={this.props.create.visible}
					onCancel={this.handleCancel}
					onCreate={this.handleCreate}
				/>
				{/* 抽屉 */}
				<Drawer
					width={640}
					placement="right"
					closable={false}
					onClose={this.onClose}
					visible={this.state.visible}
				>
					<p
						style={{
							...pStyle,
							marginBottom: 24,
							fontWeight: 'bolder',
						}}
					>
						问卷预览
            </p>
					<Row>
						<Col span={12}>
							<DescriptionItem
								title="班级"
								content={this.state.record_clazzVM.name}
							/>
						</Col>
						<Col span={12}>
							<DescriptionItem
								title="讲师"
								content={this.state.record_user.nickname}
							/>
						</Col>
						<Col span={12}>
							<DescriptionItem
								title="课程"
								content={this.state.record_course.name}
							/>
						</Col>
						<Col span={12}>
							<DescriptionItem
								title="问卷"
								content={this.state.record_qnVM.name}
							/>
						</Col>
					</Row>
					<Divider />
					<Row >
						<DescriptionItem
							title="问卷"
							content={userMessage}
						/>
					</Row>
					<Divider />
				</Drawer>
			</div>
		);
	}
}

export default connect(({ create }) => ({
	create,
}))(Create);
