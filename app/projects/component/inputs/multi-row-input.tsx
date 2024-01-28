"use client";

/**
 * 複数行入力プロパティ
 */
interface MultiRowInputProps {
    title?: string;
    subtitle?: string;
    placeholder: string;
    value: string;
    defaultHeight?: number;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

/**
 * 複数行入力コンポーネント
 * @param param0 
 * @returns 
 */
export const MultiRowInput = ({title, subtitle, placeholder, value, defaultHeight, onChange}: MultiRowInputProps) => {
    return (
        <div>
            {/* titleが存在するなら表示 */}
            {title && <label className="block decoration-purple-700 underline text-gray-700 dark:text-white text-sm font-bold mb-2">
                {title}
            </label>}
            {/* subtitleが存在するなら表示 */}
            {subtitle && <p className="block text-gray-700 dark:text-white text-xs font-bold my-2">
                {subtitle}
            </p>}
            <textarea
                className={`shadow appearance-none border rounded h-${defaultHeight} w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}  
            />
        </div>
    );
};