'use client'
import { useEffect, useState, useCallback } from 'react';
import Header from '@/components/header'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useRouter } from 'next/navigation'

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

const CharacterDetails = ({ params }) => {
  
  const imgUrl = "https://picsum.photos/400/200?random=";

  const dateFormat = (datestr) => {
    const date = new Date(datestr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const [starData, setStarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [homeWorldData, setHomeWorld] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('UserData');
    if (!token) {
        router.push('/'); 
    }
    getListing();
  }, []);

  const getListing = useCallback(async () => {
    let url = `https://swapi.dev/api/people`;
    try {
      let response = await fetch(url);
      let list = await response.json();
      const decodedName = decodeURIComponent(params.star);
      if (list.results && list.results.length > 0) {
        let star = list.results.find(data => data.name == decodedName);
        setStarData(star);
        getHomeWorld(star)
      }
    } catch (error) {
      console.error('Error fetching the list:', error);
    } finally {
      setLoading(false);
    }
  }, [params.star]);
 const getHomeWorld = async(star) =>{
  try {
    let homeWorldRes = await fetch(star.homeworld);
    let homeWorld = await homeWorldRes.json()
    console.log('asas', homeWorld)

    if(homeWorld){
      setHomeWorld(homeWorld)
      console.log('asa', homeWorldData)
    }
  } catch (error) {
    console.error('Error fetching the list:', error);
  } finally {
    setLoading(false);
  }
  }
  
  return (
    <>
      <Header />
      {starData && (
        <h1 className='text-black text-center mt-2 font-bold  text-3xl'>{starData.name}</h1>
      )}
      <div className="flex items-center justify-center min-h-screen text-black shadow rounded-lg ">
        {loading ? (
          <div className="w-full max-w-[90%] flex-row">
            <Skeleton height={300} width="100%" />
            <div className="flex flex-col space-y-4 p-4">
              <Skeleton height={40} width="60%" />
              <Skeleton height={40} width="80%" />
              <Skeleton height={40} width="50%" />
              <Skeleton height={40} width="70%" />
            </div>
          </div>
        ) : (
          starData && homeWorldData && (
            <Card className="w-full max-w-[90%] flex-row">
              <CardHeader
                shadow={false}
                floated={false}
                className="m-0 w-2/5 shrink-0 rounded-r-none"
              >
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody>
  <div className="m4 grid grid-col-2 gap-4 ml-4 ">
    <div className="flex ">
      <Typography variant="h6" color="gray" className="uppercase">
        Height: 
      </Typography>
      <Typography variant="body1" color="blue-gray" className="ml-2">
         {starData.height} M
      </Typography>
    </div>
    <div className="flex">
      <Typography variant="h6" color="gray" className="uppercase">
        Weight: 
      </Typography>
      <Typography variant="body1" color="blue-gray" className="ml-2">
         {starData.mass} KG
      </Typography>
    </div>
    <div className="flex">
      <Typography variant="h6" color="gray" className="uppercase">
        Addition Date: 
      </Typography>
      <Typography variant="body1" color="blue-gray" className="ml-2">
      {dateFormat(starData.created)}
      </Typography>
    </div>
    <div className="flex">
      <Typography variant="h6" color="gray" className="uppercase">
      Movies appearance: 
      </Typography>
      <Typography variant="body1" color="blue-gray" className="ml-2">
         {starData.films.length}
      </Typography>
    </div>
    <div className="flex">
      <Typography variant="h6" color="gray" className="uppercase">
        Birth Year: {starData.birth_year}
      </Typography>
      <Typography variant="body1" color="blue-gray" className="ml-2">
         {starData.films.length}
      </Typography>
    </div>
    {/* --------------HOME WORLD----------------- */}

    <div className="flex">
      <Typography variant="h6" color="gray" className="uppercase">
       HomeWorld Name: 
      </Typography>
      <Typography variant="body1" color="blue-gray" className="ml-2">
       {homeWorldData.name}
      </Typography>
    </div>

    <div className="flex">
      <Typography variant="h6" color="gray" className="uppercase">
        HomeWorld Climate:
      </Typography>
      <Typography variant="body1" color="blue-gray" className="ml-2">
        {homeWorldData.climate}
      </Typography>
    </div>
    <div className="flex">
      <Typography variant="h6" color="gray" className="uppercase">
        HomeWorld Terrain:
      </Typography>
      <Typography variant="body1" color="blue-gray" className="ml-2">
        {homeWorldData.terrain}
      </Typography>
    </div>
    <div className="flex">
      <Typography variant="h6" color="gray" className="uppercase">
        HomeWorld Total Residents:
      </Typography>
      <Typography variant="body1" color="blue-gray" className="ml-2">
       {homeWorldData.residents.length}
      </Typography>
    </div>
  </div>
</CardBody>

            </Card>
          )
        )}
      </div>
    </>
  );
};

export default CharacterDetails;
