// Default photos shown until an admin replaces them from the dashboard.
// Hotlinked from Unsplash's image CDN, which is built for public embedding
// (unlike business-directory listing CDNs, which often block hotlinking).
export const DEFAULT_PHOTOS = {
  exterior: {
    url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=80',
    title: 'Our Storefront',
    tag: 'Exterior',
  },
  interiorStyling: {
    url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    title: 'Style Bar',
    tag: 'Styling Chairs',
  },
  interiorWash: {
    url: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c1?auto=format&fit=crop&w=1200&q=80',
    title: 'Wash & Relax',
    tag: 'Spa Station',
  },
  interiorMirrors: {
    url: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80',
    title: 'Signature Mirrors',
    tag: 'Mirror Row',
  },
  interiorLounge: {
    url: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=80',
    title: 'Guest Lounge',
    tag: 'Ambience',
  },
  checkin: {
    url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80',
    title: 'Welcome In',
    tag: 'Entrance',
  },
}

export const PHOTO_SLUGS = Object.keys(DEFAULT_PHOTOS)
