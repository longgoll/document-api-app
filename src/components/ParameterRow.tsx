import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Parameter = {
    name: string;
    type: string;
    required: boolean;
    description: string;
    children?: Parameter[];
    example?: string;
  };

function ParameterRow({
  parameter,
  level,
}: {
  parameter: Parameter;
  level: number;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="space-y-1">
      <div
        className={cn(
          "flex items-start gap-2 p-2 hover:bg-slate-50 rounded-lg group",
          level > 0 && "ml-6"
        )}
      >
        {parameter.children && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-1 p-0.5 hover:bg-slate-200 rounded"
          >
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                isExpanded && "transform rotate-90"
              )}
            />
          </button>
        )}
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-blue-500">{parameter.name}</span>
            <span className="text-sm text-slate-600">{parameter.type}</span>
            {parameter.required ? (
              <span className="text-orange-500 text-sm">required</span>
            ) : (
              <span className="text-slate-400 text-sm">optional</span>
            )}
          </div>
          <p className="text-sm text-slate-600">{parameter.description}</p>
          {parameter.example && (
            <div className="text-sm text-slate-500">
              Example:{" "}
              <code className="bg-slate-100 px-1 py-0.5 rounded">
                {parameter.example}
              </code>
            </div>
          )}
        </div>
      </div>

      {parameter.children && isExpanded && (
        <div className="border-l-2 border-slate-200 ml-3">
          {parameter.children.map((child, index) => (
            <ParameterRow key={index} parameter={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
export default ParameterRow;