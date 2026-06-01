import "../src/index.css"
import React from "react"
import DraggableText from "./DraggableText"
import html2canvas from "html2canvas"
export default function Main() {
    const [meme, setMeme] = React.useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    })
    const [allMemes, setAllMemes] = React.useState([])
    function handleChange(event){
        const {value,name} = event.currentTarget
        setMeme((curr)=>{
            return {
                ...curr,
                [name]:value
            }
        })
    }
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    function randImg(){
        const randomUrl = Math.floor(Math.random()*(99)+0);
        console.log(randomUrl)
        setMeme((prev)=>{
            return ({
                ...prev,
                imageUrl : allMemes[randomUrl].url
            });
        })
    }
    const [moveText,setMoveText] = React.useState([]);
    function handleClick(){
        const newText = {
            text : "Hello World",
            x :100,
            y : 50,
            id : Date.now()
        }
        setMoveText((prev)=>{
            return [
                ...prev,
                newText
            ]
        })
    }
    console.log(moveText)
    function updatePos(newval,nid){
        setMoveText((prev)=>{
            return prev.map((awsm)=>{
                if(awsm.id==nid){
                    return { 
                        ...awsm,
                        x:newval.x,
                        y:newval.y
                    }
                }
                return awsm
            })
        })
    }
    const downloadMeme = async () => {
        const memeContainer = document.querySelector(".meme");

        try {
            const canvas = await html2canvas(memeContainer, {
                useCORS: true, 
                logging: false
            });
            const dataUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = `meme-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error("Oops, something went wrong saving the meme!", error);
        }
    };
    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </label>
                <button onClick={randImg}>Get a new meme image 🖼</button>
                <button onClick={handleClick}>Add Movable Text</button>
                <button onClick={downloadMeme}>DownLoad Meme</button>
            </div>
            <div className="meme">
                <img src= {meme.imageUrl}/>
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
                {moveText.map((curr)=>
                <DraggableText 
                key={curr.id}
                textData={curr} 
                id={curr.id} 
                onUpdate={(newval)=>{updatePos(newval,curr.id)}}/>)}
            </div>
        </main>
    )
}