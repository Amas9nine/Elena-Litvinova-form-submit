import React, { useState, useCallback } from 'react';
import styles from './index.module.scss';

export const InputTask = ({ title, id, onDone, onDelete, onEdite }) => {

    const [checked, setChecked] = useState(false);
    const [isEditModeButton, setEditModeButton] = useState(false);
    const [value, setValue] = useState(title)

    const onChange = (event) => {
        setChecked(event.target.checked);
        setTimeout(() => {
            onDone(id)
        }, 3000)
    }

    const onDeleted = () => {
        onDelete(id)
    }

    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input
                    type="checkbox"
                    checked={checked}
                    className={styles.inputTaskCheckbox}
                    onChange={onChange}
                />
                {isEditModeButton ? (
                    <form onSubmit={() => {
                        setEditModeButton(false);
                        onEdite(id, value);
                    }}>
                        <input
                            type="text"
                            value={value}
                            className={styles.inputTaskTitleEdit}
                            onChange={(event) => {
                                setValue(event.target.value)
                            }}
                        />
                    </form>
                ) : (
                    <h3 className={checked ? styles.checked : ""}>{title}</h3>
                )}
            </label>
            {
                isEditModeButton ? (
                    <button
                        onClick={() => {
                            setEditModeButton(false);
                            onEdite(id, value);
                        }}
                        aria-label="Save"
                        className={styles.inputTaskEdit}
                    />
                ) : (
                    <button
                        onClick={() => {
                            setEditModeButton(!isEditModeButton)
                        }}
                        aria-label="Edit"
                        className={styles.inputTaskEdit}
                    />
                )
            }
            <button
                onClick={onDeleted}
                aria-label="Remove"
                className={styles.inputTaskRemove}
            />
        </div >
    );
}

/* For Edit mode
<input
    className={styles.inputTaskTitleEdit}
/>

<button
    aria-label="Save"
    className={styles.inputTaskSave}
/>
*/