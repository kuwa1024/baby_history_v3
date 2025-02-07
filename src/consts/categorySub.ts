interface categorySub {
  id: string
  label: string
  items: string[]
  required: boolean
}

const categorySubItem1: string[] = [
  "1分",
  "2分",
  "3分",
  "4分",
  "5分",
  "6分",
  "7分",
  "8分",
  "9分",
  "10分",
  "11分",
  "12分",
  "13分",
  "14分",
  "15分",
  "16分",
  "17分",
  "18分",
  "19分",
  "20分",
  "21分",
  "22分",
  "23分",
  "24分",
  "25分",
  "26分",
  "27分",
  "28分",
  "29分",
  "30分",
  "31分",
  "32分",
  "33分",
  "34分",
  "35分",
  "36分",
  "37分",
  "38分",
  "39分",
  "40分",
  "41分",
  "42分",
  "43分",
  "44分",
  "45分",
  "46分",
  "47分",
  "48分",
  "49分",
  "50分",
  "51分",
  "52分",
  "53分",
  "54分",
  "55分",
  "56分",
  "57分",
  "58分",
  "59分",
  "60分",
]

const categorySubItem2: string[] = [
  "5",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
  "60",
  "65",
  "70",
  "75",
  "80",
  "85",
  "90",
  "95",
  "100",
  "105",
  "110",
  "115",
  "120",
  "125",
  "130",
  "135",
  "140",
  "145",
  "150",
  "155",
  "160",
  "165",
  "170",
  "175",
  "180",
  "185",
  "190",
  "195",
  "200",
]

const categorySubItem3: string[] = ["小", "中", "大", "特"]

const categorySub0: categorySub = {
  id: "categorySub",
  label: "サブカテゴリー",
  items: [],
  required: false,
}

const categorySub1: categorySub = {
  id: "categorySub",
  label: "サブカテゴリー",
  items: categorySubItem1,
  required: true,
}

const categorySub2: categorySub = {
  id: "categorySub",
  label: "サブカテゴリー",
  items: categorySubItem2,
  required: true,
}

const categorySub3: categorySub = {
  id: "categorySub",
  label: "サブカテゴリー",
  items: categorySubItem3,
  required: true,
}

export const categorySub: categorySub[] = [
  categorySub0,
  categorySub1,
  categorySub2,
  categorySub3,
]
