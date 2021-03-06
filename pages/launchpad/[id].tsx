import Image from 'next/image'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import { LaunchPad } from '../../types'
import { getLaunchpads, getOneLaunchpad } from '../../utils/api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('../../components/Map/MapCom'),
	{ ssr: false }
)

export async function getStaticPaths() {
	const launchpads = await getLaunchpads()
	const enPaths = launchpads.map(l => (`/launchpad/${l.id}`))
	const cnPaths = launchpads.map(l => (`/zh-CN/launchpad/${l.id}`))
	return {
		paths: [...enPaths, ...cnPaths],
		fallback: false
	}
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
	try {
		const id = params?.id?.toString()
		const data: LaunchPad = await getOneLaunchpad(id)
		return {
			props: {
				...(locale && await serverSideTranslations(locale, ['common'])),
				error: false,
				data: data,
				loading: !data
			}
		}
	} catch (error) {
		return {
			props: {
				...(locale && await serverSideTranslations(locale, ['common'])),
				error: true,
				data: null,
				loading: false
			}
		}
	}
}

const Launchpad = ({ data, loading }: { data: LaunchPad, loading: boolean }) => {
	const router = useRouter()

	return <Layout>
			<section className='w-full relative pt-4 pb-18 px-2 md:px-10 flex flex-col'>
				<div className='w-full h-full px-2 md:px-10 py-4 md:py-8 dark:text-gray-200'>
					<div className='h-auto'>
						<div className="flex flex-col">
							<div className="w-full flex flex-col md:flex-row">
								<div className="h-full flex flex-col justify-center py-4 md:py-0">
									<span className="py-4 text-3xl md:text-center">{ data.full_name }</span>
									<p className={`py-2 uppercase ${ data.status === 'active' ? 'text-green-500' : 'text-red-500' }`}>
										{ data.status }
									</p>
								</div>
							</div>
							<div className="py-4 md:py-8">
								<p className="block text text-lg py-4">{ data.details }</p>
							</div>
							<div className="py-4">
								<p className="block text-lg">Info</p>
								<div className='px-2 max-w-sm md:max-w-xl'>
									<div className='py-1 flex'>
										<a className="info-key">Name: </a>
										<a className="info-value">{ data.name }</a>
									</div>
									<div className='py-1 flex'>
										<a className="info-key">Locality: </a>
										<a className="info-value">{ data.locality }</a>
									</div>
									<div className='py-1 flex'>
										<a className="info-key">Region: </a>
										<a className="info-value">{ data.region }</a>
									</div>
									<div className='py-1 flex'>
										<a className="info-key">Coordinate: </a>
										<a className="info-value">{ data.longitude }, { data.latitude }</a>
									</div>
									<div className='py-1 flex'>
										<a className="info-key">Timezone: </a>
										<a className="info-value">{ data.timezone }</a>
									</div>
									<div className='py-1 flex'>
										<a className="info-key">Launch Times: </a>
										<a className="info-value" title='successes/attempts'>{ data.launch_successes } / { data.launch_attempts }</a>
									</div>
								</div>
							</div>
							<div className="py-4">
								<p className="block w-24 text-lg">Photos</p>
								<div className="flex px-2 flex-wrap justify-evenly just py-4 w-full">
									{
										data.images.large.map(photo => (
											<button onClick={() => { window.open(photo, '__blank') }} key={photo} className="w-[24rem] h-[18rem] md:h-[20rem] md:mx-2">
												<Image className="object-cover cursor-pointer rounded" src={photo} layout="responsive" width={400} height={300} alt={photo}></Image>
											</button>
										))
									}
								</div>
							</div>
						</div>
						<div className='py-4 flex justify-center'>
							<div className='w-full md:w-2/3 h-96 md:h-80 rounded'>
								<Map coordinate={{longitude: data.longitude, latitude: data.latitude}}/>
							</div>
						</div>
					</div>
				</div>
			</section>
	</Layout>
}

export default Launchpad
