import { createContext } from 'react';

export type getRefFn = (x: HTMLElement | null) => any;

export interface IContent {
	getReferenceRef: getRefFn;
	reference?: HTMLElement;
}
const context = createContext<IContent>({} as any);

export const Consumer = context.Consumer;
export const Provider = context.Provider;