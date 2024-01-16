// UUIDを生成して返却する関数
import { v4 as uuidv4 } from 'uuid';

export const generateUuid = (): string => {
    return uuidv4();
};
