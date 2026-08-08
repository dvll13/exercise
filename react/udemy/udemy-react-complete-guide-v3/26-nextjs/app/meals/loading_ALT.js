import classes from './loading.module.css'

// an alternative more granular loading indication is used instead

export default function MealsLoadingPage() {
  return <p className={classes.loading}>Fetching meals...</p>
}
