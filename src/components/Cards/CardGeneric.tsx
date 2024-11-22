import React from "react";

interface CardGenericProps {
    icon: React.ReactNode;
    color: string;
    title: string;
    value: string | number;
    growthRate?: number;
}

const CardGeneric: React.FC<CardGenericProps> = ({
    icon,
    color,
    title,
    value,
    growthRate,
}) => {
    return (
        <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
            <div
                className="flex h-14.5 w-14.5 items-center justify-center rounded-full"
                style={{ backgroundColor: color }}
            >
                {icon}
            </div>
            <div className="mt-6 flex items-end justify-between">
                <div>
                    <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
                        {value}
                    </h4>
                    <span className="text-body-sm font-medium">{title}</span>
                </div>
                {growthRate !== undefined && (
                    <span
                        className={`flex items-center gap-1.5 text-body-sm font-medium ${
                            growthRate > 0 ? "text-green" : "text-red"
                        }`}
                    >
                        {growthRate}%
                        {growthRate > 0 ? (
                            <svg
                                className="fill-current"
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M4.35716 2.3925L0.908974 5.745L0 4.86125L5 0L10 4.86125L9.09103 5.745L5.64284 2.3925V10H4.35716V2.3925Z" />
                            </svg>
                        ) : (
                            <svg
                                className="fill-current"
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M5.64284 7.6075L9.09102 4.255L10 5.13875L5 10L0 5.13875L0.908973 4.255L4.35716 7.6075V0H5.64284V7.6075Z" />
                            </svg>
                        )}
                    </span>
                )}
            </div>
        </div>
    );
};

export default CardGeneric;