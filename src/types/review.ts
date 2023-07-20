type UserData = {
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
  user: UserData;
};

export type Review = ReviewData & Comment;

// export type ReviewsByOfferId = {
//   [key: string]: Review[];
// }
