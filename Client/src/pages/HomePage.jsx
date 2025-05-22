import { useEffect, useState } from "react";
import axiosInstance from "../Services/axiosInstance"
import MovieCard from "../components/UI/MovieCard";
import { Link } from "react-router-dom";

const HomePage = () => {

    const [movies, setMovies] = useState()

    const fetchedMovie = async () => {
        const request = await axiosInstance.get('/get-movies');
        const response = await request.data?.movies
        setMovies([...response])
    }

    useEffect(() => {
        fetchedMovie()
    }, [])
    console.log(movies)


    return (
        <div>
            <div className="grid grid-cols-4 gap-8 py-12 px-24">
                {movies && movies.map((node) => {
                    return <Link key={node._id}>
                        <MovieCard posterUrl={node.posterUrl} title={node.title} description={node.description} genre={node.genre} /></Link>
                })}
            </div>
        </div>
    )
}

export default HomePage
