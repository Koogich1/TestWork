import React from 'react'
import { MdErrorOutline } from 'react-icons/md'

type Props = {
	ErrorMessage: string
}

const ErrorBlock = ({ErrorMessage}: Props) => {
	return (
		<div className='py-2 bg-red-200 text-red-600 border-2 rounded-lg border-red-500 flex gap-2 items-center justify-center'>
			{ErrorMessage}
			<MdErrorOutline />
		</div>
	)
}

export default ErrorBlock