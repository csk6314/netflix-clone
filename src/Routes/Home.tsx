import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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

const Banner = styled.div<{ bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding:60px;
    background-image: linear-gradient(rgba(20,20,20,0),60%,rgba(20,20,20,1)),url(${(props) => props.bgPhoto});
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

const Slider = styled.div`
    position: relative;
    top:-100px;
    width: 100%;
    height: 150px;  
`;

const Row = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(6,1fr);
    gap:5px;
    position: absolute;
    width: 100%;
`;

const Box = styled(motion.div)<{bgPhoto:string}>`
    background-color: white;
    background-image: url(${props=>props.bgPhoto});
    background-size: cover;
    height: 150px;
    font-size:20px;  
    &:first-child {
        transform-origin: center left;
    }
    &:last-child{
        transform-origin: center right;
    }
`;

const Info = styled(motion.div)`
  padding:15px;
  height: 100px;
  width: 100%;
  position: absolute;
  bottom: -100px;
  opacity: 0;
  background-color  : rgb(20,20,20);
  
  h4{
      font-size: 18px;
      font-weight: bold;
  }
  p{
      font-size:12px;
  }
`;

const rowVariants = {
    hidden: {
        x: window.outerWidth + 10
    },
    visible: { x: 0 },
    exit: { x: -window.outerWidth - 10 },
};

const boxVariants = {
    normal : {
        scale:1.0,
    },
    active : {
        scale:1.2,
        y:-50,
        boxShadow:'rgba(0, 0, 0, 0.6) 0px 3px 8px',
        transition:{
            delay :0.5,
            duration:0.3,
            type:'tween'
        }
    }
}

const infoVariants = {
    active:{
        opacity:1,
        boxShadow:'rgba(0, 0, 0, 0.6) 0px 3px 8px',
        transition:{
            delay :0.5,
            duration:0.3,
            type:'tween'
        }
    }
}

const Home = () => {
    const { data, isLoading } = useQuery<IGetMovieResult>(["movies", "nowPlaying"], getMovies);
    console.log(data);
    const [index, setIndex] = useState(0);
    const [leaving,setLeaving] = useState(false);
    const offset=6;
    const toggleLeaving = () => {
        setLeaving((prev) => !prev);
    }
    const increaseIndex = () => {
        if(data) {
        if(leaving) return;
        toggleLeaving();
        const totalMovies = data.results.length -1;
        const maxIndex = Math.floor(totalMovies/offset) - 1;    
        setIndex((prev) => (prev===maxIndex?0:prev+1));
        }
    };
    return <Wrapper>
        {isLoading ? <Loader>Loading...</Loader> :
            <>
                <Banner onClick={increaseIndex} bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                    <Title>{data?.results[0].title}</Title>
                    <Overview>{data?.results[0].overview}</Overview>
                </Banner>
                <Slider>
                    <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                        <Row
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{type:"tween",duration:1}}
                            key={index}
                        >
                            {data?.results.slice(1).slice(offset*index,offset*index+offset).map((movie)=> (
                                <Box 
                                key={movie.id}
                                bgPhoto={makeImagePath(movie.backdrop_path,"w500")}
                                variants={boxVariants}
                                whileHover="active"
                                initial="normal"
                                transition={{type:'tween'}}
                                >
                                    <Info variants={infoVariants}>
                                        <h4 style={{marginBottom:"5px"}}>
                                            {movie.title}
                                        </h4>
                                        <p>
                                            {movie.overview.substring(0,150)} ...
                                        </p>
                                        </Info>
                                </Box>
                            ))}
                        </Row>
                    </AnimatePresence>
                </Slider>
            </>
        }
    </Wrapper>
}
export default Home;