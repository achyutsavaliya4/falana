"use client";

import { RootState } from "@/redux";
import { useSelector } from "react-redux";

export default function Home() {
  const { userRolePermission } = useSelector((state: RootState) => state.user);
  return <>{JSON.stringify(userRolePermission || {})}</>;
}

// export default function Home() {
//   const [questions, setQuestions] = useState([
//     {
//       id: uuidv4(),
//       question: "Fire safety door is unblocked?",
//       type: "multiple_choice",
//       options: [
//         { id: "opt-1", text: "Yes", isCorrect: false, hasFlag: false },
//         { id: "opt-2", text: "No", isCorrect: false, hasFlag: false },
//       ],
//       required: true,
//       priority: "high",
//     },
//     {
//       id: uuidv4(),
//       question: "Fire safety door is unblocked?",
//       type: "short_answer",
//       options: [],
//       required: true,
//       priority: "high",
//     },
//   ]);

//   const handleDragEnd = useCallback((event: DragEndEvent) => {
//     const { active, over } = event;
//     if (active.id !== over?.id) {
//       setQuestions((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over?.id);

//         const newItems = [...items];
//         const [movedItem] = newItems.splice(oldIndex, 1);
//         newItems.splice(newIndex, 0, movedItem);

//         return newItems;
//       });
//     }
//   }, []);

//   const handleUpdateQuestion = useCallback((id: string, updates: object) => {
//     setQuestions((prev) =>
//       prev.map((q) => (q.id === id ? { ...q, ...updates } : q))
//     );
//   }, []);

//   const handleDeleteQuestion = useCallback((id: string) => {
//     setQuestions((prev) => prev.filter((q) => q.id !== id));
//   }, []);

//   const handleDuplicateQuestion = useCallback((id: string) => {
//     setQuestions((prev) => {
//       const questionToDuplicate = prev.find((q) => q.id === id);
//       if (!questionToDuplicate) return prev;

//       const newQuestion = {
//         ...questionToDuplicate,
//         id: uuidv4(),
//         question: `${questionToDuplicate.question} (Copy)`,
//       };

//       return [...prev, newQuestion];
//     });
//   }, []);

//   const handleAddQuestion = () => {
//     const newQuestion = {
//       id: uuidv4(),
//       question: "New Question",
//       type: "multiple_choice",
//       options: [],
//       required: false,
//       priority: "medium",
//     };
//     setQuestions((prev) => [...prev, newQuestion]);
//   };

//   return (
//     <div>
//       Home<button className="btn btn-primary">Link</button>
//       <div className="min-h-screen bg-gray-50 py-8 px-4">
//         <div className="max-w-2xl mx-auto">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">
//             Form Builder
//           </h1>

//           <button
//             onClick={handleAddQuestion}
//             className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//           >
//             Add Question
//           </button>

//           <SortDraggableContainer
//             items={questions.map((q) => q.id)}
//             onDragEnd={handleDragEnd}
//             className="space-y-4"
//           >
//             {questions.map((question) => (
//               <QuestionCard
//                 key={question.id}
//                 id={question.id}
//                 question={question.question}
//                 type={question.type}
//                 options={question.options}
//                 required={question.required}
//                 priority={question.priority}
//                 onUpdate={handleUpdateQuestion}
//                 onDelete={handleDeleteQuestion}
//                 onDuplicate={handleDuplicateQuestion}
//                 onSettingsClick={(id) => }
//               />
//             ))}
//           </SortDraggableContainer>
//         </div>
//       </div>
//     </div>
//   );
// }
