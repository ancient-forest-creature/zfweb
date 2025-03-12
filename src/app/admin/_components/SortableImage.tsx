import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Img } from "./Img";

interface SortableItemProps {
  id: string;
  url: string;
}

export function SortableImage(props: SortableItemProps): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style: React.CSSProperties = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Img
      id={props.id}
      url={props.url}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {props.id}
    </Img>
  );
}
