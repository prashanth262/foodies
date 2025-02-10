import classes from './page.module.css';
import Image from 'next/image';
import { getMeal } from '@/lib/meals';


export default function MealDetailsPage({params}){
  const meals=getMeal(params.mealSlug);

  if(!meals){
    notFounf();
  }

  meals.instructions = meals.instructions.replace(/\n/g, '<br>');

  return(
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meals.image} fill />
        </div>
        <div className={classes.headerText}>
        <h1>{meals.title}</h1>
        <p className={classes.creator}>
          by <a href={`mailto : ${meals.creator_email}`}>{meals.creator}</a>
        </p>
        <p className={classes.summary}>{meals.summary}</p>
        </div>
      </header>
      <main>
        <p
         className={classes.instructions}
         dangerouslySetInnerHTML={{__html:meals.instructions,}}
        
        >

        </p>
    </main>
    </>
  );
}