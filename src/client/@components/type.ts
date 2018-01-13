export interface BaseElement {
	id?: string;
	className?: string;
	value?: string;
	style?: object;
	onClick?: any;
	disabled?: boolean;
	selected?: boolean;
	children?:any
	checked?:boolean
}
