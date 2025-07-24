'use client';

import { useEffect, useState } from "react";
import { fetchArticles } from "@/lib/api";
import { ArticleCard } from "@/components/ArticleCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react"; // Spinner icon

const ITEMS_PER_PAGE = 10;

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // new loading state

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      const { data } = await fetchArticles();

      const validArticles = data.filter(
        (article: any) =>
          (article.title || article.story_title) &&
          (article.url || article.story_url)
      );

      setArticles(validArticles);
      setLoading(false);
    };

    loadArticles();
  }, []);

  // Filter articles based on search query
  const filteredArticles = articles.filter((article: any) => {
    const searchText = `${article.title ?? ""} ${article.story_title ?? ""}`.toLowerCase();
    return searchText.includes(searchQuery.toLowerCase());
  });
  
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="p-4 space-y-6">
      {/* Search */}
      <div className="flex justify-center">
        <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
            }}
            className="pl-10 text-base"
            disabled={loading}
            />
        </div>
        </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {/* Article Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentArticles.map((article: any, index: number) => (
              <ArticleCard
                key={`${article.created_at_i}-${index}`}
                article={article}
              />
            ))}
          </div>

        {/* Pagination */}
        {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2">
            <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            >
            Prev
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
            <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
            >
                {i + 1}
            </Button>
            ))}

            <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            >
            Next
            </Button>
        </div>
        )}
        </>
      )}
    </div>
  );
}
