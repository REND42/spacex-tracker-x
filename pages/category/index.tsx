import { type GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React from 'react'
import CategoryCard from '../../components/CategoryCard'
import Layout from '../../components/Layout'

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
	return {
		props: {
			...(locale && await serverSideTranslations(locale, ['common'])),
		}
	}
}

const CategoryIndex = () => {
	const { t } = useTranslation()
	const router = useRouter()
	return (
		<Layout>
			<section className='w-full h-main py-6 md:py-20 px-10 flex flex-wrap justify-evenly items-center md:grid md:grid-cols-4 md:gap-10'>
				<CategoryCard jumpTo={() => { router.push('/rocket') }} bgPath='/images/bg-rocket.jpg' name={ t('category.rocket') }></CategoryCard>
				<CategoryCard jumpTo={() => { router.push('/launchpad') }} bgPath='/images/bg-launchpad.png' name={ t('category.launchpad') }></CategoryCard>
				<CategoryCard jumpTo={() => { router.push('/ship') }} bgPath='/images/bg-ship.jpg' name={ t('category.ship') }></CategoryCard>
				<CategoryCard jumpTo={() => { router.push('/crew') }} bgPath='/images/bg-crew.png' name={ t('category.crew') }></CategoryCard>
				<CategoryCard jumpTo={() => { router.push('/roadster') }} bgPath='/images/bg-roadster.jpg' name={ t('category.roadster') }></CategoryCard>
			</section>
		</Layout>
	)
}

export default CategoryIndex