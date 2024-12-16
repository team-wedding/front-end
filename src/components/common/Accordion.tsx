import React from "react";

export interface AccordionItemData {
    id: number;
    title: string;
    content: React.ReactNode;
}

interface AccordionProps {
    items: AccordionItemData[];
    expandedIds: number[];
    toggleExpand: (id: number) => void;
}

export const Accordion: React.FC<AccordionProps> = ({
    items,
    expandedIds,
    toggleExpand,
}) => {
    return (
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-3xl overflow-hidden transition-all duration-300 ${
                expandedIds.includes(item.id) ? "max-h-96" : "max-h-16"
              }`}
            >
              <div
                className="flex justify-between max-h-16 items-center p-6 cursor-pointer"
                onClick={() => toggleExpand(item.id)}
              >
                <div className="text-lg font-bold">{item.title}</div>
                <i
                  className={`bx bx-chevron-down text-2xl transition-all duration-300 ${
                    expandedIds.includes(item.id) ? "rotate-180" : ""
                  }`}
                ></i>
              </div>
              <div
                className={`px-5 pb-5 overflow-hidden transition-all duration-300 ${
                  expandedIds.includes(item.id) ? "opacity-100" : "opacity-0"
                }`}
              >
                <div>{item.content}</div>
              </div>
            </div>
          ))}
        </div>
      );
    };