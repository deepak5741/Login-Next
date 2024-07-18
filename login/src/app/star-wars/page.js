"use client";
import { useEffect, useState, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '@/components/header'
import { useRouter } from 'next/navigation';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

function Page() {
  const router = useRouter();
  const [starList, setStarList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getListing = useCallback(async () => {
    let url = `https://swapi.dev/api/people?page=${page}`;
    try {
      let response = await fetch(url);
      let list = await response.json();
      if (list.results && list.results.length > 0) {
        setStarList(prevList => [...prevList, ...list.results]);
        setPage(prevPage => prevPage + 1);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching the list:', error);
      setLoading(false);
    }
  }, [page]);
  function getColorClass(skinColor) {
    switch (skinColor.toLowerCase()) {
      case 'fair':
        return 'bg-yellow-200';
      case 'gold':
        return 'bg-yellow-500';
      case 'white, blue':
        return 'bg-blue-100';
      case 'white':
        return 'bg-gray-200';
      case 'light':
        return 'bg-gray-300';
      
      default:
        return 'bg-gray-100'; 
    }
  }
  useEffect(() => {
    getListing();
    const token = localStorage.getItem('UserData');
    if (!token) {
        router.push('/'); 
    }
  }, []);

  const imgUrl = "https://picsum.photos/400/200?random=";

  return (
    <div className='text-black'>
      <Header />
      <InfiniteScroll
        dataLength={starList.length}
        next={getListing}
        hasMore={hasMore}
        loader={
          <div className='grid gap-x-8 gap-y-4 grid-cols-4 p-3'>
            {Array.from({ length: 4 }).map((_, index) => (
              <Card className="mt-6 w-50 transition-shadow duration-300 ease-in-out hover:shadow-lg" key={index}>
                <CardHeader color="blue-gray" className="relative h-56">
                  <Skeleton height="100%" width="100%" />
                </CardHeader>
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    <Skeleton width="80%" />
                  </Typography>
                  <Typography>
                    <Skeleton count={5} />
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <Skeleton width="50%" height="36px" />
                </CardFooter>
              </Card>
            ))}
          </div>
        }
      >
        <div className='grid gap-x-8 gap-y-4 grid-cols-4 p-3'>
          {starList.length > 0 && starList.map((star, index) => (
            <Card className={`mt-6 w-50 transition-shadow duration-300 ease-in-out hover:shadow-lg ${getColorClass(star.skin_color)} `} key={index}
            onClick={() =>{
              const encodedName = encodeURIComponent(star.name);
              router.push('/star-wars/'+encodedName)
            }} 
            >
              <CardHeader color="blue-gray" className="relative h-56">
                <img
                  src={imgUrl + (index * 100)}
                  alt="card-image"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray text-center" className="mb-2">
                  {star.name}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Page;
