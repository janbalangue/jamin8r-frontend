export type UserId = string;

export interface User {
  id: UserId;
  username: string;
  createdAt: string;
}

export interface RegisterUserRequest {
  username: string;
}

export interface Profile {
  userId: UserId;
  displayName: string;
  bio: string | null;
  location: string | null;
  updatedAt: string;
}

export interface UpsertProfileRequest {
  displayName: string;
  bio?: string | null;
  location?: string | null;
}

export interface FollowRequest {
  followerId: UserId;
  followedId: UserId;
}

export interface FollowResponse {
  created: boolean;
}

export interface UserIdsResponse {
  userIds: UserId[];
}

export interface ApiErrorBody {
  timestamp: string;
  status: number;
  code: string;
  message: string;
  fields: Record<string, string>;
}
