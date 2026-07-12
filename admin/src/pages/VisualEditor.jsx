import { Link } from 'react-router-dom'
import ShadowScope from '../components/visualEditor/ShadowScope'
import { HeroPreview, ShowcaseSection, AboutPreview, GalleryPreview } from '../components/visualEditor/EditableSections'
import {
  MarqueePreview,
  CraftPreview,
  ServicesPreview,
  WhyUsPreview,
  TestimonialsPreview,
  FAQPreview,
  ContactPreview,
} from '../components/visualEditor/StaticSections'
import { useContent, saveContent } from '../hooks/useContent'
import { usePhotos, setPhotoUrl } from '../hooks/usePhotos'
import siteIndexCss from '../site-preview/site-index.css?raw'
import siteAppCss from '../site-preview/site-app.css?raw'
import previewEditorCss from '../site-preview/preview-editor.css?raw'

const PREVIEW_CSS = `${siteIndexCss}\n${siteAppCss}\n${previewEditorCss}`

function VisualEditor() {
  const { content, loading: contentLoading } = useContent()
  const { photos, loading: photosLoading } = usePhotos()

  if (contentLoading || photosLoading) {
    return (
      <div className="ve-page">
        <div className="ve-topbar">
          <div className="ve-topbar-left">
            <span className="ve-topbar-badge">Visual Editor</span>
          </div>
          <Link to="/" className="ve-topbar-exit">
            Exit to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const updateShowcaseImage = (field, sectionIndex, itemIndex, url) => {
    const sections = content[field].map((section, si) =>
      si !== sectionIndex
        ? section
        : {
            ...section,
            items: section.items.map((item, ii) => (ii !== itemIndex ? item : { ...item, imageUrl: url })),
          },
    )
    saveContent({ ...content, [field]: sections })
  }

  const updatePhoto = (slug, url) => {
    setPhotoUrl(slug, url)
  }

  return (
    <div className="ve-page">
      <div className="ve-topbar">
        <div className="ve-topbar-left">
          <span className="ve-topbar-badge">Visual Editor</span>
          <span className="ve-topbar-title">Looks Saloon — Live Preview</span>
          <span className="ve-topbar-hint">Hover any photo and click &ldquo;Change Photo&rdquo; to update it.</span>
        </div>
        <Link to="/" className="ve-topbar-exit">
          &larr; Exit to Dashboard
        </Link>
      </div>

      <ShadowScope css={PREVIEW_CSS}>
        <div className="site-preview-root">
          <HeroPreview hero={content.hero} />
          <MarqueePreview />
          <CraftPreview />
          <ServicesPreview />
          <ShowcaseSection field="showcase" sections={content.showcase} onImageChange={updateShowcaseImage} />
          <ShowcaseSection
            field="spaceShowcase"
            heading="A space designed to make you feel at ease."
            subheading="From the moment you walk in, every corner of Looks Saloon is built for comfort, calm, and a little bit of luxury."
            sections={content.spaceShowcase}
            onImageChange={updateShowcaseImage}
          />
          <AboutPreview about={content.about} photos={photos} onPhotoChange={updatePhoto} />
          <GalleryPreview photos={photos} onPhotoChange={updatePhoto} />
          <WhyUsPreview />
          <TestimonialsPreview />
          <FAQPreview />
          <ContactPreview />
        </div>
      </ShadowScope>
    </div>
  )
}

export default VisualEditor
