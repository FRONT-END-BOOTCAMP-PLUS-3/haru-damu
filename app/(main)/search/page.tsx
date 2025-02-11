import SearchResult from "@/app/(main)/search/_components/search_result";

export default async function SearchPage({ searchParams }: { searchParams: { query: string; page?: string } }) {
  const currentQuery = searchParams.query; // 이건 현재 검색어를 할당
  const currentPage = Number(searchParams.page) || 1; // 이건 현재 페이지네이션 위치를 할당 || 없으면 1로 설정?

  return <SearchResult query={currentQuery} page={currentPage} />;
}
