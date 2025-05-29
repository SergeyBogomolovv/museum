import { z } from 'zod'
import { type BlocksContent } from '@strapi/blocks-react-renderer'

// Общие схемы
const LinkSchema = z.object({
  id: z.number(),
  label: z.string(),
  href: z.string(),
})

const MediaSchema = z.object({
  id: z.number(),
  url: z.string(),
  alternativeText: z.string().nullable().optional(),
  caption: z.string().nullable().optional(),
  width: z.number().nullable().optional(),
  height: z.number().nullable().optional(),
})

// Header
export const HeaderResponseSchema = z.object({
  data: z.object({
    id: z.number(),
    title: z.string(),
    links: z.array(LinkSchema),
    locale: z.string(),
  }),
})

// MainPage
const MainHeroSchema = z.object({
  id: z.number(),
  title: z.string(),
  cover: MediaSchema,
  buttonLabel: z.string(),
  buttonHref: z.string(),
})

const FeatureCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  cover: MediaSchema,
  buttonLabel: z.string(),
  href: z.string(),
})

const DetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  icon: MediaSchema,
  description: z.string(),
})

export const MainPageResponseSchema = z.object({
  data: z.object({
    id: z.number(),
    features: z.array(FeatureCardSchema),
    hero: MainHeroSchema,
    details: z.array(DetailsSchema),
    locale: z.string(),
  }),
})

// Footer
const FooterSectionSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable().optional(),
  links: z.array(LinkSchema).nullable().optional(),
})

export const FooterResponseSchema = z.object({
  data: z.object({
    id: z.number(),
    sections: z.array(FooterSectionSchema),
    locale: z.string(),
  }),
})

// AboutPage
const AboutImageComponentSchema = z.object({
  id: z.number(),
  __component: z.literal('about.image'),
  image: MediaSchema,
})

const AboutTextComponentSchema = z.object({
  id: z.number(),
  __component: z.literal('about.text'),
  text: z.custom<BlocksContent>(),
})

const AboutContentSchema = z.discriminatedUnion('__component', [
  AboutImageComponentSchema,
  AboutTextComponentSchema,
])

const AboutHeroSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  cover: MediaSchema,
})

export const AboutPageResponseSchema = z.object({
  data: z.object({
    id: z.number(),
    content: z.array(AboutContentSchema),
    hero: AboutHeroSchema,
    locale: z.string(),
  }),
})

// Events
const EventSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  eventDate: z.string(),
  image: MediaSchema,
})

export const EventsResponseSchema = z.object({
  data: z.array(EventSchema),
})

// BookVisitPage
export const BookVisitPageResponseSchema = z.object({
  data: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    image: MediaSchema,
    maxVisitorsCount: z.number(),
    formTitle: z.string(),
  }),
})
