export interface UserDetails {
  email: boolean;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: boolean;
  html_url: string;
  id: number;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  updated_at: Date;
  url: string;
  user_view_type: string;
}

export interface UserDetailsRequired {
  created_at: Date;
  avatar_url: string;
  company: string;
  name: string;
  login: string;
  bio: string;
  public_repos: number;
  following: number;
  followers: number;
  twitter_username: string;
  location: string;
  blog: string;
}



export type UserDetailedInfo = UserDetailsRequired &  Partial<UserDetails>