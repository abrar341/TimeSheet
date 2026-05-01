"use client"

import type { Control, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import React, { memo } from 'react';
import { AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type BaseInputProps = {
    label?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    type?: string;
    required?: boolean;
    readOnly?: boolean;
    prefixString?: string;
    prefixIcon?: React.ReactNode;
    prefixButton?: React.ReactNode;
    postfixString?: string;
    postfixIcon?: React.ReactNode;
    postfixButton?: React.ReactNode;
    percentage?: boolean;
    maxlength?: number;
};

type ControlledInputProps<TFieldValues extends FieldValues = FieldValues> = BaseInputProps & {
    control: Control<TFieldValues>;
    name: FieldPath<TFieldValues>;
    rules?: RegisterOptions<TFieldValues>;
    value?: never;
    onChange?: never;
    onBlur?: never;
    onKeyDown?: never;
};

type UncontrolledInputProps = BaseInputProps & {
    control?: never;
    name?: string;
    rules?: never;
    value?: string | number;
    onChange?: (value?: string) => void;
    onBlur?: () => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export type TextInputControlProps<TFieldValues extends FieldValues = FieldValues> =
    | ControlledInputProps<TFieldValues>
    | UncontrolledInputProps;

const isValidPercentage = (value: string): boolean => {
    if (value === '') return true;
    if (!/^\d{0,3}(?:\.\d{0,2})?$/.test(value)) return false;
    const num = Number(value);
    if (Number.isNaN(num) || num < 0 || num > 100) return false;
    if (num === 100 && /\./.test(value) && !/^100(?:\.0{0,2})?$/.test(value)) return false;
    return true;
};

// ✅ moved outside component — no re-creation on every render

const InputWrapper = ({
                          hasError = false,
                          prefixButton,
                          prefixString,
                          prefixIcon,
                          postfixIcon,
                          postfixString,
                          postfixButton,
                          children,
                      }: {
    hasError?: boolean;
    prefixButton?: React.ReactNode;
    prefixString?: React.ReactNode;
    prefixIcon?: React.ReactNode;
    postfixIcon?: React.ReactNode;
    postfixString?: React.ReactNode;
    postfixButton?: React.ReactNode;
    children: React.ReactNode;
}) => (
    <div className={`flex items-center rounded-lg border transition-all duration-200 ${
        hasError
            ? 'border-red-300 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500'
            : 'border-gray-300 hover:border-gray-400 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'
    }`}>
        {prefixButton && <span className="flex items-center px-2">{prefixButton}</span>}
        {prefixString && <span className="flex items-center px-3 whitespace-nowrap text-sm text-gray-500">{prefixString}</span>}
        {prefixIcon  && <span className="flex items-center px-3 text-gray-500">{prefixIcon}</span>}
        {children}
        {postfixIcon   && <span className="flex items-center px-3 text-gray-500">{postfixIcon}</span>}
        {postfixString && <span className="flex items-center px-3 whitespace-nowrap text-sm text-gray-500">{postfixString}</span>}
        {postfixButton && <span className="flex items-center px-2">{postfixButton}</span>}
    </div>
);

// ✅ extracted wrapper as separate component — cleaner render logic

const ErrorMessage = ({ id, message }: { id: string; message: string }) => (
    <div className="flex items-center space-x-1 mt-1" role="alert">
        <AlertCircle className="w-4 h-4 text-red-500" aria-hidden="true" />
        <p id={id} className="text-xs text-red-600 font-medium">
            {message}
        </p>
    </div>
);

// eslint-disable-next-line react/display-name
export const InputControl = memo(<TFieldValues extends FieldValues = FieldValues>(
    props: TextInputControlProps<TFieldValues>,
) => {
    const {
        control,
        name = 'default-input',
        label,
        placeholder = '',
        className = '',
        disabled = false,
        type = 'text',
        rules,
        required = false,
        readOnly = false,
        prefixString,
        prefixIcon,
        prefixButton,
        postfixString,
        postfixIcon,
        postfixButton,
        percentage = false,
        maxlength,
        value,
        onChange,
        onBlur,
        onKeyDown,
    } = props;

    const isFormControl = control !== undefined;
    const errorId = `${name}-error`;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fieldOnChange?: (value: string) => void,
    ) => {
        const nextValue = e.target.value;
        if (percentage && !isValidPercentage(nextValue)) return;
        fieldOnChange?.(nextValue);
    };

    const handleBlur = (
        fieldValue: string,
        fieldOnChange?: (value: string) => void,
        fieldOnBlur?: () => void,
    ) => {
        if (percentage && fieldValue) {
            const trimmed = fieldValue.trim();
            if (trimmed !== '' && isValidPercentage(trimmed)) {
                const num = Math.max(0, Math.min(100, Number(trimmed)));
                fieldOnChange?.(String(num));
            }
        }
        fieldOnBlur?.();
    };

    // ✅ handlers extracted and reused for both controlled/uncontrolled

    const renderInput = (
        fieldValue: string = '',
        fieldOnChange?: (value: string) => void,
        fieldOnBlur?: () => void,
        hasError: boolean = false,
    ) => (
        <InputWrapper
            hasError={hasError}
            prefixButton={prefixButton}
            prefixString={prefixString}
            prefixIcon={prefixIcon}
            postfixIcon={postfixIcon}
            postfixString={postfixString}
            postfixButton={postfixButton}
        >
            <Input
                id={name}
                type={type}
                value={fieldValue}
                onKeyDown={onKeyDown}
                maxLength={maxlength}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                aria-required={required}
                aria-disabled={disabled}
                aria-invalid={hasError}
                aria-describedby={hasError ? errorId : undefined}
                onChange={(e) => handleChange(e, fieldOnChange)}
                onBlur={() => handleBlur(fieldValue, fieldOnChange, fieldOnBlur)}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-[40px]"
            />
        </InputWrapper>
    );

    return (
        <div className={`flex flex-col space-y-2 ${className}`}>
            {label && (
                <Label htmlFor={name} className="font-medium text-gray-700">
                    {label}
                    {required && (
                        <span className="text-red-500 ml-1" aria-hidden="true">*</span>
                    )}
                </Label>
            )}

            {isFormControl ? (
                <Controller
                    name={name as FieldPath<TFieldValues>}
                    control={control as Control<TFieldValues>}
                    rules={rules}
                    render={({ field, fieldState }) => (
                        <>
                            {renderInput(
                                field.value ?? '',
                                field.onChange,
                                field.onBlur,
                                !!fieldState.error,
                            )}
                            {fieldState.error?.message && (
                                <ErrorMessage
                                    id={errorId}
                                    message={fieldState.error.message}
                                />
                            )}
                        </>
                    )}
                />
            ) : (
                renderInput(String(value ?? ''), onChange, onBlur)
            )}
        </div>
    );
}) as <TFieldValues extends FieldValues = FieldValues>(
    props: TextInputControlProps<TFieldValues>,
) => React.ReactElement;