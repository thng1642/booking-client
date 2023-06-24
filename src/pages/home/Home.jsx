import Banner from "../../components/banner/Banner";
import NavBar from "../../components/nav/NavBar";
import { CityCard } from "../../components/city/CityCard";
import { TypeCard } from "../../components/type/TypeCard";
import LoveCard from "../../components/love/LoveCard";
import { Footer } from "../../components/footer/Footer";
import SearchBar from "../../components/search/bar/SearchBar";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import './index.css'

const Home = () => {

	const cities = ['da nang', 'ho chi minh', 'ha noi']
	const imgCity = [
		"https://firebasestorage.googleapis.com/v0/b/dotted-hulling-326801.appspot.com/o/city%20image%2FDa%20Nang.jpg?alt=media&token=f631df51-17e8-4eb6-ba7e-bf2464cdc432&_gl=1*1gbzplf*_ga*MTQyMjAwMzY0MC4xNjYzMzk0Nzg1*_ga_CW55HF8NVT*MTY4NTkwMjgwNi40LjEuMTY4NTkwMzQ0OS4wLjAuMA..",
		"https://firebasestorage.googleapis.com/v0/b/dotted-hulling-326801.appspot.com/o/city%20image%2FHCM.jpg?alt=media&token=24721874-547e-49dc-ade5-438c414240a5&_gl=1*1tk69mt*_ga*MTQyMjAwMzY0MC4xNjYzMzk0Nzg1*_ga_CW55HF8NVT*MTY4NTkwMjgwNi40LjEuMTY4NTkwMzUxOC4wLjAuMA..",
		"https://firebasestorage.googleapis.com/v0/b/dotted-hulling-326801.appspot.com/o/city%20image%2FHa%20Noi.jpg?alt=media&token=c3f8bcdc-e31b-4d47-ab1d-47164521c64b&_gl=1*e9ep9h*_ga*MTQyMjAwMzY0MC4xNjYzMzk0Nzg1*_ga_CW55HF8NVT*MTY4NTkwMjgwNi40LjEuMTY4NTkwMzUyOS4wLjAuMA.."
	]
	const isLoadedCity = useRef(false)
	const isLoadedType = useRef(false)
	const [isLoadedTopRating, setIsLoadedTopRating] = useState(false)
	const [cityDiv, setCityDiv] = useState([])
	const initialTypes = [
		{
			"name": "Hotel",
			"count": 0,
			"image": "./images/type_1.webp"
		},
		{
			"name": "Apartments",
			"count": 0,
			"image": "./images/type_2.jpg"
		},
		{
			"name": "Resorts",
			"count": 0,
			"image": "./images/type_3.jpg"
		},
		{
			"name": "Villas",
			"count": 0,
			"image": "./images/type_4.jpg"
		},
		{
			"name": "Cabins",
			"count": 0,
			"image": "./images/type_5.jpg"
		}
	]
	const [hotelType, setHotelType] = useState([])
	const [topHotels, setTopHotels] = useState([])
	

	/**
	 * Api get count hotel in the city
	 * @param {String} city city to get count hotel
	 * @returns Promise 	
	 */
	const getQuantityHotel = async ( city ) => {
		const quantity = await axios.get(`http://localhost:5000/api/v1/hotel/location?city=${city}`)

		return quantity
	}
	/**
	 * Api get count hotel in type
	 */
	const getQuantityHotelByType = async ( type ) => {
		const quantity = await axios.get(`http://localhost:5000/api/v1/hotel/category?type=${type}`)
		
		return quantity
	}
	/**
	 * Fetching Top Rating from DB
	 */
	const fetchTopRatingHotel = async () => {
		setIsLoadedTopRating(true)
		try {
			const response = await axios.get('http://localhost:5000/api/v1/hotel/top-rating')

			console.log("Top 3 rating hotel: ", response.data)
			setTopHotels(response.data)
		} catch( err ) {
			console.log("Error api top rating hotel: ", err)
		}
	}

	const scrollLoading = () => {
		if (window.innerHeight + document.documentElement.scrollTop <= 1178) return
		// call api gets top 3 rating hotels
		fetchTopRatingHotel()
	}

	/**
	 * Get/count hotel in the city
	 */
	useEffect(() => {

		if ( !isLoadedCity.current ) {

			isLoadedCity.current = true
			const request = cities.map(city => {
				return getQuantityHotel( city ).catch( e => console.log("Error call API hotel city", e))
			})
	
			Promise.all( request )
				.then( response => {
					// console.log("Response: ", response)
					let tmp = []
					for(let _i = 0; _i < 3; _i++) {
						tmp.push({ name: cities[_i], image: imgCity[_i], subText: response[_i].data})
					}
					setCityDiv(tmp)
				})
		}
	}, [])

	/**
	 * Get/count hotels in a type
	 */
	useEffect(() => {

		if (!isLoadedType.current) {
			isLoadedType.current = false

			const requests = initialTypes.map( value => {
				return getQuantityHotelByType(value.name).catch( e => console.log("Error count API hotel by type", e))
			})
	
			Promise.all( requests )
				.then( response => {
					for (let _i = 0; _i < initialTypes.length; _i++) {
						const element = initialTypes[_i];
						element.count = response[_i].data
					}
					setHotelType(initialTypes)
				})
		}
	}, [])

	/**
	 * Get top 3 rating hightest
	 */
	useEffect(() => {
		if ( isLoadedTopRating ) {
			return
		} 
		window.addEventListener('scroll', scrollLoading)
		return () => window.removeEventListener('scroll', scrollLoading)
	},[isLoadedTopRating])

	// useEffect(()=>{

	// }, [topHotels])
	return (


		<>
			<header className="relative mb-64">
				<Banner />
				<SearchBar />
			</header>
			{/* Recommend city */}
			<div className="max-w-screen-lg mx-auto text-white mb-64 city-feature">
			{	(cityDiv.length !== 0) ? 
				cityDiv.map((value, index) => (
					<CityCard props={value} key={index}/>
				)) : null
			}
			</div>

			{/* List type */}
			<section className="max-w-screen-lg mx-auto mb-64">
				<h3 className="mb-24">Browser by property type</h3>

				<div className="flex type-feature">
				{
					hotelType.map((value, index) => (
						<TypeCard type={value} key={index}/>
					))
				}
				</div>
			</section>

			{/* List guest love hotels */}
			<section className="max-w-screen-lg mx-auto mb-64">
				<h3 className="mb-24">Homes guests love</h3>

				<div className="list-hotel-love">
				{
					(topHotels?.length > 0) ? 
						topHotels.map((value, index)=>(
							<LoveCard key={index} hotel={value} />
						)) : <>
						<Stack spacing={1}>	
							<Skeleton animation="wave" variant="rounded" width={'100%'} height={'400px'} />
							<Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
							<Skeleton animation="wave" variant="text" sx={{ fontSize: '.97rem' }} />
					  	</Stack>
						<Stack spacing={1}>	
							<Skeleton animation="wave" variant="rounded" width={'100%'} height={'400px'} />
							<Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
							<Skeleton animation="wave" variant="text" sx={{ fontSize: '.97rem' }} />
					  	</Stack>
						<Stack spacing={1}>	
							<Skeleton animation="wave" variant="rounded" width={'100%'} height={'400px'} />
							<Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
							<Skeleton animation="wave" variant="text" sx={{ fontSize: '.97rem' }} />
					  	</Stack></>
				} 
				</div>
			</section>
		</>
	);
};

export default Home;
