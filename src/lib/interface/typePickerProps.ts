import { Dispatch } from "react";
import { ItemType } from "react-native-dropdown-picker";

export default interface typePickerProps {
    open: boolean;
    setOpen: Dispatch<React.SetStateAction<boolean>>;
    value: string | null;
    setValue: Dispatch<React.SetStateAction<string>>;
    items: ItemType<any>[];
    setItems: Dispatch<React.SetStateAction<ItemType<any>[]>>;
    placeholder: string;
    disabled?: boolean;
    style?: any;
    zIndex?: number;
    zIndexInverse?: number;
}