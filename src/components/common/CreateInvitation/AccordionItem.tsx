import { contentMap } from '@/constants/accordionContentMap';
import { AccordionItemData } from '@constants/accordionData';
import { Check, ChevronRight } from 'lucide-react';

interface AccordionItemProps {
  item: AccordionItemData;
  expandedIds: number[];
  toggleExpand: (id: number) => void;
}

export const AccordionItem = ({
  item,
  expandedIds,
  toggleExpand,
}: AccordionItemProps) => {
  const isExpanded = expandedIds.includes(item.id);

  return (
    <div className="glass-card overflow-hidden">
      <div
        className={`w-full px-4 py-5 cursor-pointer ${!item.isRequired && 'pl-11'}`}
        onClick={() => toggleExpand(item.id)}
        role="button"
        aria-expanded={isExpanded}
        aria-controls={`accordion-content-${item.id}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {item.isRequired && (
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  item.isCompleted
                    ? 'bg-gradient-to-br from-[#ff90ba] to-[#a7c7ff] backdrop-blur-sm shadow-sm'
                    : 'bg-slate-900/10 backdrop-blur-sm'
                }`}
              >
                {item.isCompleted ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <div className="w-2 h-2 bg-slate-900/15 rounded-full" />
                )}
              </div>
            )}
            <div>
              <h3 className="font-medium text-slate-800 text-sm">
                {item.title}
              </h3>
            </div>
          </div>

          <ChevronRight
            className={`w-4 h-4 text-slate-400 transition-transform ${
              expandedIds.includes(item.id) ? 'rotate-90' : ''
            }`}
          />
        </div>
      </div>

      {isExpanded && (
        <div id={`accordion-content-${item.id}`} className="pt-2">
          <div className="bg-white/20 backdrop-blur-xl rounded-b-xl py-6 px-6">
            {contentMap[item.feature]}
          </div>
        </div>
      )}
    </div>
  );
};
