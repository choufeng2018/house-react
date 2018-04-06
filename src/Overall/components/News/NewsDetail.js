import React, {Component} from 'react';
import {Modal} from 'antd';
export default class NewsDetail extends Component{
    render(){
        const {news_detail = "", news_content = "", actions:{setNewsDetail}} = this.props;
        return (
            <Modal
                title="内容详情"
                visible = {news_detail}
                width="50%"
                onOk = {() => {
                    setNewsDetail(false)
                }}
                onCancel = {() => {
                    setNewsDetail(false)
                }}
                footer = {null}
            >
                <p style={{"textIndent":'2em'}} dangerouslySetInnerHTML={{__html:news_content}}></p>
            </Modal>
        )
    }
}
