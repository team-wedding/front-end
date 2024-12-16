// import React, { useState } from "react";
// import { Accordion } from "./components/common/Accordion.tsx";
// import { accordionData } from "./constants/accordionData";
// import { Stepper } from "./components/common/Stepper";
// import { StepNavigation } from "./components/common/StepNavigation";

// const steps = ["기본 정보 입력", "기능 선택", "테마 선택"];

// const App: React.FC = () => {
//   const [expandedIds, setExpandedIds] = useState<number[]>([]);

//   const toggleExpand = (id: number) => {
//     setExpandedIds((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const [currentStep, setCurrentStep] = useState<number>(1);

//   const handleNext = () => {
//     setCurrentStep((prev) => Math.min(prev + 1, steps.length));
//   };

//   const handlePrev = () => {
//     setCurrentStep((prev) => Math.max(prev - 1, 1));
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 bg-blue-100 min-h-screen">
//       <div className="flex flex-col gap-5">
//         <Stepper steps={steps} currentStep={currentStep} />
//         <Accordion items={accordionData} expandedIds={expandedIds} toggleExpand={toggleExpand} />
//         <StepNavigation
//           currentStep={currentStep}
//           totalSteps={steps.length}
//           onPrev={handlePrev}
//           onNext={handleNext}
//         />
//       </div>
//     </div>
//   );
// };

// export default App;