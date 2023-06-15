import { FC, ReactElement } from "react";
import { InputProps } from "../Input/input";
import "../../styles/index.scss";
interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect' | 'onChange'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    onChange?: (value: string) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
}
export declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
