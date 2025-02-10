import { Suspense } from "react";

import MealsGrid from "@/components/meals/meals-grid";

import Link from 'next/link';

import { getMeals } from "@/lib/meals";

import classes from './page.module.css'

async function Meals(){
  const meals=await getMeals();

  return  <MealsGrid  meals={meals}/>
}

export default async function Mealspage(){
  // const meals=await getMeals();
  return(
    <>
    <header className={classes.header}>
      <h1>
        Delicious meals, created <span className={classes.highlight}> by you</span>
      </h1>
      <p>choose your favouite recipe and cook it yourself. It is easy and fun!</p>
      <p className={classes.cta}>
       <Link href="/meals/share">
       Share Your Favourite Recipe
       </Link>
      </p>
    </header>
    <mian className={classes.main}>
     {/* <MealsGrid  meals={meals}/> */}

     <Suspense>
     <Meals />
     </Suspense>
    
    </mian>
    </>
  );
}