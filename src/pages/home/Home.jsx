import Banner from "../../components/banner/Banner";
import NavBar from "../../components/nav/NavBar";
import './index.css'
import { CityCard } from "../../components/city/CityCard";
import { TypeCard } from "../../components/type/TypeCard";
import LoveCard from "../../components/love/LoveCard";
import { Footer } from "../../components/footer/Footer";

const Home = () => {

	const cities = [
		{
			"name": "Dublin",
			"subText": "123 properties",
			"image": "./images/city_1.webp"
		},
		{
			"name": "Reno",
			"subText": "533 properties",
			"image": "./images/city_2.webp"
		},
		{
			"name": "Austin",
			"subText": "532 properties",
			"image": "./images/city_3.webp"
		}
	]
	const types = [
		{
			"name": "Hotels",
			"count": 233,
			"image": "./images/type_1.webp"
		},
		{
			"name": "Apartments",
			"count": 2331,
			"image": "./images/type_2.jpg"
		},
		{
			"name": "Resorts",
			"count": 2331,
			"image": "./images/type_3.jpg"
		},
		{
			"name": "Villas",
			"count": 2331,
			"image": "./images/type_4.jpg"
		},
		{
			"name": "Cabins",
			"count": 2331,
			"image": "./images/type_5.jpg"
		}
	]
	const hotels = [
		{
			"name": "Aparthotel Stare Miasto",
			"city": "Madrid",
			"price": 120,
			"rate": 8.9,
			"type": "Excellent",
			"image_url": "./images/hotel_1.webp"
		},
		{
			"name": "Comfort Suites Airport",
			"city": "Austin",
			"price": 140,
			"rate": 9.3,
			"type": "Exceptional",
			"image_url": "./images/hotel_2.jpg"
		},
		{
			"name": "Four Seasons Hotel",
			"city": "Lisbon",
			"price": 99,
			"rate": 8.8,
			"type": "Excellent",
			"image_url": "./images/hotel_3.jpg"
		},
		{
			"name": "Hilton Garden Inn",
			"city": "Berlin",
			"price": 105,
			"rate": 8.9,
			"type": "Excellent",
			"image_url": "./images/hotel_4.jpg"
		}
	]
	return (
		<>
			<header className="relative">
				<NavBar />
				<Banner />
			</header>
			{/* Recommend city */}
			<div className="max-w-screen-lg mx-auto text-white mb-64 city-feature">
			{
				cities.map((value, index) => (
					<CityCard props={value} key={index}/>
				))
			}
			</div>

			{/* List type */}
			<section className="max-w-screen-lg mx-auto mb-64">
				<h3 className="mb-24">Browser by property type</h3>

				<div className="flex type-feature">
				{
					types.map((value, index) => (
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
					hotels.map((value, index)=>(
						<LoveCard key={index} hotel={value} />
					))
				}
				</div>
			</section>
			
			<Footer />
		</>
	);
};

export default Home;
