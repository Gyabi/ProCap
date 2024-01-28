"use client";

/**
 * 単一行入力プロパティ
 */
interface SingleRowInputProps {
    title?: string;
    subtitle?: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SingleRowInput = ({title, subtitle, placeholder, value, onChange}: SingleRowInputProps) => {
    return (
        <div>
            {/* titleが存在するなら表示 */}
            {title && <label className="block decoration-purple-700 underline text-gray-700 dark:text-white text-sm font-bold mb-2">
                {title}
            </label>}
            {/* subtitleが存在するなら表示 */}
            {subtitle && <p className="block text-gray-700 dark:text-white text-xs font-bold mb-2">
                {subtitle}
            </p>}
            <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline mb-2"
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}  
            />
        </div>
    );
};