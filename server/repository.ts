import fs from 'fs';

export interface IStorage  {
    getItem: (key: string) => string;
    setItem: (key: string, value: string) => void;
    removeItem: (key: string) => void;
    clear: () => void;
}

export class Repository implements IStorage {
    repository: any;

    constructor (repository: IStorage) {
        this.repository = repository;
    }

    getItem (key: string): string {
        return this.repository.getItem(key);
    }

    setItem (key: string, value: string): void {
        this.repository.setItem(key, value)
    }

    removeItem (key: string): void {
        this.repository.removeItem(key)
    }

    clear (): void {
        this.repository.clear()
    };
}