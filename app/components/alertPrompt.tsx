import { GoAlertFill } from "react-icons/go";
import { IoCloseCircle } from "react-icons/io5";

import React from 'react'

type Props = {
    setError: any;
    message: string;
}

export default function AlertPrompt({ setError, message }: Props) {
    return (
        <div className="sticky border-b border-black z-20 right-0 top-3 mb-2 flex flex-row items-center justify-center gap-3 bg-black/75 backdrop-blur-lg p-1">
            <p className="text-red-600 flex flex-row items-center justify-center gap-1">
                <GoAlertFill /> <span>{ message }</span>
            </p>
            <button onClick={ () => setError(false) } className="bg-transparent p-1 border-none"><IoCloseCircle className="text-white" size={ 22 } /></button>
        </div>
    )
}
