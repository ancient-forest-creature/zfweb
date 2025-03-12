"use client";

import React, { useState } from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableImage } from "./SortableImage";

type ImageType = { id: number; url: string };

interface DndContextWrapperProps {
  images: ImageType[];
  setImages: React.Dispatch<React.SetStateAction<ImageType[]>>;
}

export default function DndContextWrapper({
  images,
  setImages,
}: DndContextWrapperProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent): void {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeIdStr = active.id;
      const overIdStr = over.id;

      // Handle items array
      setImages((prevImages) => {
        const oldIndex = prevImages.findIndex(
          (img) => String(img.id) === activeIdStr,
        );
        const newIndex = prevImages.findIndex(
          (img) => String(img.id) === overIdStr,
        );
        return arrayMove(prevImages, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex items-center justify-center gap-4 p-4">
          <SortableContext
            items={images.map((img) => String(img.id))}
            strategy={horizontalListSortingStrategy}
          >
            {images.map((image) => (
              <SortableImage
                key={image.id}
                id={String(image.id)}
                url={image.url}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </>
  );
}
