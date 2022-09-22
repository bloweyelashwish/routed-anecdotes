import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = ({ target }) => {
        setValue(target.value)
    }

    const onReset = () => {
        setValue('')
    }

    return {
        type,
        value,
        onChange,
        onReset
    }
}