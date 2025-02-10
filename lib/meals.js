// // import fs from 'node.fs';
// import fs from 'fs';

// import sql from 'better-sqlite3';
// import slugify from 'slugify';
// import xss from 'xss';

// const db=sql('meals.db');

// export async function getMeals(){
//   await new Promise((resolve) => setTimeout(resolve,2000));
  
//  return  db.prepare('SELECT * FROM meals').all();
// }

// export function getMeal(slug){
//   return db.prepare('SELECT * FROM meals WHERE slug=?').get(slug);
// }

// export async function saveMeal(meal){
// meal.slug=slugify(meal.title,{lower:true});
// meal.instructions = xss(meal.instructions);

// const extensions=Meal.image.name.split('.').pop();

// const fileName = `${meal.slug}.${extension}`

// fs.createWriteStream(`public/images/${fileName}`)
// const bufferedImage=await meal.image.arrayBuffer();

// Stream.write(Buffer.from(bufferedImage),(error) => {
//   if(error){
//     throw new Error('Saving image failed1');
//   }
// });
// meal.image=`/images/${fileName}`

// db.prepare(`
//   INSERT INTO meals (title,summary,instructions,creator,creator_email,image,slug)VALUES (

//   @title,
//   @summary,
//   @instructions,
//   @creator,
//   @creator_email,
//   @image,
//   @slug
//   )
//   `).run(meal);
// }

import fs from 'fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db'); // Connect to the SQLite database

// Fetch all meals
export async function getMeals() {
  // Simulate a delay for fetching meals
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare('SELECT * FROM meals').all();
}

// Fetch a single meal by slug
export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug=?').get(slug);
}

// Save a meal
export async function saveMeal(meal) {
  // Debug: Log the meal object
  console.log('Meal object received:', meal);

  // Validate input
  if (!meal) {
    throw new Error('Meal object is undefined or null.');
  }
  if (!meal.title) {
    throw new Error('Meal title is missing.');
  }
  if (!meal.image || !meal.image.name) {
    throw new Error('Meal image or image name is missing.');
  }

  // Generate a slug from the meal's title
  meal.slug = slugify(meal.title, { lower: true });

  // Sanitize the instructions
  meal.instructions = xss(meal.instructions);

  // Extract the file extension from the meal's image name
  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;

  try {
    // Convert the image to an ArrayBuffer
    const bufferedImage = await meal.image.arrayBuffer();

    // Save the image to the public/images directory
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    stream.write(Buffer.from(bufferedImage), (error) => {
      if (error) {
        throw new Error('Saving image failed.');
      }
    });

    // Set the public path for the image
    meal.image = `/images/${fileName}`;

    // Insert the meal into the database
    db.prepare(`
      INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
      )
    `).run(meal);

    console.log('Meal saved successfully:', meal);
  } catch (error) {
    console.error('Error while saving the meal:', error);
    throw new Error('Failed to save the meal. Please try again.');
  }
}
