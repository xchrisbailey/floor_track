export type Collection = {
  description: string;
  image_url: string;
  name: string;
  owned_asset_count: number;
  slug: string;
  stats: {
    average_price: number;
    floor_price: number;
    one_day_volume: number;
  };
};
