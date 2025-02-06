import type { DragDirection, FromDirection, ToDirection } from "@/types";

function getDragDirection(activeType: FromDirection, overType: ToDirection): DragDirection {
  return `${activeType} -> ${overType}`;
}

export default getDragDirection;
