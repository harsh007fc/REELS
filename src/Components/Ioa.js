import React,{useState,useEffect} from 'react'
import vid1 from './fashion.mp4'
import vid2 from './frog.mp4'
import vid3 from './water.mp4'
import vid4 from './tree.mp4'
import Video from './Video'
// import  '../App.css'

function Ioa() {
    let [sources,setSources] = useState([{url:vid1},{url:vid2},{url:vid3},{url:vid4}])
    const callback = (entries) => {
        entries.forEach(element =>{
            console.log(element);
            let el = element.target.children[0];
            el.play().then(()=>{
                //if this video is not in viewport then pause it
                if(!el.paused && !element.isIntersecting)
                {
                    el.pause();                
                }
            })

        });
    }

    let observer = new IntersectionObserver(callback,{
        threshold:"0.9",
        root:null,
    });

    useEffect(()=>{
        let elements = document.querySelectorAll('.videos');
        elements.forEach((el)=>{
           
            observer.observe(el);
        })
    },[])
    return (
        <div className='video-container'>
            <div className='videos'>
                <Video source={sources[0].url} />
            </div>
            <div className='videos'>
                <Video source={sources[1].url} />
            </div>
            <div className='videos'>
                <Video source={sources[2].url} />
            </div>
            <div className='videos'>
                <Video source={sources[3].url} />
            </div>
        </div>
    )
}

export default Ioa
