
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import getCurrentUser from './libs/getCurrentUser';

import HomeContent from './component/HomeContent';

export default async  function Home() {


  const currentUser = await getCurrentUser()


 


  return (


    <div className='bg-gradient-to-r from-slate-700 to-blue-950  '>
   <HomeContent currentUser={currentUser}/>
      
    </div>

  )
}



