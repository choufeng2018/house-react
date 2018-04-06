import React, {Component} from 'react';
import {Modal, Select, Col, Row, Form, Button, Input, Notification} from 'antd';
import E from 'wangeditor'
import moment from 'moment';
const {Option} = Select;
const FormItem = Form.Item;
let editor;
class NoticeModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            content: []
        }
    }
    componentDidMount(){
        setTimeout(() => {
            const {notice_visible:{type=''},notice_data, form:{setFieldsValue}} = this.props;
            const elem = this.refs.editorElem
            editor = new E(elem)

            editor.customConfig.onchange = (html) => {
                this.setState({
                    content: html
                })
            }
            editor.customConfig.zIndex = 1000;
            editor.create();
            if (type==='edit') {
                setFieldsValue({
                    'title': notice_data.title,
                    'importance': notice_data.importance
                })
                editor.txt.html(notice_data.content)
            }
        },0)
    }
    postNotice(){
        const {actions:{setNoticeShow, isFresh, postNotice, putNotice}, form:{validateFields}, notice_visible = {type:'', show: false}} = this.props;
        validateFields(async (err, values) => {
            if(!err){
                let data = {
                    title: values['title'],
                    importance: values['importance'],
                    time: moment().format("YYYY-MM-DD HH:mm:ss"),
                    content: this.state.content
                }
                if (notice_visible.type === 'add') {
                    let rst = await postNotice({}, data);
                    if (rst[0].status === 'ok') {
                        Notification.success({
                            message: '发布成功'
                        });
                        isFresh(true)
                        setNoticeShow({show: false})
                    }else{
                        Notification.warning({
                            message: '发布失败'
                        });
                    }
                }else{
                    let rst = await putNotice({}, data);
                    if (rst[0].status === 'ok') {
                        Notification.success({
                            message: '编辑成功'
                        });
                        isFresh(true)
                        setNoticeShow({show: false})
                    }else{
                        Notification.warning({
                            message: '编辑失败'
                        });
                    }
                }
            }
        })

    }
    cancel(){
        const {actions:{setNoticeShow}} = this.props;
        setNoticeShow({
            show: false
        })
    }
    render(){
        const formItemLayout = {
			labelCol: {span: 8},
			wrapperCol: {span: 16},
		};
        const {form:{getFieldDecorator}, notice_visible = {type:'', show: false}} = this.props;
        return (
            <Modal
                maskClosable={true}
                visible = {notice_visible.show}
                width="80%"
                title="发布公告"
                footer = {null}
                onCancel = {this.cancel.bind(this)}
            >
                <Form>
                    <Row>
                        <Col span={6} offset={1}>
                            {notice_visible.type === 'edit' ? <FormItem {...formItemLayout} label = '公告标题'>
                                {getFieldDecorator('title', {
                                    rules: [{required: true, message: '请输入公告标题'}],
                                    initialValue: ''
                                })(
                                    <Input type='text' disabled placeholder = '公告标题'/>
                                )}
                            </FormItem> :
                            <FormItem {...formItemLayout} label = '公告标题'>
                                {getFieldDecorator('title', {
                                    rules: [{required: true, message: '请输入公告标题'}],
                                    initialValue: ''
                                })(
                                    <Input type='text' placeholder = '公告标题'/>
                                )}
                            </FormItem>
                        }
                        </Col>
                        <Col span={6} offset={1}>
                            <FormItem {...formItemLayout} label = '重要程度'>
                                {getFieldDecorator('importance', {
                                    rules: [{required: true, message: '请选择重要程度'}],
                                    initialValue: ''
                                })(
                                    <Select>
                                        <Option value="高">高</Option>
                                        <Option value="中">中</Option>
                                        <Option value="低">低</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col style={{marginTop:'4px'}} span={6} offset={1}>
                            <Button onClick={this.postNotice.bind(this)}>发布</Button>
                            <Button onClick={this.cancel.bind(this)}>取消</Button>
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
export default Form.create()(NoticeModal)
