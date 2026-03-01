# 美味餐厅 - 在线点餐小程序

一个移动端优先的在线点餐应用，基于 React + Vite + TailwindCSS 前端和 Express 后端构建。

## 功能

- **菜单浏览** — 按分类筛选（热菜、凉菜、主食、饮品），支持搜索
- **购物车** — 添加/减少菜品数量，实时计算价格
- **下单** — 填写桌号和备注，一键下单
- **订单管理** — 查看历史订单和订单详情

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | React 19, Vite, TailwindCSS 4 |
| 后端 | Express, Node.js |
| 样式 | TailwindCSS (移动端优先设计) |

## 快速开始

```bash
# 安装依赖
npm install --prefix frontend
npm install --prefix backend

# 启动后端 (端口 3001)
npm run dev:backend

# 启动前端 (另一个终端，端口 5173)
npm run dev:frontend
```

打开浏览器访问 `http://localhost:5173`

## 项目结构

```
├── frontend/           # React 前端
│   ├── src/
│   │   ├── components/ # 通用组件 (CartBar, CartDrawer, MenuItem)
│   │   ├── pages/      # 页面组件 (MenuPage, OrderPage, OrderDetailPage)
│   │   ├── App.jsx     # 应用入口
│   │   └── index.css   # 全局样式
│   └── index.html
├── backend/            # Express 后端
│   └── server.js       # API 服务 (菜单、订单)
└── package.json        # 根配置
```

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/categories` | 获取菜品分类 |
| GET | `/api/menu?category=热菜` | 获取菜单（可按分类筛选） |
| POST | `/api/orders` | 创建订单 |
| GET | `/api/orders` | 获取所有订单 |
| GET | `/api/orders/:id` | 获取订单详情 |
