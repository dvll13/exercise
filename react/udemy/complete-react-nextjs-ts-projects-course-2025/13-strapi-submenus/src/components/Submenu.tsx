import { useAppContext } from '../context/Context'
import sublinks from '../data'

const Submenu = () => {
  const { pageId } = useAppContext()

  const currentPage = sublinks.find((item) => item.pageId === pageId)

  console.log(pageId, currentPage)

  return (
    <div className={currentPage ? 'submenu show-submenu' : 'submenu'}>
      <h5>{currentPage?.page}</h5>

      <div
        className="submenu-links"
        style={{ gridTemplateColumns: currentPage?.links?.length && currentPage.links.length > 3 ? '1fr 1fr' : '1fr' }}
      >
        {currentPage?.links?.map((link) => {
          const { id, icon, label, url } = link
          return (
            <a key={id} href={url}>
              {icon} {label}
            </a>
          )
        })}
      </div>
    </div>
  )
}
export default Submenu
