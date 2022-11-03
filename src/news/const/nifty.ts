export const categories = [
  'トピックス',
  '国内',
  '経済',
  'スポーツ',
  '芸能・エンタメ',
  'IT',
  '国際',
  'トレンド',
] as const;

export type CategoryType = typeof categories[number];

export const categoryRssMap: {
  [key in CategoryType]: string;
} = {
  トピックス: 'pickup',
  国内: 'domestic',
  経済: 'economy',
  スポーツ: 'sports',
  '芸能・エンタメ': 'entame',
  IT: 'technology',
  国際: 'world',
  トレンド: 'item',
};
