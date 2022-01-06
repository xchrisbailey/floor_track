export type Collection = {
  description: string;
  image_url: string;
  name: string;
  discord_url: string;
  twitter_username: string;
  owned_asset_count: number;
  slug: string;
  stats: {
    average_price: number;
    floor_price: number;
    one_day_volume: number;
    one_day_sales: number;
    one_day_average_price: number;
    total_supply: number;
    num_owners: number;
  };
};
