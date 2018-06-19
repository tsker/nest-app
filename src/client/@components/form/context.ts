import { createContext } from 'react';

export interface IContext {
    fields:object
    registry: (name:string, field:object) => void;
    unsafe_updateFieldValue: (name:string,value:any) => void;

}
const context = createContext<IContext>({} as any);

export const Consumer = context.Consumer;
export const Provider = context.Provider;
