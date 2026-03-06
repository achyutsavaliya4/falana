// components/QuestionCard.jsx
"use client";

import { useState } from "react";
import { X, Plus, Settings, Copy, Trash2, GripVertical } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  hasFlag: boolean;
}
interface QuestionCardProps {
  id: string;
  question?: string;
  type?: "multiple_choice" | "short_answer" | "long_answer";
  options?: Option[];
  required?: boolean;
  priority?: "low" | "medium" | "high";
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onUpdate?: (id: string, updates: object) => void;
  onSettingsClick?: (id: string) => void;
  isDraggable?: boolean;
}
export default function QuestionCard({
  id,
  question = "",
  type = "multiple_choice",
  options = [],
  required = false,
  priority = "medium",
  onDelete,
  onDuplicate,
  onUpdate,
  onSettingsClick,
  isDraggable = true,
}: QuestionCardProps) {
  const [localQuestion, setLocalQuestion] = useState(question);
  const [localOptions, setLocalOptions] = useState(options);
  const [localRequired, setLocalRequired] = useState(required);
  const [localPriority, setLocalPriority] = useState(priority);
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
    zIndex: isDragging ? 10 : 1,
  };
  const handleAddOption = () => {
    const newOption = {
      id: `option-${Date.now()}`,
      text: "",
      isCorrect: false,
      hasFlag: false,
    };
    const updatedOptions = [...localOptions, newOption];
    setLocalOptions(updatedOptions);
    onUpdate?.(id, { options: updatedOptions });
  };

  const handleOptionChange = (optionId: string, field: string, value: any) => {
    const updatedOptions = localOptions.map((opt) =>
      opt.id === optionId ? { ...opt, [field]: value } : opt
    );
    setLocalOptions(updatedOptions);
    onUpdate?.(id, { options: updatedOptions });
  };

  const handleDeleteOption = (optionId: string) => {
    const updatedOptions = localOptions.filter((opt) => opt.id !== optionId);
    setLocalOptions(updatedOptions);
    onUpdate?.(id, { options: updatedOptions });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200"
    >
      <div className="flex items-start gap-3">
        {isDraggable && (
          <div
            {...listeners}
            {...attributes}
            className="drag-handle cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="text-gray-400" />
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={localQuestion}
              onChange={(e) => {
                const newQuestion = e.target.value;
                setLocalQuestion(newQuestion);
                onUpdate?.(id, { question: newQuestion });
              }}
              placeholder="Enter your question"
              className="flex-1 text-lg font-medium border-b border-transparent focus:border-gray-300 focus:outline-none"
            />
            {localRequired && <span className="text-red-500">*</span>}
          </div>

          {type === "multiple_choice" ? (
            <div className="space-y-2 mb-4">
              {localOptions.map((option) => (
                <div key={option.id} className="flex items-center gap-2 group">
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={(e) =>
                      handleOptionChange(
                        option.id,
                        "isCorrect",
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) =>
                      handleOptionChange(option.id, "text", e.target.value)
                    }
                    placeholder="Option"
                    className="flex-1 border-b border-transparent focus:border-gray-300 focus:outline-none"
                  />
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                    <input
                      type="checkbox"
                      checked={option.hasFlag}
                      onChange={(e) =>
                        handleOptionChange(
                          option.id,
                          "hasFlag",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-yellow-500 rounded"
                    />
                    <span className="text-xs text-gray-500">Flag</span>
                    <button
                      onClick={() => handleDeleteOption(option.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={handleAddOption}
                className="flex items-center text-sm text-blue-600 mt-2"
              >
                <Plus size={16} className="mr-1" />
                Add Option
              </button>
            </div>
          ) : (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Short answer text"
                className="w-full border-b border-gray-300 py-1 focus:outline-none focus:border-blue-500"
                disabled
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Required</span>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    checked={localRequired}
                    onChange={(e) => {
                      const newValue = e.target.checked;
                      setLocalRequired(newValue);
                      onUpdate?.(id, { required: newValue });
                    }}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="toggle"
                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                      localRequired ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  ></label>
                </div>
              </label>

              <select
                value={localPriority}
                onChange={(e) => {
                  const newPriority = e.target.value as "low" | "medium" | "high";
                  setLocalPriority(newPriority);
                  onUpdate?.(id, { priority: newPriority });
                }}
                className="text-sm border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>

              <select
                value={type}
                onChange={(e) => onUpdate?.(id, { type: e.target.value })}
                className="text-sm border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="multiple_choice">Multiple Choice</option>
                <option value="short_answer">Short Answer</option>
                <option value="long_answer">Long Answer</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => onDuplicate?.(id)}
                className="text-gray-500 hover:text-blue-600"
                title="Duplicate"
              >
                <Copy size={18} />
              </button>
              <button
                onClick={() => onSettingsClick?.(id)}
                className="text-gray-500 hover:text-gray-700"
                title="Settings"
              >
                <Settings size={18} />
              </button>
              <button
                onClick={() => onDelete?.(id)}
                className="text-gray-500 hover:text-red-600"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
