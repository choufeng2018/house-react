import React,{Component} from 'react';
import {Modal, Row, Col, Input, Form, Button, Notification} from 'antd';
import E from 'wangeditor';
import moment from 'moment';
const FormItem = Form.Item;
let editor;
class NewsModal extends Component{
    constructor(props) {
		super(props);
		this.state = {
			editorContent: "",
		}
	}
    componentDidMount(){
        setTimeout(() => {
            const {form:{setFieldsValue}, news_visible = {type:''}, editData} = this.props;
            const elem = this.refs.editorElem
            editor = new E(elem);
            // 将内容实时的保存起来
            editor.customConfig.onchange = html => {
                this.setState({
                    editorContent: html
                })
            }
            editor.create();
            if (news_visible.type === "edit") {
                // 记得加上对象
                setFieldsValue({'news_title': editData.news_title})
                editor.txt.html(editData.news_content)
            }
        },0)
    }
    postData(){
        const {actions:{setNewsShow, postNews, isFresh, putNews}, form:{validateFields}, news_visible = {show: false, type: 'edit'}} = this.props;
        validateFields(async (err, values) => {
            if (!err) {
                let news_data = {
                    news_title: values['news_title'],
                    news_content: this.state.editorContent,
                    news_time: moment().format("YYYY-MM-DD HH:mm:ss")
                }
                if (news_visible.type === 'add') {
                    let rst = await postNews({}, news_data)
                    if (rst[0].status === 'ok') {
                        Notification.success({
                            message: '发布成功'
                        })
                        setNewsShow(false);
                        isFresh(true);
                    }else{
                        Notification.success({
                            message: '发布失败'
                        })
                    }
                }else{
                    let rst = await putNews({}, news_data)
                    if (rst[0].status === 'ok') {
                        Notification.success({
                            message: '编辑成功'
                        })
                        setNewsShow(false);
                        isFresh(true);
                    }else{
                        Notification.success({
                            message: '编辑失败'
                        })
                    }
                }
            }
        })
    }
    cancel(){
        const {actions:{setNewsShow}} = this.props;
        setNewsShow(false);
    }
    render(){
        const formItemLayout = {
			labelCol: {span: 8},
			wrapperCol: {span: 16},
		};
        const {form:{getFieldDecorator}, news_visible = {show: false, type: 'edit'}} = this.props;
        return(
            <Modal
                title = '发布新闻'
                width = '80%'
                visible = {news_visible.show}
                footer = {null}
                maskClosable={true}
                onOk = {this.postData.bind(this)}
                onCancel = {this.cancel.bind(this)}
                >
                    <Form>
                        <Row>
                            <Col span={6} offset={1}>
                                {news_visible.type === 'edit' ? <FormItem {...formItemLayout} label = '新闻标题'>
                                    {getFieldDecorator('news_title', {
                                        rules: [{required: true, message: '请输入新闻标题'}],
                                        initialValue: ''
                                    })(
                                        <Input disabled type='text' placeholder = '新闻标题'/>
                                    )}
                                </FormItem> :
                                <FormItem {...formItemLayout} label = '新闻标题'>
                                    {getFieldDecorator('news_title', {
                                        rules: [{required: true, message: '请输入新闻标题'}],
                                        initialValue: ''
                                    })(
                                        <Input type='text' placeholder = '新闻标题'/>
                                    )}
                                </FormItem>
                            }
                            </Col>
                            <Col style={{marginTop:'4px'}} span={6} offset={1}>
                                <Button onClick={this.postData.bind(this)}>发布</Button>
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
export default Form.create()(NewsModal)
