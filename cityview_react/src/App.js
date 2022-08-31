import './App.css';
import CityInput from "./CityInput";
import ImageList from "./ImageList";
import {useEffect, useState} from "react";
import {Link, Route, Routes, useParams, useNavigate, Navigate} from "react-router-dom";


// const NavBar = () => {
//     return (
//         <Link to="/page1">
//             Page1
//         </Link>
//     )
// }

const Page1 = ({img}) => {
    // const [images1, setImages1] = useState('')
    // const updateBG = img1 => {
    //     setImages1(img1)
    // }
    // images1.map((img, index) =>
    //     <div key={index}
    //     onClick={()=> updateBG(img)}
    //     style={{background:`url('${img.regular}' no-repeat center center/cover fixed`}}></div>)
    console.log('img',img)
    let navigate = useNavigate()
    const jumpTo = (path) => {
        /*can include more logic actions in history.push*/
        navigate(path, {replace: true}) // replace true or false to replace the page in history
    }
    return (
        <>
            <div className='Page' style={{background: `url('${img.regular}')no-repeat center center/cover fixed`}}>
            <p>The description is: {`${img.des}`}</p>
               <button onClick={()=>jumpTo('/') }>
                   Home
               </button>
            </div>
            {/*<ImageList images={images1} updateMG={updateBG}/>*/}
        </>
    )
}


function Home({updateImage1}) {

    const [images, setImages] = useState([])
    const [bgImage, setBgImage] = useState('')
    const updateMainBG = img => {
        setBgImage(img)
    }

    const [flag , setFlag] = useState(false)

    const isClicked = () => {
        setFlag(true)
    }

    console.log('bgimage', bgImage)
    let navigate = useNavigate()
    const jumpTo = (path) => {
        /*can include more logic actions in history.push*/
        navigate(path, {replace: true}) // replace true or false to replace the page in history
    }

    useEffect(() => {
        document.title = !!bgImage && bgImage?.des && bgImage.des ? bgImage.des.charAt(0).toUpperCase() + bgImage.des.slice(1) : 'Loading...'
        bgImage && (updateImage1(bgImage))
        flag && (jumpTo('/page1'))
        // flag && (window.location.href = '/page1')
        // document.title = !!bgImage && bgImage?.des && bgImage.des ? bgImage.des.charAt(0).toUpperCase() + bgImage.des.slice(1) : 'Loading...'
    }, [bgImage])

    useEffect(() => {
        images.length > 0 && setBgImage(images[0])
    }, [images])

    // useEffect(() => {
    //     window.location.href = '/page1'
    // }, [bgImage])

    const updateImages = newImages =>
        // console.log('Got updated images from CityInput...>>>',newImages)
        setImages(newImages)

    return (
        <>
            <div className='searchBar'>
                <CityInput cbUpdateImages={updateImages}/>
            </div>
            <ImageList images={images} updateMG={updateMainBG} isClick = {isClicked}/>
        </>
    )
}


function App() {
    // const [images, setImages] = useState([])
    // const [bgImage, setBgImage] = useState('')
    //
    // const updateMainBG = img => {
    //     setBgImage(img)
    // }
    //
    // useEffect(() => {
    //     document.title = !!bgImage && bgImage?.des && bgImage.des ? bgImage.des.charAt(0).toUpperCase() + bgImage.des.slice(1) : 'Loading...'
    // }, [bgImage])
    //
    //
    // useEffect(() => {
    //     images.length > 0 && setBgImage(images[0])
    // }, [images])
    //
    //
    // const updateImages = newImages =>
    //     // console.log('Got updated images from CityInput...>>>',newImages)
    //     setImages(newImages)

    const [bgImage, setBgImage] = useState([])

    const updateImages1 = (ImageFromHome) => {
        setBgImage(ImageFromHome)
    }

    console.log('bg', bgImage)
    return <div className="App"
                style={{background: bgImage && bgImage.regular && `url('${bgImage.regular}') no-repeat center center/cover fixed`}}>
        {/*<div className='searchBar'>*/}
        {/*    <CityInput cbUpdateImages={updateImages1}/>*/}
        {/*</div>*/}
        {/*<NavBar/>*/}
        <Routes>
            <Route path="/" element={<Home updateImage1 = {updateImages1}/>}/>
            <Route path="/page1" element={<Page1
                img={bgImage}/>}/>
        </Routes>
        {/*<ImageList images={images} updateMG={updateMainBG}/>*/}
    </div>
}

export default App;
