export const siteConfig = {
  name: "Universal Techno Services",
  shortName: "UTS",
  description: "Enterprise industrial equipment supplier. Engineering excellence since 2013.",
  url: "https://uts.example.com", // Replace with real domain when live
  ogImage: "https://uts.example.com/og.jpg",
  contact: {
    phone: "+91 9031044769",
    email: "uts.jsr@gmail.com",
    address: "P/14 Pragati Nagar, Baridih, Jamshedpur, Jharkhand 831017, India"
  },
  links: {
    twitter: "https://twitter.com/utsservices",
    linkedin: "https://linkedin.com/company/utsservices",
  },
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Products",
      href: "/products",
      megaMenu: true
    },
    {
      title: "Industries",
      href: "/industries",
    },
    {
      title: "Brands",
      href: "/brands",
    },
    {
      title: "Resources",
      href: "#",
      items: [
        { title: "Customers & Projects", href: "/customers" },
        { title: "Gallery", href: "/gallery" },
        { title: "Downloads", href: "/downloads" },
        { title: "News & Blog", href: "/blog" },
        { title: "FAQ", href: "/faq" },
      ]
    },
    {
      title: "Contact",
      href: "/contact",
    }
  ]
};

export type SiteConfig = typeof siteConfig;
