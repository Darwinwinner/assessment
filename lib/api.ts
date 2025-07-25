import { Article, User } from '@/types';

// Base URL for the API
const BASE_URL = "https://jsonmock.hackerrank.com/api";

// Type for the result of fetching all pages
type FetchAllPagesResult<T> = {
  totalPages: number;
  data: T[];
};

// Function to fetch all pages of data from a given endpoint
async function fetchAllPages<T>(endpoint: string): Promise<FetchAllPagesResult<T>> {
  const firstRes = await fetch(`${BASE_URL}/${endpoint}?page=1`);
  const firstData = await firstRes.json();

  const totalPages: number = firstData.total_pages;
  const allData: T[] = [...firstData.data];
  
  const pageFetches = Array.from({ length: totalPages - 1 }, (_, index) =>
    fetch(`${BASE_URL}/${endpoint}?page=${index + 2}`).then((res) => res.json())
  );

  const remainingPages = await Promise.all(pageFetches);

  for (const page of remainingPages) {
    allData.push(...page.data);
  }

  return {
    totalPages,
    data: allData,
  };
}

// Function to fetch articles
export async function fetchArticles(): Promise<FetchAllPagesResult<Article>> {
  return fetchAllPages<Article>('articles');
}

// Function to fetch users
export async function fetchUsers(): Promise<FetchAllPagesResult<User>> {
  return fetchAllPages<User>('article_users');
}