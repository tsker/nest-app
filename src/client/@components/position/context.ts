import { createContext } from 'react';

export type getRefFn = (x: HTMLElement | null) => any;

export interface IContext {
	getReferenceRef: getRefFn;
	reference?: HTMLElement;
}
const context = createContext<IContext>({} as any);

export const Consumer = context.Consumer;
export const Provider = context.Provider;