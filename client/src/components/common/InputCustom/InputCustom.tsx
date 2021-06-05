import React, { ReactElement, ChangeEvent, useState, useEffect } from 'react';
import TextError from '../TextError/TextError';
import styles from './InputCustom.module.css';

interface IProps {
    type: string; // Type of input.
    name: string;
    value: string;
    setValue(value: unknown, target: string): void;
    label: string;
    maxCount?: number; // If the field is not allowed to exceed a number of characters.
    messageError?: string; // Message error to display if a pattern does not agree.
    pattern?: RegExp;
    checkValue?: string; // value to check compared to a this field.
}

const defaultProps = {
    maxCount: 0,
    messageError: '',
    pattern: undefined,
    checkValue: undefined,
};

const InputCustom = ({
    type,
    name,
    label,
    value,
    setValue,
    maxCount = 0,
    pattern,
    messageError,
    checkValue,
}: IProps): ReactElement => {
    const [isValid, setIsValid] = useState<boolean>(true);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    /** I check if a value must be checked and if it has been correctly entered,
     * in this case I can activate the button.
     * */
    useEffect(() => {
        if (typeof checkValue !== 'undefined' && checkValue.length === 0) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [checkValue]);

    /** I set the value given by user within the state,
     *  Optional: if maxCount has been correctly entered it will not exceed the length allowed.
     * */
    const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
        const { target } = e;

        if (maxCount) {
            setValue(target.value.substring(0, maxCount), target.name);
        } else {
            setValue(target.value, target.name);
        }

        // If a value should be checked compared to current field.
        if (typeof checkValue !== 'undefined') {
            setIsValid(checkValue === target.value);
        }

        // If a value should be checked compared to a pattern.
        if (typeof pattern !== 'undefined') {
            setIsValid(pattern.test(target.value));
        }
    };

    return (
        <label htmlFor={name} className={styles.inputParent}>
            <div className={styles.wrapperInput}>
                <input
                    id={name}
                    className={`${styles.inputCustom} ${
                        (value.length > 0 &&
                            (isValid
                                ? styles.inputValid
                                : styles.inputError)) ||
                        ''
                    } ${isDisabled ? styles.isDisabled : ''}`}
                    type={type}
                    name={name}
                    placeholder=" "
                    value={value}
                    onChange={(e) => handleInput(e)}
                    disabled={isDisabled}
                />
                <span className={styles.labelInput}>{label}</span>
                {maxCount > 0 && (
                    <span
                        className={styles.maxCount}
                    >{`${value.length}/${maxCount}`}</span>
                )}
            </div>
            {/** Error message if the pattern does not the agree */}
            {pattern && value.length > 0 && !isValid && messageError && (
                <TextError value={messageError} />
            )}
            {/** Error message if the value to check is not the same as the current value */}
            {checkValue && !isValid && (
                <TextError value={`The ${label} does not the same value`} />
            )}
        </label>
    );
};

InputCustom.defaultProps = defaultProps;

export default InputCustom;
