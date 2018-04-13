import React, {Component} from 'react';
import {Modal, Col, Row, Form, Input, Select, Notification} from 'antd';
import E from 'wangeditor';
import moment from 'moment';
import {getCookie} from '../../../_platform/cookie'
const Option = Select.Option;
const FormItem = Form.Item;
class ModalMsg extends Component{
    constructor(props){
        super(props);
        this.state = {
            options: []
        }
    }
    formItemlayout = {
        labelCol: {span: 7},
        wrapperCol: {span: 15}
    }
    ok(){
        const {actions: {postMessage, setShowCreate, isFresh}, form: {validateFields}} = this.props;
        let login_info = JSON.parse(getCookie('login'));
        validateFields(async (err, values) => {
            if (!err) {
                let data = {
                    msg_title: values['msg_title'],
                    msg_receive: values['msg_receive'],
                    msg_content: this.state.editorContent,
                    msg_time: moment().format('YYYY-MM-DD hh:mm:ss'),
                    msg_send: login_info[0].owner_name
                }
                let rst = await postMessage({},data);
                if (rst[0].status === 'ok') {
                    Notification.success({
                        message: '留言成功'
                    })
                    setShowCreate(false);
                    isFresh(true)
                }else{
                    Notification.warning({
                        message: '留言失败'
                    })
                }
            }
        })
    }
    cancel(){
        const {actions: {setShowCreate}} = this.props;
        setShowCreate(false);
    }
    getOption(dorAdmin){
        let options = dorAdmin.map((item, index) => {
            return <Option value = {item.doradmin_name}>{item.doradmin_name}</Option>
        })
        this.setState({options});
    }
    componentDidMount(){
        const {dorAdmin} = this.props;
        this.getOption(dorAdmin);
        setTimeout(() => {
            const elem = this.refs.editorElem
            let editor = new E(elem);
            // 将内容实时的保存起来
            editor.customConfig.onchange = html => {
                this.setState({
                    editorContent: html
                })
            }
            editor.create();
        },10)
    }
    render(){
        const {form: {getFieldDecorator}, showCreate, dorAdmin} = this.props;
        return (
            <Modal
                visible = {showCreate}
                width = '60%'
                onOk = {this.ok.bind(this)}
                onCancel = {this.cancel.bind(this)}
            >
                <Form style = {{marginTop: '10px'}}>
                    <Row>
                        <Col span={12}>
                            <FormItem {...this.formItemlayout} label = '留言标题'>
                                {getFieldDecorator('msg_title',{
                                    rules: [{required: true, message: '请输入标题'}]
                                })(
                                    <Input  />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...this.formItemlayout} label = '留言给'>
                                {getFieldDecorator('msg_receive',{
                                    rules: [{required: true, message: '请输入标题'}]
                                })(
                                    <Select>
                                        {this.state.options}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col span={22} offset={1}>
                        <div ref="editorElem"></div>
                    </Col>
                </Row>
            </Modal>
        )
    }
}
export default Form.create()(ModalMsg)
