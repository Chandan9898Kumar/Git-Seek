// This is the main interface that defines required properties.
//  Product: All properties from Product are required
interface Product {
  id: number;
  avatar_url: string;
  login: string;
}

// This interface contains additional properties that appear to be related to GitHub user data
interface ProductOptional {
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
  user_view_type: string;
  name:string
}

//  It means : This is a type intersection ( &) combining two types:
// 1. Product: All properties from Product are required.
// 2. Partial<ProductOptional>: Makes all properties from ProductOptional optional
//  The Partial<T> utility type makes all properties in type T optional (adds ? to each property)
export type ProductList= Product & Partial<ProductOptional>