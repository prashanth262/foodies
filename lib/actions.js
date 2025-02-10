'use server';
// import { useActionState } from 'react';
import { redirect } from "next/dist/server/api-utils";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text){
  return !text || text.trim() === '';
}

export async function shareMeal(prevState,formData){
  'use server';

  const meal={
    title : formData.get('title'),
    summary :  formData.get('summary'),
    instructions : formData.get('intructions'),
    image:formData.get('Image'),
    creator:formData.get('name'),
    creator_email:formData.get('email')

  }
  // console.log(meal);

 if(isInvalidText(meal.title) || 
 isInvalidText(meal.summary) ||
 isInvalidText(meal.instructions) ||
 isInvalidText(meal.creator) ||
 isInvalidText(meal.creator_email) ||
 !meal.creator_email.includes('@') ||
 !meal.image.size === 0

){
  //  throw new Error('Invalid input');
  return {
   message : 'Invalid input.'
  };
 }
await saveMeal(meal);
revalidatePath('/meals');
redirect('/meals');

}