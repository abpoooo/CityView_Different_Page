import {useEffect, useState} from "react";
import {AccessKey, BasicUrl, DefaultCity} from "./consts";
import axios from "axios";
import './CityInput.scss'


const CityInput = ({cbUpdateImages}) => {
    // callback function for input when key is down

    const [city, setCity] = useState(DefaultCity)


    const cbInput = evt => {


        let newCity = evt.target.value.trim().toLowerCase()


        evt.key === "Enter" &&
        newCity !== city &&
        (() => {
            setCity(newCity) //async
            console.log('new City', city, newCity)

            fetchCity(newCity)
        })()
    }

    useEffect(() => {
        fetchCity(DefaultCity)
    }, [])

    const fetchCity = newCity =>
        //     axios ---3rd party library
        //    https://www.npmjs.com/package/axios
        axios.get(BasicUrl, {
            params: {
                query: newCity,
                orientation: 'landscape',
            },
            headers: {
                Authorization: `Client-ID ${AccessKey}`
            }
        }).then(res => {
            console.log('raw data', res)
            let {data: {results}} = res
            console.log('results----->', results)

            let imageLists = results.map(item => ({
                des: item.alt_description,
                regular: item.urls.regular,
                thumb: item.urls.thumb

            }))
            cbUpdateImages(imageLists)

        }).catch(err => console.log('fetch city http error!', err))


    return <>
        <h2 className='cityName'>
        New City: {city}</h2>
        <input type="text"
               className='InputCity'
               placeholder="Search City here..."
               onKeyDown={cbInput}
        />
    </>


}

export default CityInput