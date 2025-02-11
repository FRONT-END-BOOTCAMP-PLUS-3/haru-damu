export type TDateForm = `${number}. ${string}. ${string}.`;

export type THorizontalItem = {
  userId?: number;
  itemId: number;
  wrapperId: string | null;
  quantity: number;
  isChecked: boolean;
  itemName: string;
  itemPrice: number;
  img: string | undefined;
  blurImg: string | undefined;
  createdAt: string;
  updatedAt: string;
};

export type TItem = {
  itemId: number;
  storeId: number;
  itemName: string;
  storeName: string;
  itemPrice: number;
  img: string | undefined;
  blurImg: string | undefined;
  description: string;
  category_code: string;
  itemCode: number;
  unitType: TUnit;
  volume: number;
  nutrition: TNutrition;
  createdAt: string;
  updatedAt: string;
};

export type TUser = {
  user_id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
};

export type TUnit = "g" | "ml" | "l" | "입";

export type TNutrition = {
  g: number;
  calorie: number;
  carbohydrates: number;
  protein: number;
  fat: number;
  sodium: number;
  sugar: number;
};

export type THealth = {
  user_id: number;
  gender_code: "M" | "F";
  age: number;
  weight: number;
  height: number;
  activity_code: number;
  calorie: number;
  carbohydrates: number;
  protein: number;
  fat: number;
  sodium: number;
  sugar: number;
  is_custom: boolean;
  created_at: string; // ISO 날짜 형식
  updated_at: string; // ISO 날짜 형식
};

// unit_converter ===================================================================
export type ValidConversions = {
  mg: "g";
  g: "kg";
  kg: "g";
  ml: "l";
  l: "ml";
};

export type FromUnit = keyof ValidConversions;
export type ToUnit<U extends FromUnit> = ValidConversions[U];

export type UnitConversion<U extends FromUnit> = `${U} -> ${ToUnit<U>}`;

export type AllowedConversions = UnitConversion<FromUnit>;
// ==================================================================================

// drag_direction ===================================================================
import type { RectMap } from "@dnd-kit/core/dist/store";
import type { DRAGGABLE_TYPES, DROPPABLE_ONLY_TYPES } from "@/constants";
import type { Active, ClientRect, DroppableContainer } from "@dnd-kit/core";
import type {
  Coordinates,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
  DragCancelEvent,
} from "@dnd-kit/core/dist/types";

export type CollisionDetectionEventArgs = {
  active: Active;
  collisionRect: ClientRect;
  droppableContainers: DroppableContainer[];
  droppableRects: RectMap;
  pointerCoordinates: Coordinates | null;
};

export type DragEvent = DragEndEvent | DragMoveEvent | DragOverEvent | DragStartEvent | DragCancelEvent;

// 드래그 가능한 컴포넌트 타입 정의
export type DraggableComponent = (typeof DRAGGABLE_TYPES)[number];
export type DroppableArea = (typeof DROPPABLE_ONLY_TYPES)[number];
export type DraggableAndDroppable = (typeof DRAGGABLE_TYPES | typeof DROPPABLE_ONLY_TYPES)[number];

export type FromDirection = DraggableComponent;
export type ToDirection = DraggableAndDroppable;

export type DragDirection = `${FromDirection} -> ${ToDirection}`;
// ==================================================================================
