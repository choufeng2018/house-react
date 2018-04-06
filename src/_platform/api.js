export const DOMAIN = "http://localhost";
export const PORT = "80";
export const LOGIN_API = `${DOMAIN}:${PORT}/house/login`;
export const SERVICE_API = `${DOMAIN}:${PORT}/house/service`;
export const FILE_API = `${DOMAIN}:${PORT}/house/fileService`
// 文件下载api
export const DOWNLOAD_API = `${DOMAIN}:${PORT}/house/fileService`;
// 宿管信息批量上传模板下载
export const DORADMIN_MUBAN =  `${DOWNLOAD_API}/fileDownload.php`;
export const REPMAN_MUBAN =  `${DOWNLOAD_API}/fileDownloadRep.php`;
export let MODULES = [{
    module: '综合展示',
    checked: false,
    key: 'dashboard'
},{
    module: '综合管理',
    checked: false,
    key: 'overall',
    children: [{
        module: '新闻管理',
        checked: false,
        key: 'news'
    },{
        module: '公告管理',
        checked: false,
        key: 'notice'
    }]
},{
    module: '维修报修',
    checked: false,
    key: 'repair',
    children: [{
        module: '报修单管理',
        checked: false,
        key: 'order'
    },{
        module: '维修管理',
        checked: false,
        key: 'fix',
        children: [{
            module: '维修查看',
            checked: false,
            key: 'detail'
        },{
            module: '维修进度',
            checked: false,
            key: 'progress'
        },{
            module: '维修评价',
            checked: false,
            key: 'evalute'
        }]
    }]
},{
    module: '学生住宿',
    checked: false,
    key: 'accomm',
    children: [{
        module: '分配宿舍',
        checked: false,
        key: 'distri'
    }]
},{
    module: '门禁管理',
    checked: false,
    key: 'access',
    children: [{
        module: '来访人登记',
        checked: false,
        key: 'visit',
    },{
        module: '外带物品登记',
        checked: false,
        key: 'goods',
    }]
},{
    module: '工具管理',
    checked: false,
    key: 'tools',
    children: [{
        module: '工具借用',
        checked: false,
        key: 'borrow',
    },{
        module: '工具领用',
        checked: false,
        key: 'receive',
    }]
},{
    module: '系统配置',
    checked: false,
    key: 'setup',
    children: [{
        module: '宿管信息',
        checked: false,
        key: 'dorAdmin',
    },{
        module: '宿舍楼信息',
        checked: false,
        key: 'building',
    },{
        module: '宿舍信息',
        checked: false,
        key: 'dormitory',
    },{
        module: '权限配置',
        checked: false,
        key: 'permission',
    }]
}]
