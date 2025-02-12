import CategoryResult from "@/app/(main)/category/_components/category_result";

export default async function CategoryPage({ searchParams }: { searchParams: { value?: string; page?: string } }) {
  const params = await searchParams;
  const currentCategory = searchParams.value || "";
  const currentPage = Number(params.page) || 1;

  return <CategoryResult category={currentCategory} page={currentPage} />;
}
