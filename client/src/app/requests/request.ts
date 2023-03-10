export interface Request {
  _id: string;
  name: string;
  category: FoodCategory;
  unit: string;
  count: number;
  price: number;
  priority: number;
  dateAdded: string;
  dateUpdated: string;
  countRemaining: number;
}

export type FoodCategory = 'fruits' | 'vegetables' | 'proteins' | 'grains' | 'dairy' |
                           'pantry' | 'baby' | 'personal' | 'household' | 'misc';
