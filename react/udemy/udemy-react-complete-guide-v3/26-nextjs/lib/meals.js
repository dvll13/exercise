import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'
import fs from 'node:fs'
import { redirect } from 'next/navigation'

// establish a connection to the db
const db = sql('meals.db')

// async for testing purposes
export async function getMeals() {
  // .run() - for inserting/changing data
  // .all() - for fetching data, return all rows that are fetched by the statement
  // .get() - for fetching a single row

  // testing block
  await new Promise((resolve) => setTimeout(resolve, 2000)) // for testing purposes
  // throw new Error('Fetching meals failed.')

  return db.prepare('SELECT * FROM meals').all() // prepare a new sql statement
}

export function getMeal(slug) {
  // return db.prepare('SELECT * FROM meals WHERE name = ' + slug) // insecure, we open ourself to SQL injection
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) // secure. ? -> placeholder
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true }) // create a slug from a value
  meal.instructions = xss(meal.instructions) // sanitize and clean a value

  // prepare image
  const extension = meal.image.name.split('.').pop()
  const fileName = `${meal.slug}.${extension}` // there should also be a random suffix

  // create a file on the filesystem
  const stream = fs.createWriteStream(`public/images/${fileName}`) // create a stream that allows us to write data to a file
  const bufferedImage = await meal.image.arrayBuffer()

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed.')
    }
  }) // convert from arrayBuffer to a regular buffer then write the latter

  meal.image = `/images/${fileName}`

  // save to db
  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `,
  ).run(meal)
  // id gets populated automatically
  // this syntax extract the values from an object. we specify the keys. order matters, should match the cols order
  // alternative - VALUES(?, ?, ?, ...)

  redirect('/meals')
}
