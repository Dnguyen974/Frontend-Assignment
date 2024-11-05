import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SortableItem = ({ id, children }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    // Pass only the drag listeners to the drag handle
    const dragHandleListeners = {
        ...attributes,
        ...listeners,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {React.cloneElement(children, { dragHandleListeners })}
        </div>
    );
};
