import React,{Component} from 'react'
import './List.less'
// 函数式组件传入一个数组
export default function List(data){
    let lists = data.map((item, index) => {
        return (
            <li className='li'>{`${index + 1}、${item}`}</li>
        )
    })
    return (
        <ul className='ul'>{lists}</ul>
    )
}
