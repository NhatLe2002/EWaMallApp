interface Item {
  id: number;
  name: string;
  category: string;
  imgUrl: string;
}

const categories: Item[] = [
  {
    id: 1,
    name: 'Danh mục thực phẩm',
    category: 'A',
    imgUrl: 'https://picsum.photos/200/300?random=3',
  },
  {
    id: 2,
    name: 'Danh mục thức uống',
    category: 'B',
    imgUrl: 'https://picsum.photos/200/300?random=2',
  },
  {
    id: 3,
    name: 'Danh mục thuốc',
    category: 'A',
    imgUrl: 'https://picsum.photos/200/300?random=5',
  },
  {
    id: 4,
    name: 'Danh mục quần',
    category: 'C',
    imgUrl: 'https://picsum.photos/200/300?random=12',
  },
  {
    id: 5,
    name: 'Danh mục áo',
    category: 'A',
    imgUrl: 'https://picsum.photos/200/300?random=7',
  },
  {
    id: 6,
    name: 'Danh mục ghế mát xa',
    category: 'B',
    imgUrl: 'https://picsum.photos/200/300?random=8',
  },
  {
    id: 7,
    name: 'Danh mục trà',
    category: 'A',
    imgUrl: 'https://picsum.photos/200/300?random=9',
  },
  {
    id: 8,
    name: 'Danh mục tiêu hóa',
    category: 'C',
    imgUrl: 'https://picsum.photos/200/300?random=3',
  },
  {
    id: 9,
    name: 'Danh mục giày',
    category: 'A',
    imgUrl: 'https://picsum.photos/200/300?random=14',
  },
  {
    id: 10,
    name: 'Danh mục đầm',
    category: 'B',
    imgUrl: 'https://picsum.photos/200/300?random=52',
  },
  {
    id: 11,
    name: 'Danh mục xe lăn',
    category: 'A',
    imgUrl: 'https://picsum.photos/200/300?random=6',
  },
  {
    id: 12,
    name: 'Danh mục sữa',
    category: 'C',
    imgUrl: 'https://picsum.photos/200/300?random=23',
  },
];

export default categories;
