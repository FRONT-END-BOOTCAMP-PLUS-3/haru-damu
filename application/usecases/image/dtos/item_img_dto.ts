export interface ItemImageDto {
  id: number;
  itemId: number | null; // nullable
  src: string | null; // nullable
  createdAt: Date;
}
