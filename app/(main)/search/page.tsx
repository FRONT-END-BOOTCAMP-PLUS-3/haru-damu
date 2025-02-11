import SearchResult from "@/app/(main)/search/_components/search_result";

export default async function SearchPage({ searchParams }: { searchParams: { query: string; page?: string } }) {
  const params = await searchParams;
  const currentQuery = params.query;
  const currentPage = Number(params.page) || 1;

  return <SearchResult query={currentQuery} page={currentPage} />;
}
