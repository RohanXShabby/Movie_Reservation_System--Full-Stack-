import React from 'react'

const MovieCard = ({ posterUrl, title, description, genre }) => {
    return (
        <div className='border border-dark-secondary flex flex-col items-center justify-center py-4 rounded-2xl text-dark-text'>
            <div className='w-70 flex flex-col gap-4'>
                <img className='w-full h-90 object-cover object-center' src={posterUrl} alt={title} />
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                        <div className='font-semibold text-2xl'>
                            {title}
                        </div>
                        <div className='text-dark-text/60'>
                            {genre.map((e) => <span className='border border-dark-secondary px-2 mx-1'>{e}</span>)}
                        </div>
                    </div>
                    <div className='line-clamp-2 font-medium text-sm text-dark-text/80'>
                        {description}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MovieCard
