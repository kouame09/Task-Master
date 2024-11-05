import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Check, Grip, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export function TodoItem({ id, text, completed, onToggle, onDelete }: TodoItemProps) {
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
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      ref={setNodeRef}
      style={style}
      className={cn(
        'group flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md',
        isDragging && 'shadow-xl',
        completed && 'bg-gray-50'
      )}
    >
      <button
        className={cn(
          'flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors',
          completed
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : 'border-gray-300 hover:border-emerald-500'
        )}
        onClick={onToggle}
      >
        {completed && <Check className="h-4 w-4" />}
      </button>

      <span
        className={cn(
          'flex-1 text-gray-700 transition-colors',
          completed && 'text-gray-400 line-through'
        )}
      >
        {text}
      </span>

      <button
        className="text-gray-400 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
        onClick={onDelete}
      >
        <Trash2 className="h-5 w-5" />
      </button>

      <div
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-400 opacity-0 transition-opacity hover:text-gray-600 group-hover:opacity-100"
      >
        <Grip className="h-5 w-5" />
      </div>
    </motion.div>
  );
}