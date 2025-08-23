"use client";

import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "../ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../ui/command";
import { FormControl } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export interface IComboBoxData {
    label: string;
    value: string | number
}
export type ComboBoxInputProps = {
    data: IComboBoxData[];
    field: any;
    form: any;
    disabled?: boolean | undefined;
    fieldName: string;
    emptyLabel: string;
    multiselect?: boolean | undefined;
    searchLabel: string;
    placeholder: string;
    classNameItem?: string;
    classNameButton?: string;
    classNamePopOverContent?: string;
};


const ComboBoxInput: React.FC<ComboBoxInputProps> = ({
    data,
    field,
    form,
    fieldName,
    emptyLabel,
    searchLabel,
    multiselect,
    placeholder,
    disabled,
    classNameItem,
    classNameButton,
    classNamePopOverContent,
}) => {
    const [open, setOpen] = React.useState(false);

    const handleSelect = (value: string | number) => {
        if (multiselect) {
            if (field.value.includes(value)) {
                form.setValue(
                    fieldName,
                    field.value.filter((item: string | number) => item !== value)
                );
                return;
            }

            form.setValue(fieldName, [...field.value, value]);
            return;
        }

        form.setValue(fieldName, value);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={() => setOpen(!open)}>
            <PopoverTrigger disabled={disabled} asChild>
                <FormControl>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            !field.value && "text-muted-foreground",
                            classNameButton
                        )}
                    >
                        {field.value
                            ? data
                                ? multiselect
                                    ? field.value.length === 0
                                        ? placeholder
                                        : `${field.value.length} itens selecionados`
                                    : data.find((item) => item.value === field.value)?.label
                                : undefined
                            : placeholder}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className={cn("p-0", classNamePopOverContent)} align="start">
                <Command>
                    <CommandInput placeholder={searchLabel} className="h-9" />
                    <CommandList className="w-[--radix-popover-trigger-width]">
                        <CommandEmpty>{emptyLabel}</CommandEmpty>
                        <CommandGroup>
                            {data &&
                                data.map((item, index) => (
                                    <CommandItem
                                        value={item.value as any}
                                        key={index}
                                        className={cn("pointer-events-auto", classNameItem)}
                                        onSelect={() => handleSelect(item.value)}
                                    >
                                        {item.label}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                multiselect
                                                    ? field.value.includes(item.value)
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                    : item.value === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default ComboBoxInput;
