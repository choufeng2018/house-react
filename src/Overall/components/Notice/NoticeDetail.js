import React, {Component} from 'react';
import {Modal} from 'antd';
export default class NoticeDetail extends Component{
    render(){
        const {notice_detail = "", notice_content = "", actions:{setNoticeDetail}} = this.props;
        console.log(notice_content);
        return (
            <Modal
                title="具体新闻"
                visible = {notice_detail}
                width="50%"
                onOk = {() => {
                    setNoticeDetail(false)
                }}
                onCancel = {() => {
                    setNoticeDetail(false)
                }}
                footer = {null}
            >
                <p style={{"textIndent":'2em'}} dangerouslySetInnerHTML={{__html:notice_content}}></p>
            </Modal>
        )
    }
}
