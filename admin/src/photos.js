// Mirrors src/photos.js in the main app — kept in sync manually since the two
// apps are separate Vite projects. These are the fallback values shown until
// an admin uploads or edits them from this dashboard.
export const DEFAULT_PHOTOS = {
  exterior: {
    url: 'https://content3.jdmagicbox.com/comp/hanumangarh/x2/9999p1552.1552.190404152906.p9x2/catalogue/looks-beauty-zone-and-spa-gaandhi-nagar-hanumangarh-beauty-parlours-6463l1ax3n.jpg',
    title: 'Our Storefront',
    tag: 'Exterior',
  },
  interiorStyling: {
    url: 'https://content3.jdmagicbox.com/v2/comp/hanumangarh/x2/9999p1552.1552.190404152906.p9x2/catalogue/looks-beauty-zone-and-spa-gaandhi-nagar-hanumangarh-beauty-parlours-6tv8tgr7o0.jpg',
    title: 'Style Bar',
    tag: 'Styling Chairs',
  },
  interiorWash: {
    url: 'https://content3.jdmagicbox.com/v2/comp/hanumangarh/x2/9999p1552.1552.190404152906.p9x2/catalogue/looks-beauty-zone-and-spa-gaandhi-nagar-hanumangarh-beauty-parlours-9jbxyirkvn.jpg',
    title: 'Wash & Relax',
    tag: 'Spa Station',
  },
  interiorMirrors: {
    url: 'https://content3.jdmagicbox.com/v2/comp/hanumangarh/x2/9999p1552.1552.190404152906.p9x2/catalogue/looks-beauty-zone-and-spa-gaandhi-nagar-hanumangarh-beauty-parlours-aio4rawgi6.jpg',
    title: 'Signature Mirrors',
    tag: 'Mirror Row',
  },
  interiorLounge: {
    url: 'https://content3.jdmagicbox.com/v2/comp/hanumangarh/x2/9999p1552.1552.190404152906.p9x2/catalogue/looks-beauty-zone-and-spa-gaandhi-nagar-hanumangarh-beauty-parlours-aufnmz4kbp.jpg',
    title: 'Guest Lounge',
    tag: 'Ambience',
  },
  checkin: {
    url: 'https://content2.jdmagicbox.com/checkin/hanumangarh/9999P1552.1552.190404152906.P9X2.jpg',
    title: 'Welcome In',
    tag: 'Entrance',
  },
}

export const PHOTO_SLUGS = Object.keys(DEFAULT_PHOTOS)

export const PHOTO_USAGE = {
  exterior: 'Gallery',
  interiorStyling: 'Gallery',
  interiorWash: 'Gallery',
  interiorMirrors: 'About section, Gallery',
  interiorLounge: 'Hero section, Gallery',
  checkin: 'Gallery',
}
