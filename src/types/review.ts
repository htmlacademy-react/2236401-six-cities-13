export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

type Comment = {
  comment: string;
  rating: number;
}

type ReviewData = {
  id: string;
  date: string;
  user: User;
};

export type Review = ReviewData & Comment;

// export type ReviewsByOfferId = {
//   [key: string]: Review[];
// }
