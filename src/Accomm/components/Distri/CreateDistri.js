import React, {Component} from 'react';
import {Button, Table, Modal, Divider, Notification, Cascader, Form, Row, Col, Input, DatePicker, Select} from 'antd';
import {Icon} from 'react-fa';
import moment from 'moment';
const FormItem = Form.Item;
const {Option} = Select;
class CreateDistri extends Component{
    constructor(props){
        super(props);
        this.state = {
            dor_name: '',
            stu_no: ''
        }
    }
    async ok(){
        const {selectNode = [], distriDor = {show: false, type: 'add'}, actions: {showDistriDor, postDistri, is_fresh, putDistri}, form: {validateFields}} = this.props;
        validateFields(async (err, values) => {
            if (!err) {
                let data = {
                    owner_no: values['owner_no'],
                    owner_name: values['owner_name'],
                    owner_birth: values['owner_birth'],
                    owner_sex: values['owner_sex'],
                    owner_house: this.state.dor_name,
                    owner_live: values['owner_live'],
                    owner_tel: values['owner_tel'],
                    owner_pay: values['owner_pay']
                }
                if (distriDor.type === "add") {
                    let rst = await postDistri({},data);
                    if (rst[0].status === "ok") {
                        Notification.success({
                            message: '录入成功'
                        });
                        is_fresh({
                            fre: true,
                            dor_no: this.state.dor_name
                        });
                    }else{
                        Notification.success({
                            message: '录入失败'
                        })
                    }
                }else{
                    let rst = await putDistri({},data);
                    if (rst[0].status === "ok") {
                        Notification.success({
                            message: '录入成功'
                        });
                        is_fresh({
                            fre: true,
                            dor_no: this.state.dor_name
                        });
                    }else{
                        Notification.success({
                            message: '录入失败'
                        })
                    }
                }
                showDistriDor({show: false});
            }
        })
    }
    cancel(){
        const {selectNode = [], actions: {showDistriDor}} = this.props;
        showDistriDor({show: false});
    }
    displayRender(label) {
        return label[label.length - 1];
    }
    change(value){
        let stu_no = value[2];
        this.setState({stu_no});
    }
    componentWillReceiveProps(nextProps){
        let {node = []} = nextProps;

    }
    componentDidMount(){
        const {distriDor = {type: 'add'}, form: {setFieldsValue}, editData, node = []} = this.props;
        if (distriDor.type === 'edit') {
            setFieldsValue({
                owner_no: editData.owner_no,
                owner_name: editData.owner_name,
                owner_pay: editData.owner_pay,
                owner_sex: editData.owner_sex,
                owner_tel: editData.owner_tel,
                owner_live: editData.owner_live,
                owner_birth: moment(editData.owner_birth),
                owner_house: editData.owner_house
            })
        }
        if (node.length === 0) {
            return;
        }
        let dor_name = node[0].dor_name;
        this.setState({dor_name});
    }
    findData(originData, stu_no){
        for (var i = 0; i < originData.length; i++) {
            if (originData[i].stu_name === stu_no) {
                return originData[i]
            }
        }
    }
    render(){
        const {distriDor = {show: false, type: 'add'}, editData = {}, form: {getFieldDecorator, setFieldsValue}} = this.props;
        const formItemLayout = {
			labelCol: {span:8},
			wrapperCol: {span: 12, offset:1},
		};
        return (
            <Modal
                visible = {distriDor.show}
                onOk = {this.ok.bind(this)}
                onCancel = {this.cancel.bind(this)}
                width = "35%"
            >
                <h1>业主登记</h1>
                <Divider><Icon name='cut' /></Divider>
                <Form>
                    <Row>
                        <Col>
                            <FormItem {...formItemLayout}  label = '房屋号'>
                                <span>{this.state.dor_name}</span>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label = '业主身份证号' {...formItemLayout}>
                                {getFieldDecorator('owner_no',{
                                    rules: [{pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, required: true, message: '请输入正确的身份证号'}]
                                })(
                                    <Input type = 'text' placeholder = '请输入身份证号'/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label = '业主姓名' {...formItemLayout}>
                                {getFieldDecorator('owner_name',{
                                    rules: [{required: true, message: '请输入正确的姓名'}]
                                })(
                                    <Input type = 'text' placeholder = '请输入姓名'/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label = '业主性别' {...formItemLayout}>
                                {getFieldDecorator('owner_sex',{
                                    rules: [{required: true, message: '请选择性别'}]
                                })(
                                    <Select placeholder = '请选择性别'>
                                        <Option value = '男'>男</Option>
                                        <Option value = '女'>女</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label = '出生年月' {...formItemLayout}>
                                {getFieldDecorator('owner_birth',{
                                    rules: [{required: true, message: '请选择出生年月'}],
                                })(
                                    <DatePicker style = {{width: '212px'}} placeholder = '请选择出生年月'/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label = '联系电话' {...formItemLayout}>
                                {getFieldDecorator('owner_tel',{
                                    rules: [{required: true, message: '请输入联系电话', pattern: /^[1][3,4,5,7,8][0-9]{9}$/}]
                                })(
                                    <Input placeholder = '请输入联系电话'/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label = '是否已经入住' {...formItemLayout}>
                                {getFieldDecorator('owner_live',{
                                    rules: [{required: true, message: '请选择是否入住'}]
                                })(
                                    <Select placeholder = '请选择是否入住'>
                                        <Option value = '已入住'>已入住</Option>
                                        <Option value = '未入住'>未入住</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label = '支付方式' {...formItemLayout}>
                                {getFieldDecorator('owner_pay',{
                                    rules: [{required: true, message: '请选择支付方式'}]
                                })(
                                    <Select placeholder = '请选择支付方式'>
                                        <Option value = '分期'>分期</Option>
                                        <Option value = '全款'>全款</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }
}
export default Form.create()(CreateDistri);
