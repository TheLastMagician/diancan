const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const menuItems = [
  { id: 1,  name: '宫保鸡丁',     price: 32, category: '热菜', image: '🍗', description: '经典川菜，鸡丁配花生米，香辣可口',       sales: 856 },
  { id: 2,  name: '麻婆豆腐',     price: 22, category: '热菜', image: '🫘', description: '嫩豆腐配肉末，麻辣鲜香',               sales: 723 },
  { id: 3,  name: '糖醋里脊',     price: 38, category: '热菜', image: '🍖', description: '外酥里嫩，酸甜可口',                   sales: 612 },
  { id: 4,  name: '红烧排骨',     price: 48, category: '热菜', image: '🥩', description: '精选排骨，酱香浓郁，入口即化',           sales: 534 },
  { id: 5,  name: '鱼香肉丝',     price: 28, category: '热菜', image: '🐟', description: '酸甜微辣，下饭神器',                   sales: 445 },
  { id: 6,  name: '水煮牛肉',     price: 52, category: '热菜', image: '🥘', description: '麻辣鲜香，牛肉嫩滑',                   sales: 398 },
  { id: 7,  name: '凉拌黄瓜',     price: 12, category: '凉菜', image: '🥒', description: '清脆爽口，蒜香开胃',                   sales: 967 },
  { id: 8,  name: '皮蛋豆腐',     price: 16, category: '凉菜', image: '🥚', description: '清凉嫩滑，夏日必备',                   sales: 543 },
  { id: 9,  name: '口水鸡',       price: 28, category: '凉菜', image: '🐔', description: '麻辣鲜香，口感细腻',                   sales: 432 },
  { id: 10, name: '蛋炒饭',       price: 14, category: '主食', image: '🍚', description: '粒粒分明，鸡蛋香浓',                   sales: 1203 },
  { id: 11, name: '阳春面',       price: 12, category: '主食', image: '🍜', description: '清汤细面，葱香四溢',                   sales: 876 },
  { id: 12, name: '炸酱面',       price: 18, category: '主食', image: '🍝', description: '浓郁酱香，配料丰富',                   sales: 654 },
  { id: 13, name: '小笼包',       price: 18, category: '主食', image: '🥟', description: '皮薄馅多，汤汁鲜美',                   sales: 789 },
  { id: 14, name: '酸梅汤',       price: 8,  category: '饮品', image: '🧃', description: '酸甜解腻，消暑佳品',                   sales: 1456 },
  { id: 15, name: '柠檬茶',       price: 10, category: '饮品', image: '🍋', description: '新鲜柠檬，清新提神',                   sales: 1123 },
  { id: 16, name: '豆浆',         price: 6,  category: '饮品', image: '🥛', description: '现磨豆浆，香浓醇厚',                   sales: 987 },
  { id: 17, name: '可乐',         price: 5,  category: '饮品', image: '🥤', description: '冰镇可乐，畅爽解渴',                   sales: 1567 },
  { id: 18, name: '拍黄瓜',       price: 10, category: '凉菜', image: '🥗', description: '蒜泥拍黄瓜，爽脆开胃',                 sales: 678 },
];

const categories = ['全部', '热菜', '凉菜', '主食', '饮品'];

const orders = [];
let orderIdCounter = 1000;

app.get('/api/menu', (req, res) => {
  const { category, search } = req.query;
  let result = menuItems;
  if (category && category !== '全部') {
    result = result.filter(item => item.category === category);
  }
  if (search) {
    result = result.filter(item => item.name.includes(search) || item.description.includes(search));
  }
  res.json(result);
});

app.get('/api/menu/:id', (req, res) => {
  const item = menuItems.find(m => m.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: '菜品不存在' });
  res.json(item);
});

app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.post('/api/orders', (req, res) => {
  const { items, tableNo, remark } = req.body;
  if (!items || items.length === 0) {
    return res.status(400).json({ error: '请至少选择一个菜品' });
  }
  const orderItems = items.map(item => {
    const menuItem = menuItems.find(m => m.id === item.id);
    return { ...menuItem, quantity: item.quantity };
  });
  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = {
    id: ++orderIdCounter,
    items: orderItems,
    total,
    tableNo: tableNo || '未指定',
    remark: remark || '',
    status: '已下单',
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  res.json(order);
});

app.get('/api/orders', (req, res) => {
  res.json(orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: '订单不存在' });
  res.json(order);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
