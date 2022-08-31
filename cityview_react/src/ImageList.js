import './ImageList.scss'

const ImageList = ({images, updateMG, isClick}) => {
    console.log('images got from ImageList', images)
    return <div className= 'carousel'>
        {
            images && images.map((img, index) =>
                <div key={index}
                     onClick={()=>{
                         updateMG(img);
                         isClick()
                         // window.location.href = '/page1'
                     } }
                     style={{background: `url('${img.thumb}') no-repeat center center/cover fixed`}}></div>)

        }
    </div>
}

export default ImageList