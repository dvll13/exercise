import Image from 'next/image'
import classes from './page.module.css'
import { getMeal } from '@/lib/meals'
import { notFound } from 'next/navigation'

// dynamic metadata function
// it receives the same data as our component,
// so we can use that to generate the metadata
export async function generateMetadata({ params }) {
  const { mealSlug } = await params
  const meal = getMeal(mealSlug)

  if (!meal) {
    notFound() // metadata is run before the component so we should check here too
  }

  return {
    title: meal.title,
    description: meal.summary,
  }
}

export default async function MealDetailsPage({ params }) {
  const { mealSlug } = await params

  const meal = getMeal(mealSlug)

  if (!meal) {
    notFound() // will stop the component from executing and show the closest not-found or error page
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />')

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            added by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>

      <main className={classes.main}>
        <p className={classes.instructions} dangerouslySetInnerHTML={{ __html: meal.instructions }}></p>
      </main>
    </>
  )
}
