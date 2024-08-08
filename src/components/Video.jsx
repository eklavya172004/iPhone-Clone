// import { list } from "postcss"
import { useEffect, useRef, useState } from "react"
import { hightlightsSlides } from "../constants"
import gsap from "gsap";
// import { space } from "postcss/lib/list";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const Video = () => {

    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);
    

    const [video,setvideo] = useState({
        isend:false,
        startPlay:false,
        videoID:0,
        isLastVideo:false,
        isPlaying:false,
    })

    const {  isend,startPlay,videoID,isLastVideo,isPlaying } = video;

    useGSAP(() => {
        gsap.to('#slider',{
            transform:`translateX(${-100 * videoID}%)`,
            duration: 2,
            ease:'power2.inOut'
        })

        gsap.to('#video',{
            scrollTrigger:{
                trigger:'#video',
                toggleActions:'restart none none none'
            },
            onComplete: () => {
                setvideo((pre) => ({
                    ...pre,
                    startPlay:true,
                    isPlaying:true
                }))
            }
        })
    },[isend,videoID])

    const [loadedData,setLoadedData] = useState([]);

    useEffect(() => {
            if(loadedData.length>3){
                if(!isPlaying){
                    videoRef.current[videoID].pause();
                }
                else{
                    startPlay && videoRef.current[videoID].play();
                }
            }
    },[startPlay,videoID,isPlaying,loadedData])

    

    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;

        if(span[videoID]){

            let anim = gsap.to(span[videoID],{
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100);
                
                if(progress != currentProgress){
                    currentProgress = progress;

                    gsap.to(videoDivRef.current[videoID],{
                        width: window.innerWidth < 760 ? '10vw'  : window.innerWidth < 1200 ? '10vw' : '4vw'
                    })

                    gsap.to(span[videoID],{
                        width: `${currentProgress}%`,
                        backgroundColor:'white'
                    })
                }
                },
                onComplete: () => {
                    if(isPlaying){
                        gsap.to(videoDivRef.current[videoID],{
                            width:'12px'
                        })

                        gsap.to(span[videoID],{
                            backgroundColor: '#afafaf'
                        })
                    }
                }
            })

            if(videoID === 0){
                anim.restart();
            }

            const animUpdate = () => {
                anim.progress(videoRef.current[videoID].currentTime / hightlightsSlides[videoID].videoDuration)
            }
    
    if(isPlaying){
    gsap.ticker.add(animUpdate)
    }
    else{
    gsap.ticker.remove(animUpdate)
    }
        }
        

    },[videoID,startPlay])

    const handleProcess = (type,i) => {
        switch (type) {
            case 'video-end':
                    setvideo((pre) => ({...pre, isend:true,videoID:i+1}))
                break;

            case 'video-last':
                    setvideo((pre) => ({...pre,isLastVideo:true}))
                break;
        
                case 'video-reset':
                    setvideo((pre) => ({...pre,isLastVideo:false,videoID:0}))
                break; 

                case 'play':
                    setvideo((pre) => ({...pre,isPlaying: !pre.isPlaying}))
                break; 

                case 'pause':
                    setvideo((pre) => ({...pre,isPlaying: !pre.isPlaying}))
                break; 
            default:
                return video;
        }
    }

    const handleLoadedMetaData = (i,e) => setLoadedData((pre) => [...pre,e]);

  return (
    <>
    <div className="flex items-center">
            {hightlightsSlides.map((list,i) =>  {
                return(
                <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                    <div className="video-carousel_container">
                        <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">

                            <video id="video" 
                            muted 
                            preload="auto" 
                            playsInline={true}
                            ref={(el) => (videoRef.current[i] = el)}
                            onEnded={() => {
                                i !==3 ? handleProcess('video-end',i) : handleProcess('video-last')
                            }}
                            onPlay={() => {
                                setvideo((prevVideo) => ({
                                    ...prevVideo,isPlaying:true
                                }))
                            }} 
                            onLoadedMetadata={(e) => handleLoadedMetaData(i,e)}
                            className={`${list.id ===2 && `translate-x-44`}pointer-events-none`}
                            >
                                <source src={list.video} type="video/mp4" />
                            </video>
                    
                        </div>
                        <div className="absolute top-12 left-[5%] z-10">
                            {list.textLists.map((text) => 
                                <p key={text} className="md:text-2xl text-xl font-medium">
                                    {text} 
                                </p>
                            )}
                        </div>
                    </div>    
                 </div>
                 )
            })}
    </div>

    <div className="relative flex-center mt-10">
            <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                {videoRef.current.map((_,i) => (
                    <span key={i} ref={(el) => (videoDivRef.current[i] = el)}
                    className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                    >

                        <span className="absolute h-full w-full rounded-full" ref={(el) => (videoSpanRef.current[i] = el)} />
                                
                    </span>
                ))}
            </div>
            <button className="control-btn">
                <img src={  isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg  } alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}  onClick={() => {
        if (isLastVideo) {
            handleProcess('video-reset');
        } else if (!isPlaying) {
            handleProcess('play');
        } else {
            handleProcess('pause');
        }
    }}   />
            </button>
    </div>
    </>
  )
}

export default Video
