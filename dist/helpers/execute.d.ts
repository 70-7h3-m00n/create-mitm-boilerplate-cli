export declare const executePromise: (command: string, message?: string | null) => Promise<void>;
export declare const spawnExecutePromise: (command: string | undefined, args: never[] | undefined, message: string | null | undefined, excludeLogs: RegExp) => Promise<unknown>;
