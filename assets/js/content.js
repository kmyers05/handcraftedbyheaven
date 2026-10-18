/* =====================================================================
   HANDCRAFTED BY HEAVEN :: SITE CONTENT
   ---------------------------------------------------------------------
   This is the ONE file to edit for day-to-day updates:
     - contact links (email / Instagram / Facebook)
     - upcoming events
     - the jewelry list (Collection + Gallery)
     - the Meet the Creator text

   PLACEHOLDERS
     Any text that starts with "TODO" shows on the site inside a dashed
     "placeholder" box so it is easy to spot. Replace the whole string
     (including the word TODO) with the real text and the box goes away.
     A link left as "" shows a "coming soon" button instead of a dead link.

   Search this file for "TODO" to find everything still left to fill in.
   ===================================================================== */

window.SITE = {

  /* ------------------------------------------------------------------
     CONTACT LINKS
     ------------------------------------------------------------------ */
  links: {
    // TODO confirm: address copied from the business card logo.
    email: "HandcraftedbyHeaven@gmail.com",

    // TODO: paste the full profile URL, e.g. "https://www.instagram.com/yourhandle"
    instagram: "",

    // TODO: paste the full page URL, e.g. "https://www.facebook.com/yourpage"
    facebook: ""
  },

  /* ------------------------------------------------------------------
     UPCOMING EVENTS
     date      : "YYYY-MM-DD"  (leave "" to show "Date TBA")
     startTime : "HH:MM" 24-hour, optional (e.g. "10:00")
     endTime   : "HH:MM" 24-hour, optional
     mapUrl    : optional. If blank, the Directions button searches the address.
     link      : optional event page (Facebook event, market website, ...)
     Events whose date has passed move to "Past events" automatically.
     ------------------------------------------------------------------ */
  events: [
    {
      title: "TODO: Name of the next jewelry swap meet",
      date: "",
      startTime: "",
      endTime: "",
      venue: "TODO: Venue name",
      address: "TODO: Street address, City, State",
      mapUrl: "",
      link: "",
      description: "TODO: One or two lines about the event (what to expect, swap rules, cash/card, etc.)"
    },
    {
      title: "TODO: Another market or pop-up",
      date: "",
      startTime: "",
      endTime: "",
      venue: "TODO: Venue name",
      address: "TODO: Street address, City, State",
      mapUrl: "",
      link: "",
      description: "TODO: Short description"
    }
  ],

  /* ------------------------------------------------------------------
     MEET THE CREATOR
     ------------------------------------------------------------------ */
  about: {
    name: "Knevaeh Myers",
    photo: "images/creator/knevaeh.webp",
    tagline: "TODO: A short line about her, e.g. \"Beader, charm collector, maker of tiny happy things\"",
    bio: [
      "TODO: First paragraph. How she got started making jewelry and what she loves about it.",
      "TODO: Second paragraph. What inspires her pieces (colors, themes, tarot, sea creatures, etc.).",
      "TODO: Third paragraph (optional). What visitors can expect at her table, custom requests, etc."
    ],
    facts: [
      { label: "Making jewelry since", value: "TODO: year" },
      { label: "Favorite thing to make", value: "TODO: e.g. jellyfish keychains" },
      { label: "Based in", value: "TODO: City, State" }
    ]
  },

  /* ------------------------------------------------------------------
     THE COLLECTION
     category : must be one of the names in `categories` below
     featured : true = shown as a large tile in the Gallery
     Names and descriptions were written from the product photos,
     so tweak them however she likes.
     To add a piece: put a square photo in images/products/ (and a
     smaller copy in images/products/thumb/, or reuse the same path),
     then copy one of the blocks below.
     ------------------------------------------------------------------ */
  categories: ["Bracelets", "Keychains", "Phone Charms", "Earrings"],

  products: [
    {
      name: "Pastel Candy Beads",
      category: "Bracelets",
      photo: "images/products/beaded-jewelry-group.webp",
      thumb: "images/products/thumb/beaded-jewelry-group.webp",
      description: "Chunky rondelle beads in lime, sky blue, bubblegum pink and butter yellow, finished with a pearl and a silver clasp.",
      featured: true
    },
    {
      name: "The Moon Tarot Bracelet",
      category: "Bracelets",
      photo: "images/products/moon-tarot-bracelet.webp",
      thumb: "images/products/thumb/moon-tarot-bracelet.webp",
      description: "Glossy black, smoky and star-flecked clear beads with pearl loops, silver stars and a Moon tarot card charm.",
      featured: true
    },
    {
      name: "The Star Tarot Bracelet",
      category: "Bracelets",
      photo: "images/products/star-tarot-bracelet.webp",
      thumb: "images/products/thumb/star-tarot-bracelet.webp",
      description: "Milky white and crackle-clear beads, pearl loops, a silver heart and star, and a Star tarot card charm."
    },
    {
      name: "Pearl Charm Bracelet",
      category: "Bracelets",
      photo: "images/products/pearl-charm-bracelet.webp",
      thumb: "images/products/thumb/pearl-charm-bracelet.webp",
      description: "A dainty silver chain with dangling pearls, a star, a little heart and a swirl charm."
    },
    {
      name: "Green Jellyfish Keychain",
      category: "Keychains",
      photo: "images/products/green-jellyfish-keychain.webp",
      thumb: "images/products/thumb/green-jellyfish-keychain.webp",
      description: "A lime jellyfish with pearly seed-bead tentacles and an iridescent teardrop.",
      featured: true
    },
    {
      name: "Pink Jellyfish Keychain",
      category: "Keychains",
      photo: "images/products/pink-jellyfish-keychain.webp",
      thumb: "images/products/thumb/pink-jellyfish-keychain.webp",
      description: "A blush jellyfish with a white bow and sparkly bead tentacles ending in a pink star."
    },
    {
      name: "Blue Ghost Keychain",
      category: "Keychains",
      photo: "images/products/blue-ghost-keychain.webp",
      thumb: "images/products/thumb/blue-ghost-keychain.webp",
      description: "A frosted little ghost with ocean-blue beads, a clear star frame, a cloud bead and silver stars."
    },
    {
      name: "Pink Ghost Keychain",
      category: "Keychains",
      photo: "images/products/pink-ghost-keychain.webp",
      thumb: "images/products/thumb/pink-ghost-keychain.webp",
      description: "A frosted ghost with rosy beads, a puffy pink heart, a clear star frame and a silver bow.",
      featured: true
    },
    {
      name: "Purple Ghost Keychain",
      category: "Keychains",
      photo: "images/products/purple-ghost-keychain.webp",
      thumb: "images/products/thumb/purple-ghost-keychain.webp",
      description: "Violet beads, a lilac flower bell inside a clear star frame, and a frosted ghost friend."
    },
    {
      name: "Black Star Keychain",
      category: "Keychains",
      photo: "images/products/black-star-keychain.webp",
      thumb: "images/products/thumb/black-star-keychain.webp",
      description: "Black ball chain, smoky beads, a violet flower bead and a silver four-point star."
    },
    {
      name: "White Star Keychain",
      category: "Keychains",
      photo: "images/products/white-star-keychain.webp",
      thumb: "images/products/thumb/white-star-keychain.webp",
      description: "Clear and milky beads, white ball chain, a frosted flower bell and a silver star spike."
    },
    {
      name: "Blue Bow Keychain",
      category: "Keychains",
      photo: "images/products/blue-bow-keychain.webp",
      thumb: "images/products/thumb/blue-bow-keychain.webp",
      description: "Sky-blue beads and flower bell, blue ball chain, a puffy heart and a silver bow charm."
    },
    {
      name: "Pink Bow Keychain",
      category: "Keychains",
      photo: "images/products/pink-bow-keychain.webp",
      thumb: "images/products/thumb/pink-bow-keychain.webp",
      description: "Hot pink and rose beads, pink ball chain, a tulip bell bead and a silver bow."
    },
    {
      name: "Strawberry Phone Charm",
      category: "Phone Charms",
      photo: "images/products/strawberry-phone-charm.webp",
      thumb: "images/products/thumb/strawberry-phone-charm.webp",
      description: "A glossy red strawberry with cherry-red beads, a silver heart and ball chain.",
      featured: true
    },
    {
      name: "Yellow Flower Phone Charm",
      category: "Phone Charms",
      photo: "images/products/yellow-flower-phone-charm.webp",
      thumb: "images/products/thumb/yellow-flower-phone-charm.webp",
      description: "A sunny yellow flower with a pink center, a green leaf, lemon beads and pearls."
    },
    {
      name: "Green Flower Phone Charm",
      category: "Phone Charms",
      photo: "images/products/green-flower-phone-charm.webp",
      thumb: "images/products/thumb/green-flower-phone-charm.webp",
      description: "A lime daisy with a leaf bead, deep green beads, pearls and a silver swirl."
    },
    {
      name: "Pink Star Phone Charm",
      category: "Phone Charms",
      photo: "images/products/pink-star-phone-charm.webp",
      thumb: "images/products/thumb/pink-star-phone-charm.webp",
      description: "Crackle-pink beads, a silver star, a lime leaf and a squishy pink star."
    },
    {
      name: "Clear Heart Bow Phone Charm",
      category: "Phone Charms",
      photo: "images/products/clear-heart-bow-phone-charm.webp",
      thumb: "images/products/thumb/clear-heart-bow-phone-charm.webp",
      description: "A clear heart wrapped with a silver bow, white ball chain and a crackle-glass bead."
    },
    {
      name: "Pink Tulip Earrings",
      category: "Earrings",
      photo: "images/products/pink-tulip-earrings.webp",
      thumb: "images/products/thumb/pink-tulip-earrings.webp",
      description: "Blush glass tulips on lime-green leaves with a pearl drop.",
      featured: true
    }
  ],

  /* ------------------------------------------------------------------
     EXTRA GALLERY PHOTOS
     Every product above is already in the Gallery. Add event photos,
     table setups, work-in-progress shots, etc. here.
     { photo: "images/gallery/my-table.webp", caption: "My table at ...", featured: false }
     ------------------------------------------------------------------ */
  galleryExtras: [
    // TODO: add event / lifestyle photos here
  ]
};
