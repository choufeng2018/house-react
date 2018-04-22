import React, {Component} from 'react';
import {Modal, Row, Col, Form, Notification, Input} from 'antd';
import moment from 'moment';
import {getCookie} from '../../../_platform/cookie';
const FormItem = Form.Item;
class SendOrder extends Component{
    constructor(props){
        super(props);
    }
    ok(){
        const {actions: {setWriteShow, isFresh, postRepair, putRepair},form: {validateFields}, showOrder = {type: 'add'}, editData} = this.props;
        validateFields(async (err, values) => {
            if (!err) {
                if (showOrder.type === 'add') {
                    let login_info = JSON.parse(getCookie('login'));
                    let person;
                    person = login_info[0].user_name || login_info[0].rel_name;
                    let data = {
                        code: moment().format("YYYYMMDDHHmmss"),
                        content: values['content'],
                        person: person,
                        place: values['place'],
                        tel: values['tel'],
                        remark: values['remark']
                    }
                    let rst = await postRepair({}, data);
                    if (rst[0].status === 'ok') {
                        Notification.success({
                            message: '报修成功'
                        })
                        isFresh(true);
                        setWriteShow({show:false});
                    }else{
                        Notification.success({
                            message: '报修失败'
                        })
                    }
                }else{
                    let data = {
                        code: editData.code,
                        content: values['content'],
                        person: values['person'],
                        place: values['place'],
                        tel: values['tel'],
                        remark: values['remark']
                    }
                    let rst = await putRepair({}, data);
                    if (rst[0].status === 'ok') {
                        Notification.success({
                            message: '报修成功'
                        })
                        isFresh(true);
                        setWriteShow({show:false});
                    }else{
                        Notification.success({
                            message: '报修失败'
                        })
                    }
                }
            }
        })
    }
    cancel(){
        const {actions: {setWriteShow}} = this.props;
        setWriteShow({show:false})
    }
    componentDidMount(){
        const {form: {setFieldsValue}, editData = {}, showOrder = {type: 'add'}} = this.props;
        if (showOrder.type === 'edit') {
            setFieldsValue({
                'content': editData.content,
                'person': editData.person,
                'place': editData.place,
                'tel': editData.tel,
                'remark': editData.remark
            })
        }
    }
    render(){
        const formItemLayout = {
			labelCol: {span: 8},
			wrapperCol: {span: 16},
		};
        const {showOrder = {show:false, type: 'add'}, form:{getFieldDecorator}} = this.props;
        return (
            <Modal
                visible = {showOrder.show}
                width = '40%'
                onOk = {this.ok.bind(this)}
                onCancel = {this.cancel.bind(this)}
            >
                <h1 style={{textAlign:'center'}}>填写报修单</h1>
                <Form>
                    <Row>
                        <Col span = {16} offset = {3}>
                            <FormItem {...formItemLayout} label = '报修内容'>
                                {getFieldDecorator('content',{
                                    rules: [{required: true, message: '请输入报修内容'}],
                                    initialValue: ''
                                })(
                                    <Input type='text' placeholder='请输入报修内容'/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span = {16} offset = {3}>
                            <FormItem {...formItemLayout} label = '维修地点'>
                                {getFieldDecorator('place',{
                                    rules: [{required: true, message: '请输入维修地点'}],
                                    initialValue: ''
                                })(
                                    <Input type='text' placeholder='请输入维修地点'/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span = {16} offset = {3}>
                            <FormItem {...formItemLayout} label = '联系方式'>
                                {getFieldDecorator('tel',{
                                    rules: [{pattern: /^1[34578][0-9]{9}$/, message: '请输入正确的手机号'}],
                                    initialValue: ''
                                })(
                                    <Input type='text' placeholder='请输入联系方式'/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span = {16} offset = {3}>
                            <FormItem {...formItemLayout} label = '备注'>
                                {getFieldDecorator('remark',{
                                    rules: [{required: false, message: '请输入备注'}],
                                    initialValue: ''
                                })(
                                    <Input type='text' placeholder='请输入备注'/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }
}
export default Form.create()(SendOrder)
