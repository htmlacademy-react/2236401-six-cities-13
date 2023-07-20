type HostData = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type Host = {
  id: string;
  description: string;
  bedrooms: number;
  goods: string[];
  host: HostData;
  images: string[];
  maxAdults: number;
}
