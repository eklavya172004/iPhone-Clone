import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollTrigger)

export const animatetrigger = (target,animationprops,scrollprops) => {
            gsap.to(target,{
                ...animationprops,
                scrollTrigger:{
                    trigger:target,
                    toggleActions:'restart reverse restart reverse',
                    start: 'top 85%',
                    ...scrollprops,
                }
            })
}

export const animatewithGsap = (timeline,rotationRef,rotationState,firstTarget,secondTarget,animationProps) => {
    timeline.to(rotationRef.current.rotation,{
        y:rotationState,
        duration:1,
        ease:'power2.inOut'
    })

    timeline.to(
        firstTarget,
        {
            ...animationProps,
            ease:'power2.inOut'
        },
        '<' //inert the animation at the start of the previous animation
    )

    timeline.to(
        secondTarget,
        {
            ...animationProps,
            ease:'power2.inOut'
        },
        '<' //inert the animation at the start of the previous animation
    )
}