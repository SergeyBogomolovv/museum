type Props = {
  params: Promise<{
    locale: string
  }>
}

export default async function BookVisitPage({ params }: Props) {
  const { locale } = await params
  return <main className='flex-1'>BookVisitPage {locale}</main>
}
