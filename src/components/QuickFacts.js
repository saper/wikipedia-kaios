import { h } from 'preact'
import { useRef } from 'preact/hooks'
import { useArticle, useScroll, useI18n, useSoftkey, useArticleLinksNavigation } from 'hooks'
import { viewport } from 'utils'

export const QuickFacts = ({ lang, title }) => {
  const i18n = useI18n()
  const article = useArticle(lang, title)
  const containerRef = useRef()
  const [nextPage, previousPage] = useScroll(containerRef, viewport.width, 'x')
  useSoftkey('QuickFacts', {
    left: i18n.i18n('softkey-close'),
    onKeyLeft: () => history.back(),
    onKeyArrowUp: previousPage,
    onKeyArrowDown: nextPage
  })

  if (!article) {
    return 'Loading...'
  }

  useArticleLinksNavigation('QuickFacts', containerRef,
    containerRef.current ? containerRef.current.scrollLeft : -1,
    () => {}, () => {}
  )

  return (
    <div class='quickfacts-container' ref={containerRef}>
      <div
        class='quickfacts'
        dangerouslySetInnerHTML={{ __html: article.infobox }}
      />
    </div>
  )
}
