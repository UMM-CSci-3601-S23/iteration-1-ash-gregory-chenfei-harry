/* eslint @typescript-eslint/naming-convention: "off" */
export interface Item {
  _id: string;
  name: string;
  category: FoodCategory;
  unit: string;
  count: number;
  price: number;
  priority: number;
  date_added: string;
  date_updated: string;
  count_remaining: number;
}

export type FoodCategory = 'fruits' | 'vegetables' | 'proteins' | 'grains' | 'dairy' |
                           'pantry' | 'baby' | 'personal' | 'household' | 'misc';
