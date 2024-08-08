import React, { useRef } from 'react'
import { chipImg, frameImg, frameVideo } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { animatetrigger } from '../constants/animations'

const Honkai = () => {
    const videoRef = useRef();
    
    useGSAP(() => {
      gsap.from('#chip',{
            scrollTrigger:{
              trigger:'#chip',
              start:'10% bottom',
            },
            opacity:0,
            scale:2, // its giving it how it should move/appear from screen 
            duration:2,
            ease:'power2.inOut'
      })

      animatetrigger('.g_fadeIn',{y:1,opacity:1,duration:2,ease:'power1.inOt'})
    })

  return (
    <section className='common-padding'>
        <div className='screen-max-width'>
              <div id='chip' className='flex-center w-full y-20'>
                  <img src={chipImg} alt="chip" width={180} height={180} />
              </div>
              
              <div className='flex flex-col items-center mt-20'>
                  <h2 className='hiw-title'>
                    A17 Pro chip
                      <br /> A monster win for gaming.
                  </h2>

                  <p className='hiw-subtitle'>
                    it's here. The biggest redesign in the history of Apple GPUs.
                  </p>
              </div>

              <div className='mt-10 md:mt-20 mb-14'>
                <div className='relative h-full flex-center'>
                  <div className='overflow-hidden'>
                    <img src={frameImg} alt="frame" className='bg-transparent relative z-10' />
                    
                  </div>
                  <div className='hiw-video'>
                      <video className='pointer-events-none' playsInline preload='none' muted autoPlay ref={videoRef}>
                        <source src={frameVideo} type='video/mp4' />

                      </video>
                    </div>
                </div>
                <p className='text-gray font-semibold text-center mt-3'>Honkai: Star Rail</p>
</div>
                <div className='hiw-text-container'>
                                            <div className='flex-col flex-1 flex-center justify-center'>
                                                <p className='hiw-text g_fadeIn'>A17 is entierly new class of iPhone chip that delivers our {' '}
                                                    <span className='text-white'>best graphic performance by far</span>.
                                                </p>

                                           
                                                <p className='hiw-text g_fadeIn mt-10'>Mobile {''}
                                                    <span className='text-white'>games will look and feel so immersive</span>, with incredible detailed environments and more realistic characters.And with industry-leading speed and efficiency, A17 Pro takes fast and runs with it.
                                                </p>
                                            </div>
                                          

                                            <div className='flex-1 flex justify-center flex-col g_fadeIn'>
                                              <div className='hiw-text'>New</div>
                                              <div className='hiw-bigtext'>Pro-class GPU</div>
                                              <div className='hiw-text'>with 6 crores</div>
                                            </div>
                                            </div>
                                    </div>

             
       
    </section>
  )
}

export default Honkai;