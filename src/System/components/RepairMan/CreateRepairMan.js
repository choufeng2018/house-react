import React, {Component} from 'react';
import {Form, Col, Row, Modal, Input, Divider, Select, Notification} from 'antd';
import {Icon} from 'react-fa';
const FormItem = Form.Item;
const {Option} = Select;
class CreateRepairMan extends Component {
    constructor(props) {
        super(props);
    }
    formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 15, offset: 1}
    }
    ok(){
        const {actions: {postRepman, setCreateShow, isFresh, putRepman}, form: {validateFields}, createShow = {type: 'add'}} = this.props;
        validateFields(async (err, values) => {
            if (!err) {
                let data = {
                    repman_no: values['repman_no'],
                    user_name: values['user_name'],
                    repman_sex: values['repman_sex'],
                    repman_tel: values['repman_tel'],
                    repman_adr: values['repman_adr'],
                }
                if (createShow.type === 'add') {
                    let rst = await postRepman({},data);
                    if (rst[0].status === 'ok') {
                        Notification.success({
                            message: '录入成功'
                        })
                        setCreateShow(false);
                        isFresh(true)
                    }else{
                        Notification.success({
                            message: '录入失败'
                        })
                    }
                }else{
                    let rst = await putRepman({}, data);
                    if (rst[0].status === 'ok') {
                        Notification.success({
                            message: '变更成功'
                        })
                        setCreateShow(false);
                        isFresh(true)
                    }else{
                        Notification.success({
                            message: '变更失败'
                        })
                    }
                }
            }
        })
    }
    cancel(){
        const {actions: {setCreateShow}} = this.props;
        setCreateShow(false);
    }
    componentDidMount(){
        const {createShow = {show: false, type: 'edit'}, editData} = this.props;
        const {form: {setFieldsValue}} = this.props;
        if (createShow.type == 'edit') {
            setFieldsValue({
                repman_no: editData[0].repman_no,
                user_name: editData[0].user_name,
                repman_sex: editData[0].repman_sex,
                repman_tel: editData[0].repman_tel,
                repman_adr: editData[0].repman_adr,
            })
        }
    }
    componentWillReceiveProps(nextProps){

    }
    render(){
        const {form:{getFieldDecorator}, createShow = {show:false, type: 'add'}} = this.props;
        return (
            <Modal
                visible = {createShow.show}
                width = '30%'
                onOk = {this.ok.bind(this)}
                onCancel = {this.cancel.bind(this)}
            >
                {createShow.type === 'add' ? <h1>申请录入</h1>: <h1>申请变更</h1>}
                <Divider><Icon name='cut' /></Divider>
                <Form>
                    <Row>
                        <Col>
                            <FormItem {...this.formItemLayout} label = '工号'>
                                {getFieldDecorator('repman_no',{
                                    rules: [{required: true, message: '请输入工号'}],
                                    initialValue: ''
                                })(
                                    <Input type = 'text' placeholder = '请输入工号' />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem {...this.formItemLayout} label = '姓名'>
                                {getFieldDecorator('user_name',{
                                    rules: [{required: true, message: '请输入姓名'}],
                                    initialValue: ''
                                })(
                                    <Input type = 'text' placeholder = '请输入姓名' />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem {...this.formItemLayout} label = '性别'>
                                {getFieldDecorator('repman_sex',{
                                    rules: [{required: true, message: '请选择性别'}],
                                    initialValue: '男'
                                })(
                                    <Select>
                                        <Option value = '男'>男</Option>
                                        <Option value = '女'>女</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem {...this.formItemLayout} label = '联系方式'>
                                {getFieldDecorator('repman_tel',{
                                    rules: [{required: true, pattern: /^1(3|4|5|7|8|9)\d{9}$/, message: '手机号码格式有误'}],
                                    initialValue: ''
                                })(
                                    <Input type = 'text' placeholder = '请输入联系方式' />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem {...this.formItemLayout} label = '住址'>
                                {getFieldDecorator('repman_adr',{
                                    rules: [{required: true, message: '请输入住址'}],
                                    initialValue: ''
                                })(
                                    <Input type = 'text' placeholder = '请输入住址' />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }
}
export default Form.create()(CreateRepairMan);
