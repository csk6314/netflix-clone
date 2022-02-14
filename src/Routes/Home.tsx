import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMovieResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
    background-color: rgb(20,20,20);

`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{bgPhoto:string}>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding:60px;
    background-image: linear-gradient(rgba(20,20,20,0),60%,rgba(20,20,20,1)),url(${(props)=>props.bgPhoto});
    background-size:cover;
    text-shadow: 1px 1px 8px rgba(20,20,20,1);
`;

const Title = styled.h2`
    font-size:62px;
    margin-bottom:20px;
`;

const Overview = styled.p`
    font-size:24px;
    line-height: 1.2;
    width: 40%;
`;

const Home = () => {
    const { data, isLoading } = useQuery<IGetMovieResult>(["movies", "nowPlaying"], getMovies);
    console.log(data);
    return <Wrapper>
        {isLoading ? <Loader>Loading...</Loader> :
            <>
                <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path||"")}>
                    <Title>{data?.results[0].title}</Title>
                    <Overview>{data?.results[0].overview}</Overview>
                </Banner>
            </>
        }
    </Wrapper>
}
export default Home;