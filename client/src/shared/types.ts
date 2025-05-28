import { type BlocksContent } from '@strapi/blocks-react-renderer'

type Link = {
  id: number
  label: string
  href: string
}

type Media = {
  id: number
  url: string
  alternativeText?: string | null
  caption?: string | null
  width?: number | null
  height?: number | null
}

export type HeaderResponse = {
  data: {
    id: number
    title: string
    links: Link[]
    locale: string
  }
}

type MainHero = {
  id: number
  title: string
  buttonLabel: string
  buttonHref: string
}

type FeatureCard = {
  id: number
  title: string
  description: string
  cover: Media
  buttonLabel: string
  href: string
}

type Details = {
  id: number
  title: string
  icon: Media
  description: string
}

export type MainPageResponse = {
  data: {
    id: number
    features: FeatureCard[]
    hero: MainHero
    details: Details[]
    locale: string
  }
}

type FooterSection = {
  id: number
  title: string
  description: string
  links: Link[]
}

export type FooterResponse = {
  data: {
    id: number
    sections: FooterSection[]
    locale: string
  }
}

type AboutImageComponent = {
  id: number
  __component: 'about.image'
  image: Media
}

type AboutTextComponent = {
  id: number
  __component: 'about.text'
  text: BlocksContent
}

type AboutContent = AboutImageComponent | AboutTextComponent

type AboutHero = {
  id: number
  title: string
  description: string
  cover: Media
}

export type AboutPageResponse = {
  data: {
    id: number
    content: AboutContent[]
    hero: AboutHero
    locale: string
  }
}

export type Event = {
  id: number
  title: string
  description: string
  eventDate: string
  image: Media
}

export type EventsResponse = {
  data: Event[]
}
