export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Comment = {
  comment: string;
  rating: number;
  offerId: string;
}

type ReviewData = {
  id: string;
  date: string;
  user: User;
};

export type Review = ReviewData & Comment;
