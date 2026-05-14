"use client"
import ShinyText from '../ShinyText'

const ShinyMiransastext = () => {
    return (
        <div className='w-full h-44  flex items-center justify-center mt-10'>
            <ShinyText
                text="Miransas"
                speed={2}
                delay={0}
                color="#b5b5b5"
                shineColor="#ffffff"
                spread={120}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
                disabled={false}
                className='text-[18rem] font-bold'
            />
        </div>
    )
}

export default ShinyMiransastext