import React, {Component} from  'react';
import {Table, Divider} from 'antd';
import {Icon} from 'react-fa';
export default class HouseDetail extends Component{
    columns = [{
        title: '宿舍编号',
        dataIndex: 'dor_no',
        key: 'dor_no'
    },{
        title: '宿舍名称',
        dataIndex: 'dor_name',
        key: 'dor_name'
    },{
        title: '描述',
        dataIndex: 'dor_desc',
        key: 'dor_desc'
    },{
        title: '操作',
        render: (text, record, index) => {
            return (
                <div>
                    <a><Icon name='edit' /></a>
                    <Divider type='vertical' />
                    <a><Icon name='trash'/></a>
                </div>
            )
        }
    }]
    dataSource = [{
        dor_no: '1#001',
        dor_name: '1号楼001',
        dor_desc: '文明宿舍'
    }]
    render(){
        return (
            <section style={{margin: '0 10px 0 160px'}}>
                <h1 >宿舍详情</h1>
                <Table
                    bordered
                    columns = {this.columns}
                    dataSource = {this.dataSource}
                    rowKey = 'dor_no'
                />
            </section>
        )
    }
}
