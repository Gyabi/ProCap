import { v4 as uuidv4 } from 'uuid';

/**
 * UUIDを生成して返却
 * @returns UUID
 */
export const generateUuid = (): string => {
    return uuidv4();
};
