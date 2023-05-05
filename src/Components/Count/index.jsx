import { useState } from "react"
import ButtonCount from 'Components/ButtonCount'


function Count() {
    const [count, setCount] = useState(1)

    const plus = () => {
        setCount(count + 1)
    }

    const minus = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }
    return (
        <div>
            <div className="flex justify-center items-center gap-2">
                <p className='text-lg italic'>{count}</p>
                <div className='flex flex-col'>
                    <ButtonCount
                        changeCount={minus}
                        title={<svg
                            fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-3 h-3">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>} />
                    <ButtonCount changeCount={plus}
                        title={<svg
                            fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-3 h-3">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>}
                    />
                </div>
            </div>
        </div>
    )
}

export default Count