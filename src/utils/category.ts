interface category {
  id: string;
  label: string;
  items: string[];
  relations: number[];
  required: boolean;
}

const item: string[] = ['母乳', '母乳(右)', '母乳(左)', 'ミルク', '搾乳', 'おしっこ', 'うんこ'];

const relation: number[] = [1, 1, 1, 2, 2, 0, 3];

export const category: category = {
  id: 'category',
  label: 'カテゴリー',
  items: item,
  relations: relation,
  required: true,
};
